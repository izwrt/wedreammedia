"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const editingServices = [
  {
    num: "01",
    title: "Short-Form Editing",
    subtitle: "Reels · YouTube Shorts · TikTok",
    description:
      "Scroll-stopping edits optimized for every platform. Fast cuts, trending transitions, captions, and sound design — engineered to go viral.",
  },
  {
    num: "02",
    title: "Long-Form Editing",
    subtitle: "YouTube · Documentaries · Vlogs",
    description:
      "Story-driven editing with cinematic pacing. We handle multi-cam syncing, B-roll integration, sound mixing, and polished final exports.",
  },
  {
    num: "03",
    title: "Music Video Editing",
    subtitle: "Artists · Labels · Independent",
    description:
      "Beat-synced cuts, creative color treatments, and visual storytelling that elevates the music. From concept to final master.",
  },
  {
    num: "04",
    title: "Color Grading",
    subtitle: "Correction · Cinematic Looks · Matching",
    description:
      "Professional color correction and grading that transforms raw footage into cinema. Shot matching, LUT creation, and mood-driven palettes.",
  },
];

const fullServices = [
  {
    num: "01",
    title: "Cinematic Production",
    description:
      "From breathtaking music videos to compelling documentaries and live events, we capture stories with a true filmmaker's lens.",
  },
  {
    num: "02",
    title: "Story-First Editing",
    description:
      "High-end post-production focused on pacing and visual narrative. Purposeful storytelling, not just flashy graphics.",
  },
  {
    num: "03",
    title: "Viral Social Content",
    description:
      "Scroll-stopping, algorithm-optimized short-form content engineered to capture attention and dominate feeds organically.",
  },
  {
    num: "04",
    title: "Creator Strategy",
    description:
      "Comprehensive content planning, ideation, and strategic blueprinting designed for video creators to scale their audience.",
  },
  {
    num: "05",
    title: "Podcast Production",
    description:
      "End-to-end audio and video podcast production that sounds pristine, looks cinematic, and keeps your listeners hooked.",
  },
  {
    num: "06",
    title: "Brand Identity",
    description:
      "Bold, cohesive visual systems and branding that demand recognition across all your digital touchpoints.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Send Your Footage",
    description: "Upload your raw files via Google Drive, WeTransfer, or any cloud link.",
  },
  {
    step: "02",
    title: "Share Your Vision",
    description: "Tell us the style, mood, references, and any specific requirements.",
  },
  {
    step: "03",
    title: "We Edit",
    description: "Our editors craft your footage into a polished, cinematic final product.",
  },
  {
    step: "04",
    title: "Review & Deliver",
    description: "Get your edited video with revisions included. Ready to publish.",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative flex items-center justify-center pt-48 pb-24 px-6 md:px-16 overflow-hidden">
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
            What We Offer
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
            Full-service production or editing only — we work with what you need.
            Bring your vision, or bring your footage. We&apos;ll make it cinematic.
          </motion.p>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: cinematicEase, delay: 0.4 }}
          className="w-24 h-[1px] bg-white/20"
        />
      </div>

      {/* ─── Video Editing Section (Highlight) ─── */}
      <section id="editing" className="max-w-6xl mx-auto px-6 md:px-16 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase }}
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-amber-500 mb-4 font-bold">
            ★ Editing Only Service
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
      </section>

      {/* ─── How It Works ─── */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">
            The Process
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-black uppercase tracking-tighter">
            How It Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflow.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: cinematicEase,
                delay: i * 0.15,
              }}
              className="relative"
            >
              <span className="font-heading text-6xl font-black text-white/5">
                {item.step}
              </span>
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight mt-2 mb-3">
                {item.title}
              </h3>
              <p className="font-body text-sm text-zinc-500 leading-relaxed">
                {item.description}
              </p>
              {i < workflow.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 h-[1px] bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="h-[1px] bg-white/5" />
      </div>

      {/* ─── All Services ─── */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">
            Full Service
          </p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: cinematicEase }}
              className="font-heading text-3xl md:text-5xl font-black uppercase leading-tight tracking-tighter"
            >
              Everything We Do
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fullServices.map((service, i) => (
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
      </section>

      {/* ─── CTA / Contact ─── */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 pb-32">
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
