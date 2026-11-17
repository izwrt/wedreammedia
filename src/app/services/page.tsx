"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const productionServices = [
  {
    num: "01",
    title: "Cinematic Production",
    description:
      "Breathtaking music videos, documentaries, and live event coverage — captured with a filmmaker's eye.",
  },
  {
    num: "02",
    title: "Brand Films",
    description:
      "Compelling brand stories and commercial content that connect with your audience emotionally.",
  },
  {
    num: "03",
    title: "Podcast Production",
    description:
      "End-to-end audio and video podcast production. Pristine sound, cinematic look, fully produced.",
  },
  {
    num: "04",
    title: "Social Content",
    description:
      "Scroll-stopping reels, shorts, and viral content — shot, edited, and optimized for every platform.",
  },
  {
    num: "05",
    title: "Event Coverage",
    description:
      "Multi-camera event filming with same-day highlights, full recap edits, and cinematic after-movies.",
  },
  {
    num: "06",
    title: "Creator Strategy",
    description:
      "Content planning, ideation, and blueprinting designed for creators who want to scale their audience.",
  },
];

const editingServices = [
  {
    num: "01",
    title: "Short-Form Editing",
    subtitle: "Reels · YouTube Shorts · TikTok",
    description:
      "Fast cuts, trending transitions, captions, and sound design — engineered to go viral on every platform.",
  },
  {
    num: "02",
    title: "Long-Form Editing",
    subtitle: "YouTube · Documentaries · Vlogs",
    description:
      "Story-driven editing with cinematic pacing. Multi-cam syncing, B-roll integration, and polished exports.",
  },
  {
    num: "03",
    title: "Music Video Editing",
    subtitle: "Artists · Labels · Independent",
    description:
      "Beat-synced cuts, creative color treatments, and visual storytelling that elevates the music.",
  },
  {
    num: "04",
    title: "Color Grading",
    subtitle: "Correction · Cinematic Looks · Matching",
    description:
      "Professional color correction and grading. Shot matching, LUT creation, and mood-driven palettes.",
  },
];

const productionWorkflow = [
  { step: "01", title: "Brief & Plan", description: "We discuss your vision, plan the shoot, and lock the creative direction." },
  { step: "02", title: "Shoot Day", description: "Our team handles everything on set — camera, lighting, direction, audio." },
  { step: "03", title: "Post-Production", description: "Editing, color grading, sound design, and motion graphics — all in-house." },
  { step: "04", title: "Deliver", description: "Final review, revisions, and delivery in all formats you need." },
];

const editingWorkflow = [
  { step: "01", title: "Send Footage", description: "Upload your raw files via Google Drive, WeTransfer, or any cloud link." },
  { step: "02", title: "Share Your Vision", description: "Tell us the style, mood, references, and any specific requirements." },
  { step: "03", title: "We Edit", description: "Our editors transform your footage into a polished, cinematic product." },
  { step: "04", title: "Review & Deliver", description: "Get your edited video with revisions. Ready to publish." },
];

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
              Our Services
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-sm md:text-base text-zinc-500 mt-6 max-w-xl mx-auto leading-relaxed"
          >
            Need the full experience? We shoot, direct, and edit.
            Already have footage? Just send it — we&apos;ll handle the rest.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── Choose Your Path ─── */}
      <section className="max-w-5xl mx-auto px-6 md:px-16 pb-32 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Production Card */}
          <motion.a
            href="#production"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("production")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: cinematicEase, delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group relative border border-white/20 p-10 md:p-12 overflow-hidden transition-all duration-500 hover:border-white/50 hover:shadow-[0_0_60px_rgba(255,255,255,0.08)] cursor-pointer block"
          >
            <div className="absolute top-0 left-0 h-[3px] w-0 bg-white transition-all duration-700 group-hover:w-full" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <span className="font-heading text-6xl md:text-7xl font-black text-white/5 block leading-none">
                🎬
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-black uppercase tracking-tight mt-4 mb-6">
                Full Production
              </h3>

              <div className="space-y-3 mb-8">
                <p className="font-body text-sm text-zinc-300 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  We shoot.
                </p>
                <p className="font-body text-sm text-zinc-300 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  We direct.
                </p>
                <p className="font-body text-sm text-zinc-300 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  We edit.
                </p>
                <p className="font-body text-sm text-zinc-300 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  We deliver.
                </p>
              </div>

              <p className="font-body text-xs text-zinc-500 leading-relaxed mb-6">
                End-to-end cinematic production. From concept to final delivery —
                we handle every frame.
              </p>

              <span className="font-body text-xs uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors duration-300">
                Learn More ↓
              </span>
            </div>
          </motion.a>

          {/* Editing Only Card */}
          <motion.a
            href="#editing"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("editing")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: cinematicEase, delay: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group relative border border-amber-500/20 p-10 md:p-12 overflow-hidden transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_0_60px_rgba(245,158,11,0.08)] cursor-pointer block"
          >
            <div className="absolute top-0 left-0 h-[3px] w-0 bg-amber-500 transition-all duration-700 group-hover:w-full" />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <span className="font-heading text-6xl md:text-7xl font-black text-white/5 block leading-none">
                ✂️
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-black uppercase tracking-tight mt-4 mb-6">
                Editing Only
              </h3>

              <div className="space-y-3 mb-8">
                <p className="font-body text-sm text-zinc-300 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  You shoot.
                </p>
                <p className="font-body text-sm text-zinc-300 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  You send footage.
                </p>
                <p className="font-body text-sm text-zinc-300 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  We edit.
                </p>
                <p className="font-body text-sm text-zinc-300 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  We deliver.
                </p>
              </div>

              <p className="font-body text-xs text-zinc-500 leading-relaxed mb-6">
                Already have your footage? Send us the raw files and we&apos;ll
                transform them into polished, professional content.
              </p>

              <span className="font-body text-xs uppercase tracking-[0.2em] text-amber-500/50 group-hover:text-amber-500 transition-colors duration-300">
                Learn More ↓
              </span>
            </div>
          </motion.a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* ─── FULL PRODUCTION SECTION ─── */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="production" className="max-w-6xl mx-auto px-6 md:px-16 pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase }}
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-white/50 mb-4 font-bold">
            Full Service
          </p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: cinematicEase }}
              className="font-heading text-3xl md:text-5xl font-black uppercase leading-tight tracking-tighter mb-4"
            >
              We Shoot. We Direct. We Edit.
            </motion.h2>
          </div>
          <p className="font-body text-sm md:text-base text-zinc-500 max-w-2xl leading-relaxed">
            End-to-end cinematic production for brands, creators, and artists.
            From pre-production planning to the final export — every frame is ours.
          </p>
        </motion.div>

        {/* Production Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {productionServices.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: cinematicEase,
                delay: i * 0.1,
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative border border-white/10 bg-white/[0.02] p-10 overflow-hidden transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            >
              <span className="absolute top-6 right-6 text-5xl font-black text-white/5 transition-colors duration-500 group-hover:text-white/20 font-heading">
                {service.num}
              </span>
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-white transition-all duration-700 group-hover:w-full" />
              <h3 className="font-heading text-xl md:text-2xl font-bold uppercase mb-4 tracking-tight">
                {service.title}
              </h3>
              <p className="font-body text-sm text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Production Workflow */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cinematicEase }}
            className="mb-12"
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-zinc-600 mb-3 font-bold">
              How Full Production Works
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productionWorkflow.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: cinematicEase, delay: i * 0.15 }}
                className="relative"
              >
                <span className="font-heading text-5xl font-black text-white/5">{item.step}</span>
                <h3 className="font-heading text-base font-bold uppercase tracking-tight mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                {i < productionWorkflow.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-4 w-8 h-[1px] bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-8">
        <div className="h-[1px] bg-white/5" />
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* ─── EDITING ONLY SECTION ─── */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="editing" className="max-w-6xl mx-auto px-6 md:px-16 pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase }}
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-amber-500 mb-4 font-bold">
            ★ Editing Only
          </p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: cinematicEase }}
              className="font-heading text-3xl md:text-5xl font-black uppercase leading-tight tracking-tighter mb-4"
            >
              You Shoot. We Edit.
            </motion.h2>
          </div>
          <p className="font-body text-sm md:text-base text-zinc-500 max-w-2xl leading-relaxed">
            Already have your footage? Perfect. Send us your raw files and we&apos;ll
            transform them into polished, professional content — no shoot required.
          </p>
        </motion.div>

        {/* Editing Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {editingServices.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: cinematicEase,
                delay: i * 0.1,
              }}
              className="group relative border border-white/10 bg-white/[0.02] p-10 overflow-hidden transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.05)]"
            >
              <span className="absolute top-6 right-6 text-5xl font-black text-white/5 transition-colors duration-500 group-hover:text-amber-500/20 font-heading">
                {service.num}
              </span>
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-amber-500 transition-all duration-700 group-hover:w-full" />

              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-amber-500/70 mb-2">
                {service.subtitle}
              </p>
              <h3 className="font-heading text-xl md:text-2xl font-bold uppercase mb-4 tracking-tight">
                {service.title}
              </h3>
              <p className="font-body text-sm text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Editing Workflow */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cinematicEase }}
            className="mb-12"
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-zinc-600 mb-3 font-bold">
              How Editing Only Works
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {editingWorkflow.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: cinematicEase, delay: i * 0.15 }}
                className="relative"
              >
                <span className="font-heading text-5xl font-black text-amber-500/10">{item.step}</span>
                <h3 className="font-heading text-base font-bold uppercase tracking-tight mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                {i < editingWorkflow.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-4 w-8 h-[1px] bg-amber-500/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / Contact ─── */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cinematicEase }}
          >
            <p className="font-body text-sm uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">
              Get Started
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">
              Ready to create something amazing?
            </h2>
            <p className="font-body text-sm text-zinc-500 leading-relaxed mb-6">
              Whether you need a full production or just editing — drop us a
              message and let&apos;s bring your vision to life.
            </p>
            <a
              href="mailto:ishwar@wedreammedia.com"
              className="inline-flex items-center gap-3 text-lg text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              ishwar@wedreammedia.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cinematicEase, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
