"use client";

import { useState, FormEvent } from "react";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-2">
          Message Sent!
        </h3>
        <p className="font-body text-sm text-zinc-400 mb-6">
          Thank you for reaching out. We&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="font-body border border-zinc-700 px-6 py-2 text-xs font-bold uppercase tracking-widest text-zinc-300 hover:border-white hover:text-white transition-all duration-300"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Honeypot — hidden from humans, bots auto-fill it, Web3Forms rejects those */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

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
            disabled={status === "loading"}
            className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors mb-4 disabled:opacity-50"
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
            disabled={status === "loading"}
            className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors mb-4 disabled:opacity-50"
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
          disabled={status === "loading"}
          className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors mb-4 disabled:opacity-50"
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
          disabled={status === "loading"}
          className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors mb-4 disabled:opacity-50"
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
          disabled={status === "loading"}
          className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors mb-4 resize-none disabled:opacity-50"
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm mb-4">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="font-body border border-white px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : "Submit Form"}
      </button>
    </form>
  );
}
