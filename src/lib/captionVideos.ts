"use client";

import { useCallback, useSyncExternalStore } from "react";

/* ───────────────────────── Config (all public values) ───────────────────────── */

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD || "bzb8cmxl";
const TAG = process.env.NEXT_PUBLIC_CLOUDINARY_TAG || "caption-styles";

// Old Google Drive source — only used if Cloudinary returns nothing / fails
const DRIVE_FOLDER = process.env.NEXT_PUBLIC_GDRIVE_FOLDER_ID || "";
const DRIVE_KEY = process.env.NEXT_PUBLIC_GDRIVE_API_KEY || "";

const CACHE_NAME = "wd-caption-videos-v1";

/* ───────────────────────── Caption list ───────────────────────── */

export interface CaptionStyle {
  id: string;
  name: string;
  description: string;
  poster: string;
  /** Tried in order until one works */
  sources: string[];
  size: number;
  /** true = play straight from the network and download in chunks while playing (Cloudinary).
   *  false = download the whole file first (Drive: its mp4 index is at the end, so it can't stream). */
  stream: boolean;
}

function parseDriveFileName(fileName: string): { name: string; description: string } {
  const clean = fileName.replace(/\.(mp4|mov|m4v|webm|mkv)$/i, "").trim();
  const dashIndex = clean.indexOf(" - ");
  if (dashIndex === -1) return { name: clean, description: "" };
  return {
    name: clean.substring(0, dashIndex).trim(),
    description: clean.substring(dashIndex + 3).trim(),
  };
}

const encodePath = (p: string) => p.split("/").map(encodeURIComponent).join("/");

interface CloudinaryResource {
  public_id: string;
  version: number;
  context?: { custom?: Record<string, string> };
}

async function fromCloudinary(): Promise<CaptionStyle[]> {
  const res = await fetch(`https://res.cloudinary.com/${CLOUD}/video/list/${TAG}.json`);
  if (!res.ok) throw new Error("Cloudinary list unavailable");
  const data: { resources?: CloudinaryResource[] } = await res.json();

  return (data.resources || [])
    .map((r): CaptionStyle => {
      const ctx = r.context?.custom || {};
      const path = `v${r.version}/${encodePath(r.public_id)}`;
      const base = `https://res.cloudinary.com/${CLOUD}/video/upload`;
      return {
        id: r.public_id,
        // Cloudinary's own "caption" / "alt" fields work too, so no special setup is needed
        name: ctx.title || ctx.caption || r.public_id.replace(/_/g, " "),
        description: ctx.description || ctx.alt || "",
        // Auto-prepared: H.264 (plays everywhere), smaller, metadata at the front, no audio
        sources: [`${base}/q_auto:good,w_800,vc_h264,ac_none/${path}.mp4`],
        poster: `${base}/so_0,w_600,f_jpg,q_auto/${path}.jpg`,
        size: 0,
        stream: true,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
}

async function fromDrive(): Promise<CaptionStyle[]> {
  if (!DRIVE_FOLDER || !DRIVE_KEY) return [];
  const url =
    `https://www.googleapis.com/drive/v3/files?q='${DRIVE_FOLDER}'+in+parents+and+mimeType+contains+'video'` +
    `&key=${DRIVE_KEY}&fields=files(id,name,size,thumbnailLink)&orderBy=name`;
  const data = await (await fetch(url)).json();
  if (data.error) return [];
  return (data.files || []).map(
    (f: { id: string; name: string; size?: string; thumbnailLink?: string }): CaptionStyle => {
      const parsed = parseDriveFileName(f.name);
      const sources = [`https://www.googleapis.com/drive/v3/files/${f.id}?alt=media&key=${DRIVE_KEY}`];
      if (typeof location !== "undefined" && location.hostname !== "localhost") {
        sources.push(`/api/drive-video/${f.id}`);
      }
      return {
        id: f.id,
        name: parsed.name || f.name,
        description: parsed.description,
        poster: f.thumbnailLink ? f.thumbnailLink.replace(/=s\d+$/, "=s720") : "",
        sources,
        size: Number(f.size) || 0,
        stream: false,
      };
    }
  );
}

let listPromise: Promise<CaptionStyle[]> | null = null;

/** Lists caption videos. Cached for the whole page session. */
export function fetchCaptionStyles(): Promise<CaptionStyle[]> {
  if (!listPromise) {
    listPromise = fromCloudinary()
      .catch(() => [] as CaptionStyle[])
      .then(async (list) => (list.length > 0 ? list : await fromDrive()))
      .catch((err) => {
        listPromise = null; // allow retry
        throw err;
      });
  }
  return listPromise;
}

/* ───────────────────────── Video cache ───────────────────────── */

export interface VideoState {
  status: "idle" | "loading" | "ready" | "error";
  progress: number; // 0..1
  url?: string; // blob: URL once ready
}

const IDLE: VideoState = { status: "idle", progress: 0 };
const states = new Map<string, VideoState>();
const listeners = new Map<string, Set<() => void>>();
const inflight = new Map<string, Promise<void>>();

function setState(id: string, next: VideoState) {
  states.set(id, next);
  listeners.get(id)?.forEach((cb) => cb());
}

const getState = (id: string): VideoState => states.get(id) ?? IDLE;

/** Non-hook read of a video's current state (used once, when a video is first shown). */
export const getVideoState = getState;

function subscribe(id: string, cb: () => void) {
  let set = listeners.get(id);
  if (!set) listeners.set(id, (set = new Set()));
  set.add(cb);
  return () => {
    set!.delete(cb);
  };
}

async function readWithProgress(res: Response, fallbackSize: number, onProgress: (p: number) => void) {
  const total = Number(res.headers.get("Content-Length")) || fallbackSize;
  if (!res.body) return res.blob();

  const reader = res.body.getReader();
  const chunks: BlobPart[] = [];
  let received = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value as BlobPart);
    received += value.length;
    if (total) onProgress(Math.min(received / total, 0.99));
  }
  return new Blob(chunks, { type: "video/mp4" });
}

async function download(style: CaptionStyle): Promise<Blob> {
  const cacheKey = style.sources[0]; // Cloudinary URLs contain the version, so a replaced video busts the cache

  // 1) Persistent browser cache — repeat visits are instant
  try {
    if ("caches" in window) {
      const cache = await caches.open(CACHE_NAME);
      const hit = await cache.match(cacheKey);
      if (hit) return await hit.blob();
    }
  } catch {
    /* unavailable — carry on */
  }

  // 2) Network, trying each source in order
  let lastError: unknown;
  for (const src of style.sources) {
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await readWithProgress(res, style.size, (p) =>
        setState(style.id, { status: "loading", progress: p })
      );
      try {
        if ("caches" in window) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(cacheKey, new Response(blob, { headers: { "Content-Type": "video/mp4" } }));
        }
      } catch {
        /* quota etc. — non-fatal */
      }
      return blob;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

/** Downloads a video once (deduped) and exposes progress + a blob URL. */
export function loadVideo(style: CaptionStyle): Promise<void> {
  if (getState(style.id).status === "ready") return Promise.resolve();
  const existing = inflight.get(style.id);
  if (existing) return existing;

  setState(style.id, { status: "loading", progress: 0 });
  const p = download(style)
    .then((blob) => {
      setState(style.id, { status: "ready", progress: 1, url: URL.createObjectURL(blob) });
    })
    .catch(() => {
      setState(style.id, { status: "error", progress: 0 });
    })
    .finally(() => {
      inflight.delete(style.id);
    });
  inflight.set(style.id, p);
  return p;
}

export function retryVideo(style: CaptionStyle) {
  states.delete(style.id);
  return loadVideo(style);
}

/**
 * Cheap warm-up (used from the Editing / Production pages):
 *  - every poster (about 15 KB each) so each card has a picture instantly
 *  - the FIRST video only (about 0.3–0.6 MB), so it plays instantly when the page opens
 */
export function prefetchStyles(styles: CaptionStyle[]) {
  styles.forEach((s) => {
    if (s.poster) {
      const img = new Image();
      img.src = s.poster;
    }
  });
  if (styles[0]) loadVideo(styles[0]);
}

let prefetchToken = 0;

/** Stop any neighbour downloads that haven't started yet (call when the user picks a video). */
export function cancelPrefetch() {
  prefetchToken++;
}

/**
 * "Sliding window": around the video being watched, download 3 ahead and 3 behind,
 * one at a time, nearest first (next, previous, next+1, previous-1, ...).
 * Everything further away is NOT downloaded, so 30 videos never means 30 downloads.
 */
export async function prefetchAround(styles: CaptionStyle[], index: number, radius = 3) {
  const token = ++prefetchToken;
  for (let d = 1; d <= radius; d++) {
    for (const i of [index + d, index - d]) {
      if (token !== prefetchToken) return; // user moved on — stop
      const s = styles[i];
      if (s) await loadVideo(s);
    }
  }
}

/** Call from pages that link to the short-form page, so the video is ready before the click. */
export function warmShortFormVideos() {
  fetchCaptionStyles()
    .then(prefetchStyles)
    .catch(() => {});
}

export function useCaptionVideo(id: string): VideoState {
  const sub = useCallback((cb: () => void) => subscribe(id, cb), [id]);
  return useSyncExternalStore(
    sub,
    () => getState(id),
    () => IDLE
  );
}
