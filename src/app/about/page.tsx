"use client";

import { motion } from "framer-motion";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const philosophies = [
  {
    num: "01",
    title: "CINEMATIC BY DEFAULT",
    description:
      "Every frame matters. We bring a filmmaker's obsession with lighting, pacing, and composition to the digital space.",
  },
  {
    num: "02",
    title: "ALGORITHM NATIVE",
    description:
      "Beautiful video is useless if nobody sees it. Our strategies are built from the ground up to dominate social feeds.",
  },
  {
    num: "03",
    title: "RELENTLESS EXECUTION",
    description:
      "We execute at the highest level. From the first storyboard to the final render, we deliver absolute perfection.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* ─── Cinematic Background ─── */}
      <motion.div
        className="pointer-events-none absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-white/5 blur-[120px]"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[100px]"
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 40, -70, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Film grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ─── Hero Manifesto ─── */}
      <section className="relative z-10 flex flex-col items-center justify-center mt-40 px-8 pt-16 pb-32 md:px-16 md:pt-24 md:pb-40 text-center">
        {/* Masked heading reveal */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: cinematicEase }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none"
          >
            Who We Are
          </motion.h1>
        </div>

        {/* Bold statement */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: cinematicEase, delay: 0.5 }}
          className="font-heading mt-8 max-w-3xl text-2xl md:text-4xl font-bold uppercase tracking-tight text-gray-300 leading-tight"
        >
          We don&apos;t just create content.
          <br />
          We build digital legacies.
        </motion.p>
      </section>

      {/* ─── Our Story ─── */}
      <section className="relative z-10 px-8 md:px-16 pb-32 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase }}
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">
            Our Story
          </p>
          <p className="font-body text-lg md:text-xl text-gray-400 leading-relaxed">
            We Dream Media was built on a simple premise: bring the newest wave
            of modern, cutting-edge digital aesthetics and fuse them with
            algorithm-breaking strategy. We don&apos;t do outdated formats. We
            don&apos;t do template edits. We build fresh, dynamic visual
            experiences designed to dominate today&apos;s fast-paced feeds and
            demand attention.
          </p>
        </motion.div>
      </section>

      {/* ─── Philosophy Grid ─── */}
      <section className="relative z-10 px-8 md:px-16 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            Our Philosophy
          </p>
        </motion.div>

        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: cinematicEase }}
            className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter"
          >
            What Drives Us
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophies.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: cinematicEase,
                delay: i * 0.2,
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative border border-white/10 bg-white/[0.02] p-10 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              {/* Oversized number */}
              <span className="absolute top-6 right-6 text-5xl font-black text-white/5 transition-colors duration-500 group-hover:text-white/20 font-heading">
                {item.num}
              </span>

              {/* Hover glow line */}
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-white transition-all duration-700 group-hover:w-full" />

              {/* Content */}
              <p className="font-body text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
                {item.num} /
              </p>
              <h3 className="font-heading text-xl font-bold uppercase mb-4 tracking-tight">
                {item.title}
              </h3>
              <p className="font-body text-sm text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Founder / Director ─── */}
      <section className="relative z-10 px-8 md:px-16 pb-32">
        <div className="mt-14 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column — Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cinematicEase }}
          >
            <div className="w-full aspect-[3/4] bg-zinc-900 border border-white/10 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 flex items-center justify-center">
              {/* Placeholder — swap for real image later */}
              <span className="font-heading text-[15vw] lg:text-[8vw] font-black text-white/[0.03] uppercase select-none">
                WD
              </span>

              {/* Overlay label */}
              <span className="absolute bottom-6 left-6 text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                Ishwar Tumalsheraw — Founder &amp; Creative Director
              </span>
            </div>
          </motion.div>

          {/* Right Column — Story */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: cinematicEase }}
            >
              <p className="font-body text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
                The Vision
              </p>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: cinematicEase }}
                className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8"
              >
                Built by a storyteller. Driven by obsession.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: cinematicEase, delay: 0.2 }}
              className="font-body text-lg text-gray-400 leading-relaxed mb-6"
            >
              I didn&apos;t start this agency to make standard content. I
              started it because I realized the industry was flooded with people
              who knew how to operate a camera, but had absolutely no idea how to
              tell a story.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: cinematicEase, delay: 0.4 }}
              className="font-body text-lg text-gray-400 leading-relaxed"
            >
              We Dream Media is the culmination of years spent obsessing over the
              perfect frame, the perfect cut, and the perfect hook. When you work
              with us, you aren&apos;t just getting an editor—you are getting a
              partner who treats your brand&apos;s legacy as their own.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─── Contact / Collaborate ─── */}
      <section className="relative z-10 w-full py-32 px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column — Text (centered) */}
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
              Want to work with us? Leave us a message!
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
            {/* First & Last Name */}
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

            {/* Email */}
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

            {/* Subject */}
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

            {/* Message */}
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

            {/* Submit */}
            <button
              type="submit"
              className="font-body border border-white px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Submit Form
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
