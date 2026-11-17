"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ServicesPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* ─── Hero ─── */}
      <section className="relative flex items-center justify-center pt-48 pb-16 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-heading text-[15vw] font-black uppercase text-white/[0.02] tracking-tighter leading-none select-none">
            Services
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: cinematicEase }}
          className="relative text-center max-w-3xl"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">
            Two Ways To Work With Us
          </p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: cinematicEase, delay: 0.2 }}
              className="font-heading text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter"
            >
              Choose Your Path
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-sm md:text-base text-zinc-500 mt-6 max-w-xl mx-auto leading-relaxed"
          >
            Need the full experience? We shoot, direct, and edit.
            Already have footage? Just send it we&apos;ll handle the rest.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── Two Path Cards ─── */}
      <section className="max-w-5xl mx-auto px-6 md:px-16 pb-40 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Full Production Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: cinematicEase, delay: 0.3 }}
          >
            <Link
              href="/services/production"
              className="group relative border border-white/20 p-10 md:p-14 overflow-hidden transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_80px_rgba(255,255,255,0.06)] block h-full"
            >
              <div className="absolute top-0 left-0 h-[3px] w-0 bg-white transition-all duration-700 group-hover:w-full" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex flex-col h-full">
                <span className="text-5xl block h-16">🎬</span>

                <p className="font-body text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-3">
                  Full Service
                </p>
                <h3 className="font-heading text-2xl md:text-3xl font-black uppercase tracking-tight h-[72px] flex items-start">
                  Full Production
                </h3>

                <div className="space-y-4 mb-10">
                  {["We shoot.", "We direct.", "We edit.", "We deliver."].map((text) => (
                    <p key={text} className="font-body text-sm text-zinc-300 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                      {text}
                    </p>
                  ))}
                </div>

                <p className="font-body text-sm text-zinc-600 leading-relaxed h-[60px]">
                  End-to-end cinematic production. From concept to final delivery —
                  we handle every frame.
                </p>

                <div className="mt-auto pt-8">
                  <span className="font-body inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors duration-300 border-b border-white/10 group-hover:border-white/40 pb-1">
                    Explore Services
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Editing Only Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: cinematicEase, delay: 0.5 }}
          >
            <Link
              href="/services/editing"
              className="group relative border border-amber-500/20 p-10 md:p-14 overflow-hidden transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_80px_rgba(245,158,11,0.06)] block h-full"
            >
              <div className="absolute top-0 left-0 h-[3px] w-0 bg-amber-500 transition-all duration-700 group-hover:w-full" />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex flex-col h-full">
                <span className="text-5xl block h-16">✂️</span>

                <p className="font-body text-[10px] uppercase tracking-[0.3em] text-amber-500/60 mb-3">
                  Post-Production
                </p>
                <h3 className="font-heading text-2xl md:text-3xl font-black uppercase tracking-tight h-[72px] flex items-start">
                  Editing Only
                </h3>

                <div className="space-y-4 mb-10">
                  {["You shoot.", "You send footage.", "We edit.", "We deliver."].map((text) => (
                    <p key={text} className="font-body text-sm text-zinc-300 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      {text}
                    </p>
                  ))}
                </div>

                <p className="font-body text-sm text-zinc-600 leading-relaxed h-[60px]">
                  Already have your footage? Send us the raw files and we&apos;ll
                  transform them into polished, professional content.
                </p>

                <div className="mt-auto pt-8">
                  <span className="font-body inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-500/40 group-hover:text-amber-500 transition-colors duration-300 border-b border-amber-500/10 group-hover:border-amber-500/40 pb-1">
                    Explore Services
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
