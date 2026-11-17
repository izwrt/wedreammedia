"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function BackButton({ href = "/services" }: { href?: string }) {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push(href)}
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: cinematicEase, delay: 0.6 }}
      className="fixed top-8 right-8 z-50 group"
    >
      {/* Outer glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/5 scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-[1.8] transition-all duration-700"
      />

      {/* Button body */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3, ease: cinematicEase }}
        className="relative flex items-center gap-3 bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-full pl-5 pr-6 py-3 group-hover:border-white/30 group-hover:bg-white/[0.1] transition-all duration-500"
      >
        {/* Animated arrow */}
        <motion.svg
          className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          initial={{ x: 0 }}
          whileHover={{ x: -3 }}
          transition={{ duration: 0.3, ease: cinematicEase }}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </motion.svg>

        {/* Text with slide reveal */}
        <span className="font-body text-[10px] uppercase tracking-[0.25em] text-white/50 group-hover:text-white transition-colors duration-300">
          Back
        </span>

        {/* Bottom shine line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white/30 group-hover:w-3/4 transition-all duration-500" />
      </motion.div>
    </motion.button>
  );
}
