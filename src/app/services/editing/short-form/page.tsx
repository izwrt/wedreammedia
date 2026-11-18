"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FOLDER_ID = process.env.NEXT_PUBLIC_GDRIVE_FOLDER_ID || "";
const API_KEY = process.env.NEXT_PUBLIC_GDRIVE_API_KEY || "";

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
      <section className="relative flex items-center justify-center pt-44 pb-12 px-6 md:px-16 overflow-hidden">
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
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-16">
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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
            {/* Left — iPhone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: cinematicEase, delay: 0.4 }}
              className="flex justify-center lg:sticky lg:top-32"
            >
              <div className="relative">
                {/* iPhone Frame */}
                <div className="relative w-[280px] md:w-[300px] rounded-[48px] border-[6px] border-zinc-800 bg-black overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)]">
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
                          <video
                            key={activeCaption.videoId}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-contain bg-black"
                          >
                            <source
                              src={`https://www.googleapis.com/drive/v3/files/${activeCaption.videoId}?alt=media&key=${API_KEY}`}
                              type="video/mp4"
                            />
                          </video>
                        </motion.div>
                      </AnimatePresence>
                    )}

                    {/* Instagram-style bottom overlay */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent pb-6 pt-16 px-4 pointer-events-none">
                      {/* Engagement icons (right side) */}
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

                      {/* Caption preview text */}
                      {activeCaption && (
                        <p className="text-[10px] text-white/90 leading-relaxed pr-12">
                          <span className="font-bold">wedreammedia</span>{" "}
                          {activeCaption.name} ✨
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Reflection glow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-amber-500/5 blur-3xl rounded-full" />
              </div>
            </motion.div>

            {/* Right — Caption Style Selector */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: cinematicEase, delay: 0.6 }}
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
                    {/* Active indicator line */}
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

                      {/* Play indicator */}
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

              {/* Disclaimer */}
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
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-24">
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
      <section className="max-w-6xl mx-auto px-6 md:px-16 pb-32">
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
