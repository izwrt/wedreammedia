"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "CINEMATIC PRODUCTION",
    description:
      "From breathtaking music videos to compelling documentaries and live events, we capture stories with a true filmmaker's lens.",
  },
  {
    num: "02",
    title: "STORY-FIRST EDITING",
    description:
      "High-end post-production focused on pacing and visual narrative. We believe in purposeful storytelling, not just flashy, over-edited graphics.",
  },
  {
    num: "03",
    title: "VIRAL SOCIAL CONTENT",
    description:
      "Scroll-stopping, algorithm-optimized short-form content engineered to capture attention, dominate feeds, and go viral organically.",
  },
  {
    num: "04",
    title: "CREATOR STRATEGY",
    description:
      "Comprehensive content planning, ideation, and strategic blueprinting designed specifically for video creators to scale their audience.",
  },
  {
    num: "05",
    title: "PODCAST PRODUCTION",
    description:
      "End-to-end audio and video podcast production that sounds pristine, looks cinematic, and keeps your listeners hooked from start to finish.",
  },
  {
    num: "06",
    title: "BRAND IDENTITY",
    description:
      "Bold, cohesive visual systems and branding that demand recognition and leave a lasting mark across all of your digital touchpoints.",
  },
];

const cinematicEase = [0.16, 1, 0.3, 1] as const;

function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const w = 256;
    const h = 256;
    canvas.width = w;
    canvas.height = h;

    const frame = () => {
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(frame);
    };
    frame();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[4] h-full w-full pointer-events-none opacity-[0.12]"
      style={{ mixBlendMode: "overlay" }}
    />
  );
}

export default function Home() {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background hero reel */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero-reel.mp4" type="video/mp4" />
        </video>

        {/* Film grain noise overlay */}
        <FilmGrain />

        {/* Dark overlay */}
        <div className="absolute inset-0 z-[5] bg-black/60" />

        {/* Hero content */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="font-heading text-6xl font-bold uppercase leading-none tracking-tighter text-white md:text-8xl"
          >
            We Dream Media
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="font-body mt-0 text-sm uppercase tracking-[0.3em] text-gray-300 md:text-base"
          >
            Turning Visions Into Digital Reality.
          </motion.p>

          <motion.a
            href="#work"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="font-body mt-14 inline-block border-2 border-white px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-white hover:text-black md:text-sm"
          >
            View Our Work
          </motion.a>
        </div>
      </section>

      {/* ─── Services Section ─── */}
      <section className="w-full min-h-screen bg-black text-white py-32 px-8 md:px-16 relative overflow-hidden">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
            What We Do
          </p>
        </motion.div>

        {/* Cinematic Text Reveal */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: cinematicEase }}
            className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter"
          >
            Our Services
          </motion.h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: cinematicEase,
                delay: (i + 1) * 0.1,
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative border border-white/10 bg-white/[0.02] p-10 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              {/* Oversized number */}
              <span className="absolute top-6 right-6 text-5xl font-black text-white/5 transition-colors duration-500 group-hover:text-white/20 font-heading">
                {service.num}
              </span>

              {/* Hover glow line */}
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-white transition-all duration-700 group-hover:w-full" />

              {/* Content */}
              <h3 className="font-heading text-2xl font-bold uppercase mb-4 tracking-tight">
                {service.title}
              </h3>
              <p className="font-body text-sm text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Collaborate Section ─── */}
      <section className="w-full pb-16 px-8 md:px-16 bg-black text-white grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column — Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">
            Collaborate
          </p>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: cinematicEase }}
              className="font-heading text-3xl md:text-5xl font-black uppercase leading-tight mb-8 tracking-tighter"
            >
              Want to work with us? Leave us a message
            </motion.h2>
          </div>

          <a
            href="mailto:ishwar@wedreammedia.com"
            className="inline-flex items-center gap-3 text-lg text-gray-400 hover:text-white transition-colors duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            ishwar@wedreammedia.com
          </a>
        </motion.div>

        {/* Right Column — Form */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase, delay: 0.2 }}
        >
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-zinc-300 mb-2 block">
                  First Name <span className="text-sm text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors mb-4"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-zinc-300 mb-2 block">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors mb-4"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-zinc-300 mb-2 block">
                Email <span className="text-sm text-amber-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors mb-4"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-zinc-300 mb-2 block">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors mb-4"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-zinc-300 mb-2 block">
                Your Message <span className="text-sm text-amber-500">*</span>
              </label>
              <textarea
                name="message"
                rows={3}
                placeholder="Your Message"
                required
                className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors mb-4 resize-none"
              />
            </div>

            <button
              type="submit"
              className="font-body border border-white px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Submit Form
            </button>
          </form>
        </motion.div>
      </section>
    </>
  );
}
