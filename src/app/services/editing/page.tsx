"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import BackButton from "@/components/BackButton";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const editingServices = [
  {
    num: "01",
    title: "Short-Form Editing",
    subtitle: "Reels · YouTube Shorts · TikTok",
    description:
      "Fast cuts, trending transitions, captions, and sound design — engineered to go viral on every platform.",
    href: "/services/editing/short-form",
  },
  {
    num: "02",
    title: "Long-Form Editing",
    subtitle: "YouTube · Documentaries · Vlogs",
    description:
      "Story-driven editing with cinematic pacing. Multi-cam syncing, B-roll integration, and polished exports.",
    href: null,
  },
  {
    num: "03",
    title: "Music Video Editing",
    subtitle: "Artists · Labels · Independent",
    description:
      "Beat-synced cuts, creative color treatments, and visual storytelling that elevates the music.",
    href: null,
  },
  {
    num: "04",
    title: "Color Grading",
    subtitle: "Correction · Cinematic Looks · Matching",
    description:
      "Professional color correction and grading. Shot matching, LUT creation, and mood-driven palettes.",
    href: null,
  },
];

const workflow = [
  {
    step: "01",
    title: "Send Your Footage",
    description:
      "Upload your raw files via Google Drive, WeTransfer, or any cloud link. We accept all major formats.",
  },
  {
    step: "02",
    title: "Share Your Vision",
    description:
      "Tell us the style, mood, references, and any specific requirements. The more detail, the better.",
  },
  {
    step: "03",
    title: "We Edit",
    description:
      "Our editors transform your raw footage into a polished, cinematic final product.",
  },
  {
    step: "04",
    title: "Review & Deliver",
    description:
      "Get your edited video with revisions included. Delivered in all formats — ready to publish.",
  },
];

const formats = [
  "MP4", "MOV", "ProRes", "RAW", "BRAW", "MXF", "AVI",
  "R3D", "ARRIRAW", "DNG", "MKV", "WEBM",
];

export default function EditingPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <BackButton />

      {/* ─── Hero ─── */}
      <section className="relative flex items-center justify-center pt-48 pb-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-heading text-[14vw] font-black uppercase text-white/[0.02] tracking-tighter leading-none select-none">
            Editing
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: cinematicEase }}
          className="relative text-center max-w-3xl"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-amber-500 mb-4 font-bold">
            ★ Editing Only
          </p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: cinematicEase, delay: 0.2 }}
              className="font-heading text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter"
            >
              You Shoot. We Edit.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-sm md:text-base text-zinc-500 mt-6 max-w-xl mx-auto leading-relaxed"
          >
            Already have your footage? Send us the raw files and we&apos;ll
            transform them into polished, professional content — no shoot required.
          </motion.p>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: cinematicEase, delay: 0.4 }}
          className="w-24 h-[1px] bg-amber-500/30"
        />
      </div>

      {/* ─── Editing Service Cards ─── */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-amber-500/70 mb-4 font-bold">
            What We Edit
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-black uppercase tracking-tighter">
            Our Editing Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative border border-white/10 bg-white/[0.02] p-10 overflow-hidden transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.05)]"
            >
              <span className="absolute top-6 right-6 text-5xl font-black text-white/5 transition-colors duration-500 group-hover:text-amber-500/20 font-heading">
                {service.num}
              </span>
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-amber-500 transition-all duration-700 group-hover:w-full" />

              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-amber-500/60 mb-2">
                {service.subtitle}
              </p>
              <h3 className="font-heading text-xl md:text-2xl font-bold uppercase mb-4 tracking-tight">
                {service.title}
              </h3>
              <p className="font-body text-sm text-gray-400 leading-relaxed mb-6">
                {service.description}
              </p>
              {service.href ? (
                <Link
                  href={service.href}
                  className="font-body inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-500/50 group-hover:text-amber-500 transition-colors duration-300 border-b border-amber-500/10 group-hover:border-amber-500/40 pb-1"
                >
                  Know More
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ) : (
                <span className="font-body text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  Coming Soon
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 pb-32">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {workflow.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: cinematicEase, delay: i * 0.15 }}
              className="relative"
            >
              <span className="font-heading text-6xl font-black text-amber-500/10">
                {item.step}
              </span>
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight mt-2 mb-3">
                {item.title}
              </h3>
              <p className="font-body text-sm text-zinc-500 leading-relaxed">
                {item.description}
              </p>
              {i < workflow.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-5 w-10 h-[1px] bg-amber-500/20" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Accepted Formats ─── */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="border border-white/5 p-8 md:p-12"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-zinc-600 mb-6 font-bold">
            We Accept All Major Formats
          </p>
          <div className="flex flex-wrap gap-3">
            {formats.map((fmt) => (
              <span
                key={fmt}
                className="font-body text-xs uppercase tracking-wider text-zinc-500 border border-white/10 px-4 py-2 hover:border-amber-500/30 hover:text-amber-500 transition-all duration-300"
              >
                {fmt}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">
              Need the full package?
            </p>
            <p className="font-heading text-xl md:text-2xl font-bold uppercase tracking-tight">
              Want us to shoot and edit? Check out full production.
            </p>
          </div>
          <Link
            href="/services/production"
            className="font-body shrink-0 border border-white/50 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Full Production →
          </Link>
        </motion.div>
      </section>

      {/* ─── Contact Form ─── */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cinematicEase }}
          >
            <p className="font-body text-sm uppercase tracking-[0.3em] text-amber-500/70 mb-4 font-bold">
              Get Started
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">
              Send us your footage
            </h2>
            <p className="font-body text-sm text-zinc-500 leading-relaxed mb-6">
              Tell us about your project, the style you&apos;re going for, and
              share a link to your footage. We&apos;ll take it from there.
            </p>
            <a
              href="mailto:ishwar@wedreammedia.com"
              className="inline-flex items-center gap-3 text-lg text-gray-400 hover:text-amber-500 transition-colors duration-300"
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
