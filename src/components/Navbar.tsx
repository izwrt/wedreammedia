"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const navLinks = [
  { name: "HOME", path: "/" },
  { name: "ABOUT US", path: "/about" },
];

const ease1: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ease2: [number, number, number, number] = [0.16, 1, 0.3, 1];

const menuVariants = {
  closed: {
    clipPath: "circle(0% at calc(100% - 40px) 40px)",
    transition: { duration: 0.6, ease: ease1 },
  },
  open: {
    clipPath: "circle(150% at calc(100% - 40px) 40px)",
    transition: { duration: 0.8, ease: ease2 },
  },
};

const linkVariants = {
  closed: { x: 80, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: ease2,
      delay: 0.3 + i * 0.1,
    },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredMobileLink, setHoveredMobileLink] = useState<string | null>(null);
  const pathname = usePathname();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Lock body scroll when menu is open
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const slashTarget = hoveredLink ?? pathname;

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-8 transition-all duration-500 ${
          scrolled && !menuOpen
            ? "bg-black/80 backdrop-blur-md py-4 md:py-6 border-b border-white/5"
            : "bg-transparent py-8 md:py-10"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center z-10">
          <Image
            src="/logo.png"
            alt="We Dream Media"
            width={120}
            height={60}
            className="h-auto w-15 md:w-20"
            priority
          />
        </a>

        {/* Desktop Links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="relative text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:text-gray-400 transition-colors"
              onMouseEnter={() => setHoveredLink(link.path)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.name}
              {slashTarget === link.path && (
                <motion.span
                  key={slashTarget}
                  className="pointer-events-none absolute top-2/3 -left-2 w-[140%] h-[1.5px] bg-white rotate-[-5deg] origin-left"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.2, ease: ease1 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Hamburger — visible only on mobile */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden group relative z-10 flex h-10 w-10 flex-col items-end justify-center gap-1.5"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 4, width: 28 } : { rotate: 0, y: 0, width: 28 }}
            transition={{ duration: 0.3, ease: ease1 }}
            className="hamburger-line block h-0.5 bg-white origin-center"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -4, width: 28 } : { rotate: 0, y: 0, width: 20 }}
            transition={{ duration: 0.3, ease: ease1 }}
            className="hamburger-line block h-0.5 bg-white/70 origin-center"
          />
        </button>
      </motion.nav>

      {/* ─── Full-Screen Mobile Menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center"
          >
            {/* Decorative oversized ghost text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <span className="font-heading text-[20vw] font-black uppercase text-white/[0.02] tracking-tighter leading-none select-none">
                WD
              </span>
            </div>

            {/* Menu Links */}
            <nav className="relative z-10 flex flex-col items-center gap-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Link
                    href={link.path}
                    onClick={() => setMenuOpen(false)}
                    onMouseEnter={() => setHoveredMobileLink(link.path)}
                    onMouseLeave={() => setHoveredMobileLink(null)}
                    onTouchStart={() => setHoveredMobileLink(link.path)}
                    onTouchEnd={() => setHoveredMobileLink(null)}
                    className="relative block"
                  >
                    <span
                      className={`font-heading text-3xl font-black uppercase tracking-tight transition-colors duration-300 ${
                        hoveredMobileLink && hoveredMobileLink !== link.path
                          ? "text-gray-600"
                          : "text-white"
                      }`}
                    >
                      {link.name}
                    </span>
                    <AnimatePresence>
                      {(hoveredMobileLink === link.path ||
                        (!hoveredMobileLink && pathname === link.path)) && (
                        <motion.span
                          className="pointer-events-none absolute top-1/2 -left-3 w-[120%] h-[2px] bg-white rotate-[-5deg] origin-left"
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: ease1 }}
                        />
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-16 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-white/20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: ease2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
