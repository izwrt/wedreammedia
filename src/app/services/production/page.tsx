"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import BackButton from "@/components/BackButton";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const services = [
  {
    num: "01",
    title: "Cinematic Production",
    description:
      "Breathtaking music videos, documentaries, and live event coverage — captured with a filmmaker's eye for detail and emotion.",
  },
  {
    num: "02",
    title: "Brand Films",
    description:
      "Compelling brand stories and commercial content that connect with your audience on an emotional level.",
  },
  {
    num: "03",
    title: "Podcast Production",
    description:
      "End-to-end audio and video podcast production. Pristine sound, cinematic visuals, fully produced.",
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
      "Content planning, ideation, and blueprinting designed for creators who want to scale their audience fast.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Brief & Plan",
    description:
      "We discuss your vision, plan the shoot, scout locations, and lock the creative direction together.",
  },
  {
    step: "02",
    title: "Shoot Day",
    description:
      "Our team handles everything on set — camera, lighting, direction, audio. You just show up.",
  },
  {
    step: "03",
    title: "Post-Production",
    description:
      "Editing, color grading, sound design, and motion graphics — all crafted in-house by our team.",
  },
  {
    step: "04",
    title: "Review & Deliver",
    description:
      "Final review with revisions included. Delivered in all formats you need — ready to publish.",
  },
];

export default function ProductionPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <BackButton />

      {/* ─── Hero ─── */}
      <section className="relative flex items-center justify-center pt-48 pb-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-heading text-[12vw] font-black uppercase text-white/[0.02] tracking-tighter leading-none select-none">
            Production
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: cinematicEase }}
          className="relative text-center max-w-3xl"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">
            Full Service
          </p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: cinematicEase, delay: 0.2 }}
              className="font-heading text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter"
            >
              We Shoot. We Direct. We Edit.
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-sm md:text-base text-zinc-500 mt-6 max-w-xl mx-auto leading-relaxed"
          >
            End-to-end cinematic production for brands, creators, and artists.
            From pre-production planning to the final export — every frame is ours.
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

      {/* ─── Service Cards ─── */}
      <section className="max-w-6xl mx-auto px-6 md:px-16 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">
            What&apos;s Included
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-black uppercase tracking-tighter">
            Our Production Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
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
                <div className="hidden lg:block absolute top-8 -right-5 w-10 h-[1px] bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
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
              Don&apos;t need a shoot?
            </p>
            <p className="font-heading text-xl md:text-2xl font-bold uppercase tracking-tight">
              Already have footage? Check out our editing services.
            </p>
          </div>
          <Link
            href="/services/editing"
            className="font-body shrink-0 border border-amber-500/50 px-8 py-3 text-xs font-bold uppercase tracking-widest text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300"
          >
            Editing Only →
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
            <p className="font-body text-sm uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">
              Get Started
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">
              Let&apos;s plan your shoot
            </h2>
            <p className="font-body text-sm text-zinc-500 leading-relaxed mb-6">
              Tell us about your project and we&apos;ll get back to you with a plan.
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
