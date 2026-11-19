"use client";

import BackButton from "@/components/BackButton";
import {
  cancelPrefetch,
  type CaptionStyle,
  fetchCaptionStyles,
  getVideoState,
  loadVideo,
  prefetchAround,
  prefetchStyles,
  retryVideo,
  useCaptionVideo,
} from "@/lib/captionVideos";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Stable random numbers per video ID, so they don't change on re-render. */
const engagementCache = new Map<
  string,
  { likes: string; comments: string; shares: string }
>();
function getEngagement(id: string) {
  if (!engagementCache.has(id)) {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
    const r = (min: number, max: number) => {
      h = (h * 16807 + 1) | 0;
      return min + (Math.abs(h) % (max - min));
    };
    const fmt = (n: number) =>
      n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "K" : String(n);
    engagementCache.set(id, {
      likes: fmt(r(800, 45000)),
      comments: fmt(r(50, 3500)),
      shares: fmt(r(20, 1200)),
    });
  }
  return engagementCache.get(id)!;
}

/** One video "page" inside the phone. Only the active one plays; neighbours show their first frame. */
function PhoneSlide({
  style,
  active,
  near,
  onStart,
}: {
  style: CaptionStyle;
  active: boolean;
  near: boolean;
  onStart: () => void;
}) {
  const blob = useCaptionVideo(style.id);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [streamFailed, setStreamFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const [mode, setMode] = useState<"memory" | "stream" | null>(null);
  if (active && mode === null) {
    setMode(
      style.stream && getVideoState(style.id).status === "idle"
        ? "stream"
        : "memory",
    );
  }

  const streaming = mode === "stream";
  const ready = blob.status === "ready";
  const src = streaming ? style.sources[0] : ready ? blob.url : undefined;
  const failed = active && (streaming ? streamFailed : blob.status === "error");
  const downloading = !streaming && blob.status === "loading";
  const memoryReady = !streaming && ready;
  const showLoading = active && !failed && !playing && !memoryReady;
  const videoVisible = playing || memoryReady;
  const ringProgress = streaming ? 0.3 : blob.progress;
  const pct = Math.round(blob.progress * 100);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [active, src, attempt]);

  const retry = () => {
    if (streaming) {
      setStreamFailed(false);
      setAttempt((a) => a + 1);
    } else {
      retryVideo(style);
    }
  };

  return (
    <div className="absolute inset-0 bg-black">
      {style.poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={style.poster}
          alt=""
          draggable={false}
          className={`absolute inset-0 w-full h-full object-contain select-none transition-opacity duration-500 ${
            videoVisible
              ? "opacity-0"
              : showLoading
                ? "opacity-60 blur-[2px]"
                : "opacity-100"
          }`}
        />
      )}

      {src && (active || near) && !failed && (
        <video
          ref={videoRef}
          key={`${src}-${attempt}`}
          src={src}
          poster={style.poster || undefined}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={(e) => {
            if (active) e.currentTarget.play().catch(() => {});
          }}
          onPlaying={() => {
            setPlaying(true);
            if (active) onStart();
          }}
          onError={() => streaming && setStreamFailed(true)}
          className={`absolute inset-0 w-full h-full object-contain bg-transparent ${
            streaming ? "transition-opacity duration-500" : ""
          } ${videoVisible ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {showLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 pointer-events-none">
          <div className="relative w-12 h-12">
            <svg
              className={`w-12 h-12 ${streaming ? "animate-spin" : "-rotate-90"}`}
              viewBox="0 0 48 48"
            >
              <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" />
              <circle
                cx="24" cy="24" r="20" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 20}
                strokeDashoffset={2 * Math.PI * 20 * (1 - Math.max(ringProgress, 0.08))}
                className="transition-[stroke-dashoffset] duration-300"
              />
            </svg>
            {downloading && blob.progress > 0 && (
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/80">
                {pct}
              </span>
            )}
          </div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/50">Loading preview</p>
        </div>
      )}

      {showLoading && downloading && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-10">
          <div className="h-full bg-amber-500 transition-[width] duration-300" style={{ width: `${Math.max(pct, 4)}%` }} />
        </div>
      )}

      {failed && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 bg-black/70">
          <p className="text-[10px] text-zinc-400 text-center leading-relaxed">Couldn&apos;t load this preview.</p>
          <button onClick={retry} className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-500 border border-amber-500/40 rounded-full px-4 py-2">
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

/** Swipe up / down between videos, one at a time, like Instagram Reels. */
function PhoneSlider({
  styles,
  activeIndex,
  onSelect,
  onStart,
}: {
  styles: CaptionStyle[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onStart: (index: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const target = useRef<number | null>(null);
  const activeRef = useRef(activeIndex);
  const raf = useRef(0);

  // Selected from outside (card arrow / dots) → scroll the track to that video
  useEffect(() => {
    activeRef.current = activeIndex;
    const el = trackRef.current;
    if (!el || el.clientHeight === 0) return;
    const current = Math.round(el.scrollTop / el.clientHeight);
    if (current === activeIndex) return;
    target.current = activeIndex;
    el.scrollTo({
      top: activeIndex * el.clientHeight,
      behavior: Math.abs(current - activeIndex) === 1 ? "smooth" : "auto",
    });
    const t = setTimeout(() => {
      target.current = null;
    }, 800);
    return () => clearTimeout(t);
  }, [activeIndex]);

  // Swiped by the user → tell the page which video is now showing
  const handleScroll = () => {
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const el = trackRef.current;
      if (!el || el.clientHeight === 0) return;
      const idx = Math.round(el.scrollTop / el.clientHeight);
      if (target.current !== null) {
        if (idx === target.current) target.current = null;
        return;
      }
      if (idx !== activeRef.current) onSelect(idx);
    });
  };

  return (
    <div
      ref={trackRef}
      onScroll={handleScroll}
      className="absolute inset-0 flex flex-col overflow-y-auto snap-y snap-mandatory overscroll-y-contain scrollbar-hide"
    >
      {styles.map((s, i) => (
        <div
          key={s.id}
          className="relative h-full w-full shrink-0 snap-center snap-always"
        >
          <PhoneSlide
            style={s}
            active={i === activeIndex}
            near={Math.abs(i - activeIndex) <= 1}
            onStart={() => onStart(i)}
          />
        </div>
      ))}
    </div>
  );
}

/** Premium mobile caption carousel: ← [ card ] → with slide animation, one card at a time. */
function CaptionCarousel({
  styles,
  activeIndex,
  onPrev,
  onNext,
  onJumpTo,
  showInfo,
  onToggleInfo,
}: {
  styles: CaptionStyle[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onJumpTo: (index: number) => void;
  showInfo: string | null;
  onToggleInfo: (id: string) => void;
}) {
  const style = styles[activeIndex];
  const [direction, setDirection] = useState(0);
  const prevIdx = useRef(activeIndex);
  const [gridOpen, setGridOpen] = useState(false);

  useEffect(() => {
    setDirection(activeIndex > prevIdx.current ? 1 : -1);
    prevIdx.current = activeIndex;
  }, [activeIndex]);

  if (!style) return null;

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < styles.length - 1;

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -120 : 120, opacity: 0, scale: 0.92 }),
  };

  return (
    <div>
      {/* ← Card → */}
      <div className="flex items-center gap-3">
        {/* Left arrow */}
        <motion.button
          onClick={onPrev}
          disabled={!hasPrev}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          className={`shrink-0 w-11 h-11 rounded-full border backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            hasPrev
              ? "border-white/15 bg-white/[0.05] text-white/80 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
              : "border-white/5 bg-white/[0.02] text-white/15 cursor-default"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>

        {/* Animated card */}
        <div
          className="flex-1 min-w-0 relative overflow-hidden"
          style={{ minHeight: 64 }}
        >
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={style.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="w-full border border-amber-500/40 bg-amber-500/[0.05] rounded-xl p-4 relative overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.06)]"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 h-full w-[3px] bg-amber-500" />

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Equalizer */}
                  <div className="shrink-0 w-9 h-9 rounded-full bg-amber-500 text-black flex items-center justify-center">
                    <div className="flex items-center gap-[2px]">
                      {[1, 2, 3].map((bar) => (
                        <motion.div
                          key={bar}
                          className="w-[2.5px] bg-black rounded-full"
                          animate={{ height: [6, 14, 6] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: bar * 0.15,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-heading text-sm font-bold uppercase tracking-tight leading-snug text-amber-500 line-clamp-2">
                    {style.name}
                  </h3>
                </div>

                {/* Info icon */}
                {style.description && (
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    onClick={() => onToggleInfo(style.id)}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      showInfo === style.id
                        ? "bg-amber-500/20 text-amber-500"
                        : "bg-white/5 text-zinc-500"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                      <path strokeLinecap="round" d="M12 16v-4m0-4h.01" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <motion.button
          onClick={onNext}
          disabled={!hasNext}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          className={`shrink-0 w-11 h-11 rounded-full border backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            hasNext
              ? "border-white/15 bg-white/[0.05] text-white/80 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
              : "border-white/5 bg-white/[0.02] text-white/15 cursor-default"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>

      {/* Dots / counter — tap to open grid */}
      {styles.length > 1 && (
        <button
          onClick={() => setGridOpen(true)}
          className="w-full flex items-center justify-center gap-1.5 mt-4 group cursor-pointer"
        >
          {styles.length <= 12 ? (
            <>
              {styles.map((s, i) => (
                <div
                  key={s.id}
                  className={`rounded-full transition-all duration-400 ${
                    i === activeIndex
                      ? "w-5 h-1.5 bg-amber-500"
                      : "w-1.5 h-1.5 bg-white/15 group-hover:bg-white/25"
                  }`}
                />
              ))}
              <svg className="w-3 h-3 text-zinc-600 ml-1.5 group-hover:text-amber-500/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </>
          ) : (
            <span className="font-body text-[11px] tracking-[0.2em] text-zinc-600 tabular-nums group-hover:text-amber-500/60 transition-colors flex items-center gap-1.5">
              {activeIndex + 1} / {styles.length}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </span>
          )}
        </button>
      )}

      {/* ── Browse All — bottom sheet grid modal ── */}
      <AnimatePresence>
        {gridOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setGridOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[75vh] bg-zinc-950 border-t border-white/10 rounded-t-3xl flex flex-col"
            >
              {/* Handle & header */}
              <div className="flex flex-col items-center pt-3 pb-2 px-5 shrink-0">
                <div className="w-10 h-1 rounded-full bg-white/15 mb-3" />
                <div className="w-full flex items-center justify-between">
                  <h4 className="font-heading text-sm font-bold text-white tracking-tight">
                    Browse Styles
                    <span className="text-zinc-600 font-normal ml-2 text-xs">{styles.length}</span>
                  </h4>
                  <button
                    onClick={() => setGridOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Scrollable grid */}
              <div className="overflow-y-auto overscroll-contain px-4 pb-8 pt-1 scrollbar-hide">
                <div className="grid grid-cols-2 gap-3">
                  {styles.map((s, i) => (
                    <motion.button
                      key={s.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { onJumpTo(i); setGridOpen(false); }}
                      className={`relative rounded-2xl overflow-hidden border p-3.5 text-left transition-all duration-300 ${
                        i === activeIndex
                          ? "border-amber-500/60 bg-amber-500/[0.08] shadow-[0_0_24px_rgba(245,158,11,0.12)]"
                          : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                      }`}
                    >
                      {/* Large faded number */}
                      <span className={`absolute -top-1 -right-1 font-heading text-[44px] font-black leading-none select-none ${
                        i === activeIndex ? "text-amber-500/[0.12]" : "text-white/[0.04]"
                      }`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Small number badge */}
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold mb-2.5 ${
                        i === activeIndex
                          ? "bg-amber-500 text-black"
                          : "bg-white/[0.06] text-white/30"
                      }`}>
                        {i + 1}
                      </div>

                      {/* Style name */}
                      <p className={`text-[11px] font-bold uppercase tracking-tight leading-snug pr-4 ${
                        i === activeIndex ? "text-amber-500" : "text-white/70"
                      }`}>
                        {s.name}
                      </p>

                      {/* Active indicator dot */}
                      {i === activeIndex && (
                        <motion.div
                          layoutId="grid-active"
                          className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Expandable description panel */}
      <AnimatePresence>
        {showInfo === style.id && style.description && (
          <motion.div
            key={`info-${style.id}`}
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.3, ease: cinematicEase }}
            className="overflow-hidden"
          >
            <div className="mt-3 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 flex items-start justify-between gap-3">
              <p className="font-body text-xs text-zinc-400 leading-relaxed">
                {style.description}
              </p>
              <button
                onClick={() => onToggleInfo(style.id)}
                className="shrink-0 mt-0.5 text-zinc-600 active:scale-90"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShortFormPage() {
  const [captionStyles, setCaptionStyles] = useState<CaptionStyle[]>([]);
  const [activeCaption, setActiveCaption] = useState<CaptionStyle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showInfo, setShowInfo] = useState<string | null>(null);

  const activeIndex = Math.max(
    0,
    captionStyles.findIndex((s) => s.id === activeCaption?.id),
  );

  const handleCaptionChange = useCallback((style: CaptionStyle | undefined) => {
    if (!style) return;
    setActiveCaption(style);
    setShowInfo(null);
    cancelPrefetch(); // the user moved: stop fetching the old neighbours
    if (!style.stream) loadVideo(style); // Drive fallback needs a full download first
    // (Cloudinary videos simply start streaming, or play from memory if already fetched)
  }, []);

  useEffect(() => {
    fetchCaptionStyles()
      .then((styles) => {
        setCaptionStyles(styles);
        if (styles.length > 0) {
          setActiveCaption(styles[0]);
          prefetchStyles(styles); // posters + the first video; neighbours follow once it plays
        }
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message || "Network error loading videos.");
        setLoading(false);
      });
  }, []);

  return (
    <main className="bg-black text-white min-h-screen">
      <BackButton href="/services/editing" />

      {/* ─── Hero ─── */}
      <section className="relative flex items-center justify-center pt-28 pb-6 md:pt-44 md:pb-12 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-heading text-[10vw] font-black uppercase text-white/[0.02] tracking-tighter leading-none select-none">
            Reels
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: cinematicEase }}
          className="relative text-center max-w-3xl"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-amber-500 mb-4 font-bold">
            Short-Form Editing
          </p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: cinematicEase, delay: 0.2 }}
              className="font-heading text-3xl md:text-5xl font-black uppercase leading-tight tracking-tighter"
            >
              Caption Styles That Stop The Scroll
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-sm md:text-base text-zinc-500 mt-6 max-w-xl mx-auto leading-relaxed"
          >
            Pick a caption style. See how it looks. Tell us what you want.
            We&apos;ll make your content pop.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── iPhone Preview + Caption Selector ─── */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-8 md:py-16">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <p className="font-body text-sm text-zinc-600">{error}</p>
          </div>
        ) : captionStyles.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-body text-sm text-zinc-600">
              No caption styles available yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-20 items-start">
            {/* Left — iPhone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: cinematicEase, delay: 0.4 }}
              className="flex flex-col items-center lg:sticky lg:top-32 w-full"
            >
              <div className="relative">
                {/* iPhone Frame */}
                <div className="relative w-[260px] md:w-[300px] rounded-[48px] border-[6px] border-zinc-800 bg-black overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)]">
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-30" />

                  {/* Screen */}
                  <div className="relative w-full aspect-[9/19.5] bg-black overflow-hidden">
                    {/* ── Instagram top bar with animated story ring ── */}
                    <div className="absolute top-5 left-0 right-0 z-20 bg-gradient-to-b from-black/70 via-black/30 to-transparent pt-4 pb-4 px-3 pointer-events-none">
                      <motion.div
                        key={activeCaption?.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: cinematicEase }}
                        className="flex items-center gap-2.5"
                      >
                        {/* Animated story ring */}
                        <div className="relative w-8 h-8 shrink-0">
                          {/* Spinning gradient border */}
                          <motion.div
                            className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          {/* Black gap between ring and avatar */}
                          <div className="absolute inset-[2px] rounded-full bg-black" />
                          {/* Avatar circle with logo inside */}
                          <div className="absolute inset-[2px] rounded-full bg-black overflow-hidden flex items-center justify-center p-1">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/logo.png"
                              alt="WD"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-[10px] font-bold text-white leading-none">
                            wedreammedia
                          </p>
                          <p className="text-[8px] text-white/40 mt-0.5 leading-none">
                            Original Audio
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* ── Swipeable videos ── */}
                    <PhoneSlider
                      styles={captionStyles}
                      activeIndex={activeIndex}
                      onSelect={(i) => handleCaptionChange(captionStyles[i])}
                      onStart={(i) => prefetchAround(captionStyles, i)}
                    />

                    {/* ── Animated engagement icons (stagger in from right) ── */}
                    <div className="absolute right-2 bottom-14 z-20 flex flex-col items-center gap-4 pointer-events-none">
                      {(() => {
                        const eng = activeCaption
                          ? getEngagement(activeCaption.id)
                          : { likes: "0", comments: "0", shares: "0" };
                        return [
                          {
                            icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                            label: eng.likes,
                          },
                          {
                            icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
                            label: eng.comments,
                          },
                          {
                            icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
                            label: eng.shares,
                          },
                          {
                            icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
                            label: "Save",
                          },
                        ];
                      })().map((item, idx) => (
                        <motion.div
                          key={`${activeCaption?.id}-${idx}`}
                          initial={{ opacity: 0, x: 20, scale: 0.6 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{
                            duration: 0.5,
                            ease: cinematicEase,
                            delay: 0.3 + idx * 0.08,
                          }}
                          className="flex flex-col items-center gap-1"
                        >
                          <svg
                            className="w-5 h-5 text-white drop-shadow-lg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d={item.icon}
                            />
                          </svg>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 + idx * 0.08 }}
                            className="text-[8px] text-white/70 drop-shadow"
                          >
                            {item.label}
                          </motion.span>
                        </motion.div>
                      ))}

                      {/* Spinning vinyl / audio disc — Instagram style */}
                      <motion.div
                        className="w-7 h-7 rounded-full border border-white/40 bg-black overflow-hidden mt-1 flex items-center justify-center p-1"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/logo.png"
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                    </div>

                    {/* ── Bottom overlay: animated caption text ── */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent pb-5 pt-20 px-4 pointer-events-none">
                      <AnimatePresence mode="wait">
                        {activeCaption && (
                          <motion.div
                            key={activeCaption.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.4, ease: cinematicEase }}
                          >
                            <p className="text-[10px] text-white/90 leading-relaxed pr-12">
                              <span className="font-bold">wedreammedia</span>{" "}
                              <motion.span
                                key={activeCaption.id + "-name"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                              >
                                {activeCaption.name} ✨
                              </motion.span>
                            </p>
                            <motion.p
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "60%" }}
                              transition={{
                                delay: 0.4,
                                duration: 0.6,
                                ease: cinematicEase,
                              }}
                              className="mt-2 h-[1px] bg-gradient-to-r from-white/20 to-transparent"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-amber-500/5 blur-3xl rounded-full" />
              </div>

              {/* ─── Mobile: Premium caption carousel ─── */}
              <div className="lg:hidden w-full mt-8">
                <CaptionCarousel
                  styles={captionStyles}
                  activeIndex={activeIndex}
                  onPrev={() =>
                    handleCaptionChange(captionStyles[activeIndex - 1])
                  }
                  onNext={() =>
                    handleCaptionChange(captionStyles[activeIndex + 1])
                  }
                  onJumpTo={(i) => handleCaptionChange(captionStyles[i])}
                  showInfo={showInfo}
                  onToggleInfo={(id) =>
                    setShowInfo(showInfo === id ? null : id)
                  }
                />

                {/* Mobile Disclaimer — expandable */}
                <div className="border border-white/5 rounded-xl p-4 mt-4">
                  <button
                    onClick={() =>
                      setShowInfo(
                        showInfo === "disclaimer" ? null : "disclaimer",
                      )
                    }
                    className="w-full flex items-center justify-between"
                  >
                    <p className="font-body text-[11px] text-zinc-600 leading-relaxed text-left">
                      <span className="text-amber-500/60 font-bold">Note:</span>{" "}
                      Reference examples only. Caption changes may cost extra.
                    </p>
                    <span className="font-body text-[10px] uppercase tracking-wider text-zinc-600 shrink-0 ml-3">
                      {showInfo === "disclaimer" ? "Less" : "More"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {showInfo === "disclaimer" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t border-white/5 space-y-2">
                          <p className="font-body text-[11px] text-zinc-500 leading-relaxed flex items-start gap-2">
                            <span className="mt-1 w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
                            These examples are for reference only. We can match
                            the caption structure and style, but we do not
                            promise 100% identical fonts or motion effects.
                          </p>
                          <p className="font-body text-[11px] text-zinc-500 leading-relaxed flex items-start gap-2">
                            <span className="mt-1 w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
                            We guarantee the structure, timing, and overall feel
                            will match your selected style.
                          </p>
                          <p className="font-body text-[11px] text-zinc-400 leading-relaxed flex items-start gap-2 font-semibold">
                            <span className="mt-1 w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                            Please select your caption style carefully. Caption
                            changes after editing has started may incur
                            additional charges.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Right — Desktop Caption Style Selector (hidden on mobile) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: cinematicEase, delay: 0.6 }}
              className="hidden lg:block"
            >
              <p className="font-body text-xs uppercase tracking-[0.3em] text-zinc-600 mb-6 font-bold">
                Select a caption style ({captionStyles.length} available)
              </p>

              <div className="space-y-4">
                {captionStyles.map((style, i) => (
                  <motion.button
                    key={style.id}
                    onClick={() => handleCaptionChange(style)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: cinematicEase,
                      delay: 0.8 + i * 0.1,
                    }}
                    className={`w-full text-left p-6 border transition-all duration-500 group relative overflow-hidden ${
                      activeCaption?.id === style.id
                        ? "border-amber-500/50 bg-amber-500/[0.05] shadow-[0_0_40px_rgba(245,158,11,0.08)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`absolute top-0 left-0 h-full w-[3px] transition-all duration-500 ${
                        activeCaption?.id === style.id
                          ? "bg-amber-500"
                          : "bg-transparent"
                      }`}
                    />

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className={`font-heading text-lg font-bold uppercase tracking-tight mb-2 transition-colors duration-300 ${
                            activeCaption?.id === style.id
                              ? "text-amber-500"
                              : "text-white"
                          }`}
                        >
                          {style.name}
                        </h3>
                        {style.description && (
                          <p className="font-body text-sm text-zinc-500 leading-relaxed">
                            {style.description}
                          </p>
                        )}
                      </div>

                      <div
                        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          activeCaption?.id === style.id
                            ? "bg-amber-500 text-black"
                            : "bg-white/5 text-white/30"
                        }`}
                      >
                        {activeCaption?.id === style.id ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="flex items-center gap-[3px]"
                          >
                            {[1, 2, 3].map((bar) => (
                              <motion.div
                                key={bar}
                                className="w-[3px] bg-black rounded-full"
                                animate={{ height: [8, 16, 8] }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: bar * 0.15,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </motion.div>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Desktop Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: cinematicEase, delay: 1.4 }}
                className="mt-10 border border-white/5 p-6 md:p-8"
              >
                <p className="font-body text-xs uppercase tracking-[0.3em] text-amber-500/60 mb-4 font-bold">
                  Please Note
                </p>
                <div className="space-y-3">
                  <p className="font-body text-sm text-zinc-500 leading-relaxed flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                    These examples are for reference only. We can match the
                    caption structure and style, but we do not promise 100%
                    identical fonts or motion effects.
                  </p>
                  <p className="font-body text-sm text-zinc-500 leading-relaxed flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                    We guarantee the structure, timing, and overall feel will
                    match your selected style.
                  </p>
                  <p className="font-body text-sm text-zinc-400 leading-relaxed flex items-start gap-3 font-semibold">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    Please select your caption style carefully before we begin.
                    Caption style changes after editing has started may incur
                    additional charges.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </section>

      {/* ─── What You Get ─── */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="mb-12"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-black uppercase tracking-tighter">
            What&apos;s Included
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Caption Styling",
              desc: "Your chosen caption style applied throughout the video with consistent formatting.",
            },
            {
              title: "Sound Design",
              desc: "Trending audio sync, SFX layering, and beat-matched transitions.",
            },
            {
              title: "Color Correction",
              desc: "Basic color grading to ensure your footage looks clean and professional.",
            },
            {
              title: "Platform Export",
              desc: "Exported in optimal formats for Instagram Reels, TikTok, and YouTube Shorts.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: cinematicEase,
                delay: i * 0.1,
              }}
              className="border border-white/5 p-6"
            >
              <h3 className="font-heading text-sm font-bold uppercase tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="font-body text-xs text-zinc-600 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 pb-16 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="border border-amber-500/20 p-10 md:p-14 text-center"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4">
            Ready to create scroll-stopping content?
          </h2>
          <p className="font-body text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed mb-8">
            Send us your footage, pick your caption style, and we&apos;ll
            deliver content that performs.
          </p>
          <a
            href="mailto:ishwar@wedreammedia.com"
            className="font-body inline-block border border-amber-500 px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-amber-500 transition-all duration-300 hover:bg-amber-500 hover:text-black"
          >
            Get Started
          </a>
        </motion.div>
      </section>
    </main>
  );
}
