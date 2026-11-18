"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import BackButton from "@/components/BackButton";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FOLDER_ID = process.env.NEXT_PUBLIC_GDRIVE_FOLDER_ID || "";
const API_KEY = process.env.NEXT_PUBLIC_GDRIVE_API_KEY || "";

function getDriveVideoUrl(fileId: string): string {
  if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
    return `/api/drive-video/${fileId}`;
  }
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;
}

interface CaptionStyle {
  id: string;
  name: string;
  description: string;
  videoId: string;
}

function parseDriveFileName(fileName: string): { name: string; description: string } | null {
  const withoutExt = fileName.replace(/\.[^/.]+$/, "");
  const dashIndex = withoutExt.indexOf(" - ");
  if (dashIndex === -1) return { name: withoutExt.trim(), description: "" };
  return {
    name: withoutExt.substring(0, dashIndex).trim(),
    description: withoutExt.substring(dashIndex + 3).trim(),
  };
}

export default function ShortFormPage() {
  const [captionStyles, setCaptionStyles] = useState<CaptionStyle[]>([]);
  const [activeCaption, setActiveCaption] = useState<CaptionStyle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showInfo, setShowInfo] = useState<string | null>(null);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCaptionChange = useCallback((style: CaptionStyle) => {
    setActiveCaption(style);
    setShowInfo(null);
    setVideoError(false);
  }, []);

  useEffect(() => {
    if (!FOLDER_ID || !API_KEY) {
      setError("Google Drive not configured yet.");
      setLoading(false);
      return;
    }

    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'video'&key=${API_KEY}&fields=files(id,name,mimeType)&orderBy=name`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError("Could not load videos. Check folder sharing settings.");
          setLoading(false);
          return;
        }

        const styles: CaptionStyle[] = (data.files || []).map(
          (file: { id: string; name: string }) => {
            const parsed = parseDriveFileName(file.name);
            return {
              id: file.id,
              name: parsed?.name || file.name,
              description: parsed?.description || "",
              videoId: file.id,
            };
          }
        );

        setCaptionStyles(styles);
        if (styles.length > 0) setActiveCaption(styles[0]);
        setLoading(false);
      })
      .catch(() => {
        setError("Network error loading videos.");
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
            <p className="font-body text-sm text-zinc-600">No caption styles available yet. Check back soon.</p>
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
                    {/* Instagram-style top bar */}
                    <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent pt-10 pb-6 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                          <img src="/logo.png" alt="WD" className="w-full h-full rounded-full object-contain bg-black p-1" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-white leading-none">wedreammedia</p>
                          <p className="text-[8px] text-white/50 mt-0.5">Original Audio</p>
                        </div>
                      </div>
                    </div>

                    {/* Video Player via Google Drive Direct URL */}
                    {activeCaption && (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeCaption.id}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.5, ease: cinematicEase }}
                          className="absolute inset-0"
                        >
                          {videoError ? (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-black/90 px-6">
                              <svg className="w-10 h-10 text-zinc-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <p className="text-[10px] text-zinc-600 text-center leading-relaxed">Preview loading…</p>
                            </div>
                          ) : (
                            <video
                              ref={videoRef}
                              key={activeCaption.videoId}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="auto"
                              className="w-full h-full object-contain bg-black"
                              src={getDriveVideoUrl(activeCaption.videoId)}
                              onError={() => setVideoError(true)}
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    )}

                    {/* Instagram-style bottom overlay */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent pb-6 pt-16 px-4 pointer-events-none">
                      <div className="absolute right-3 bottom-16 flex flex-col items-center gap-5">
                        {[
                          { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", label: "24.5K" },
                          { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", label: "1.2K" },
                          { icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z", label: "Share" },
                        ].map((item, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-1">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                            </svg>
                            <span className="text-[8px] text-white/70">{item.label}</span>
                          </div>
                        ))}
                      </div>
                      {activeCaption && (
                        <p className="text-[10px] text-white/90 leading-relaxed pr-12">
                          <span className="font-bold">wedreammedia</span>{" "}
                          {activeCaption.name} ✨
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-amber-500/5 blur-3xl rounded-full" />
              </div>

              {/* ─── Mobile: Full Cards without description + info icon ─── */}
              <div className="lg:hidden w-full mt-8 space-y-3">
                {captionStyles.map((style) => (
                  <div key={style.id} className="relative">
                    <button
                      onClick={() => handleCaptionChange(style)}
                      className={`w-full text-left p-5 border rounded-xl transition-all duration-500 relative overflow-hidden ${
                        activeCaption?.id === style.id
                          ? "border-amber-500/50 bg-amber-500/[0.05]"
                          : "border-white/10 bg-white/[0.02]"
                      }`}
                    >
                      <div
                        className={`absolute top-0 left-0 h-full w-[3px] transition-all duration-500 ${
                          activeCaption?.id === style.id ? "bg-amber-500" : "bg-transparent"
                        }`}
                      />

                      <div className="flex items-center justify-between gap-3">
                        <h3
                          className={`font-heading text-base font-bold uppercase tracking-tight transition-colors duration-300 ${
                            activeCaption?.id === style.id ? "text-amber-500" : "text-white"
                          }`}
                        >
                          {style.name}
                        </h3>

                        <div className="flex items-center gap-3">
                          {/* Info icon */}
                          {style.description && (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowInfo(showInfo === style.id ? null : style.id);
                              }}
                              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-all duration-300 ${
                                showInfo === style.id
                                  ? "bg-amber-500/20 text-amber-500"
                                  : "bg-white/5 text-zinc-500"
                              }`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                                <path strokeLinecap="round" d="M12 16v-4m0-4h.01" />
                              </svg>
                            </div>
                          )}

                          {/* Play indicator */}
                          <div
                            className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
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
                                className="flex items-center gap-[2px]"
                              >
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
                              </motion.div>
                            ) : (
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Info dropdown */}
                    <AnimatePresence>
                      {showInfo === style.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-white/[0.03] border border-white/5 border-t-0 rounded-b-xl px-5 py-3 flex items-start justify-between gap-3">
                            <p className="font-body text-xs text-zinc-500 leading-relaxed">
                              {style.description}
                            </p>
                            <button
                              onClick={() => setShowInfo(null)}
                              className="shrink-0 mt-0.5 text-zinc-600"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Mobile Disclaimer — expandable */}
                <div className="border border-white/5 rounded-xl p-4 mt-4">
                  <button
                    onClick={() => setShowInfo(showInfo === "disclaimer" ? null : "disclaimer")}
                    className="w-full flex items-center justify-between"
                  >
                    <p className="font-body text-[11px] text-zinc-600 leading-relaxed text-left">
                      <span className="text-amber-500/60 font-bold">Note:</span> Reference examples only. Caption changes may cost extra.
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
                            These examples are for reference only. We can match the caption structure and style, but we do not promise 100% identical fonts or motion effects.
                          </p>
                          <p className="font-body text-[11px] text-zinc-500 leading-relaxed flex items-start gap-2">
                            <span className="mt-1 w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
                            We guarantee the structure, timing, and overall feel will match your selected style.
                          </p>
                          <p className="font-body text-[11px] text-zinc-400 leading-relaxed flex items-start gap-2 font-semibold">
                            <span className="mt-1 w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                            Please select your caption style carefully. Caption changes after editing has started may incur additional charges.
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
                    onClick={() => setActiveCaption(style)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: cinematicEase, delay: 0.8 + i * 0.1 }}
                    className={`w-full text-left p-6 border transition-all duration-500 group relative overflow-hidden ${
                      activeCaption?.id === style.id
                        ? "border-amber-500/50 bg-amber-500/[0.05] shadow-[0_0_40px_rgba(245,158,11,0.08)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`absolute top-0 left-0 h-full w-[3px] transition-all duration-500 ${
                        activeCaption?.id === style.id ? "bg-amber-500" : "bg-transparent"
                      }`}
                    />

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className={`font-heading text-lg font-bold uppercase tracking-tight mb-2 transition-colors duration-300 ${
                            activeCaption?.id === style.id ? "text-amber-500" : "text-white"
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
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
                    These examples are for reference only. We can match the caption
                    structure and style, but we do not promise 100% identical fonts
                    or motion effects.
                  </p>
                  <p className="font-body text-sm text-zinc-500 leading-relaxed flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                    We guarantee the structure, timing, and overall feel will match
                    your selected style.
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
            { title: "Caption Styling", desc: "Your chosen caption style applied throughout the video with consistent formatting." },
            { title: "Sound Design", desc: "Trending audio sync, SFX layering, and beat-matched transitions." },
            { title: "Color Correction", desc: "Basic color grading to ensure your footage looks clean and professional." },
            { title: "Platform Export", desc: "Exported in optimal formats for Instagram Reels, TikTok, and YouTube Shorts." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: cinematicEase, delay: i * 0.1 }}
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
