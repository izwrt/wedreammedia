import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-32 pb-8 px-8 md:px-16 border-t border-white/5 overflow-hidden">
      {/* Top Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-32">
        {/* Col 1 — Brand */}
        <div>
          <Image
            src="/logo.png"
            alt="We Dream Media"
            width={80}
            height={40}
            className="h-auto w-20"
          />
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
            Building Digital Legacies.
          </p>
        </div>

        {/* Col 2 — Navigation */}
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6 block">
            Navigation
          </span>
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-widest hover:text-gray-400 transition-colors block mb-4"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-bold uppercase tracking-widest hover:text-gray-400 transition-colors block mb-4"
          >
            About Us
          </Link>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6 block">
            Inquiries
          </span>
          <a
            href="mailto:ishwar@wedreammedia.com"
            className="flex items-center text-sm font-bold uppercase tracking-widest hover:text-gray-400 transition-colors mb-4 break-all"
          >
            <svg
              className="w-4 h-4 mr-2 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            ishwar@wedreammedia.com
          </a>
        </div>

        {/* Col 4 — Socials */}
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6 block">
            Socials
          </span>
          <a
            href="https://instagram.com/wedreammedia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-bold uppercase tracking-widest hover:text-gray-400 transition-colors mb-4"
          >
            <svg
              className="w-4 h-4 mr-2 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect
                width="20"
                height="20"
                x="2"
                y="2"
                rx="5"
                ry="5"
                strokeWidth="1.5"
              />
              <path
                d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                strokeWidth="1.5"
              />
              <line
                x1="17.5"
                x2="17.51"
                y1="6.5"
                y2="6.5"
                strokeWidth="1.5"
              />
            </svg>
            Instagram
          </a>
          <a
            href="https://youtube.com/@wedreammedia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-bold uppercase tracking-widest hover:text-gray-400 transition-colors mb-4"
          >
            <svg
              className="w-4 h-4 mr-2 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="1.5"
                d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"
              />
              <polygon
                strokeWidth="1.5"
                points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
              />
            </svg>
            YouTube
          </a>
        </div>
      </div>

      {/* Massive Watermark */}
      <h1 className="font-heading text-[15vw] leading-none font-black text-white/5 uppercase tracking-tighter w-full text-center select-none pointer-events-none">
        We Dream
      </h1>

      {/* Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 uppercase tracking-[0.3em] mt-8">
        <span>© 2026 We Dream Media Inc.</span>
        <span>All Rights Reserved.</span>
      </div>
    </footer>
  );
}
