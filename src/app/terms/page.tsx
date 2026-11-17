"use client";

import { motion } from "framer-motion";

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const policies = [
  {
    num: "01",
    title: "Payment Policy",
    points: [
      "A 50% advance payment of the total shoot amount is required before the shoot day to confirm your booking.",
      "The remaining 50% is to be paid after the shoot is completed.",
      "Booking is only confirmed once the advance payment is received.",
    ],
  },
  {
    num: "02",
    title: "Scheduling & Time Slots",
    points: [
      "Clients may choose a preferred time slot from the available options provided by our team.",
      "Any changes to the scheduled time must be communicated to us at least one day prior to the shoot, before 6:00 PM.",
      "You may reach us via WhatsApp, Email, or Instagram to request timing adjustments.",
    ],
  },
  {
    num: "03",
    title: "Cancellation Policy",
    points: [
      "If the client fails to inform us about any timing changes before 6:00 PM on the day prior to the shoot, the session will be marked as cancelled.",
      "Cancellations must be communicated at least 48 hours (2 days) before the scheduled shoot date via WhatsApp, Email, or Instagram.",
      "If the client cancels within 48 hours of the shoot or fails to show up, the advance payment (50%) will not be refunded.",
      "This policy is strictly enforced to ensure fairness to all our clients and to maintain our commitment to punctuality.",
    ],
  },
  {
    num: "04",
    title: "Refund Policy",
    points: [
      "Cancellations made 48 hours or more before the shoot date are eligible for a full refund of the advance payment.",
      "Cancellations made within 48 hours of the shoot date are non-refundable, as our team, equipment, and schedule have already been committed.",
      "In the rare event that We Dream Media cancels a shoot, the client will receive a complete refund or the option to reschedule at no extra cost.",
      "No refunds will be issued after the shoot has been completed.",
    ],
  },
  {
    num: "05",
    title: "Why This Matters",
    points: [
      "We respect every client's time equally and strive to deliver the highest standard of service.",
      "Last-minute changes without prior notice result in scheduling conflicts and operational losses that affect other bookings.",
      "By maintaining these standards, we ensure trust, reliability, and a premium experience for everyone.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative flex items-center justify-center pt-48 pb-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-heading text-[18vw] font-black uppercase text-white/[0.02] tracking-tighter leading-none select-none">
            Terms
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: cinematicEase }}
          className="relative text-center max-w-3xl"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-gray-400 mb-4 font-bold">
            Our Policies
          </p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: cinematicEase, delay: 0.2 }}
              className="font-heading text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter"
            >
              Terms & Conditions
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-sm md:text-base text-zinc-500 mt-6 max-w-xl mx-auto leading-relaxed"
          >
            Please read these terms carefully before booking a shoot with us.
            These policies help us maintain the quality and trust you deserve.
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

      {/* Policy Sections */}
      <section className="max-w-3xl mx-auto px-6 md:px-16 py-24 space-y-20">
        {policies.map((policy, i) => (
          <motion.div
            key={policy.num}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cinematicEase, delay: i * 0.1 }}
          >
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-heading text-5xl md:text-6xl font-black text-white/5 select-none">
                {policy.num}
              </span>
              <h2 className="font-heading text-xl md:text-2xl font-black uppercase tracking-tight">
                {policy.title}
              </h2>
            </div>

            <div className="ml-0 md:ml-20 space-y-4">
              {policy.points.map((point, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: cinematicEase,
                    delay: 0.2 + j * 0.1,
                  }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <p className="font-body text-sm md:text-base text-zinc-400 leading-relaxed">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>

            {i < policies.length - 1 && (
              <div className="mt-12 h-[1px] bg-white/5" />
            )}
          </motion.div>
        ))}
      </section>

      {/* Bottom Note */}
      <section className="max-w-3xl mx-auto px-6 md:px-16 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="border border-white/10 p-8 md:p-12"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-amber-500 mb-4 font-bold">
            Important Note
          </p>
          <p className="font-body text-sm md:text-base text-zinc-400 leading-relaxed">
            By booking a shoot with We Dream Media, you agree to the terms
            outlined above. These policies exist to ensure a smooth, professional
            experience for every client. If you have any questions, feel free to
            reach out to us via{" "}
            <a
              href="mailto:ishwar@wedreammedia.com"
              className="text-white hover:text-amber-500 transition-colors underline underline-offset-4"
            >
              email
            </a>
            ,{" "}
            <a
              href="https://instagram.com/wedreammedia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-amber-500 transition-colors underline underline-offset-4"
            >
              Instagram
            </a>
            , or WhatsApp before confirming your booking.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
