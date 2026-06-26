"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, TrendingUp } from "lucide-react";
import { COUNTRY_PAGES } from "@/lib/countryPages";

const DIFF_COLOR = {
  Kolay: "text-emerald-400 border-emerald-400/30 bg-emerald-400/8",
  Orta: "text-yellow-400 border-yellow-400/30 bg-yellow-400/8",
  Zorlu: "text-red-400 border-red-400/30 bg-red-400/8",
};

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const infoVariants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function CountryShowcase() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (index: number) => {
      setDirection(index > active ? 1 : -1);
      setActive(index);
    },
    [active]
  );

  const next = useCallback(() => {
    const n = (active + 1) % COUNTRY_PAGES.length;
    setDirection(1);
    setActive(n);
  }, [active]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused]);

  const country = COUNTRY_PAGES[active];

  return (
    <section
      className="relative overflow-hidden bg-[#0D0D0D]"
      style={{ minHeight: "90vh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background image ── */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`bg-${active}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={country.heroImage}
            alt={country.heroCity}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/92 via-[#0D0D0D]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-[#0D0D0D]/30" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col justify-between h-full min-h-[90vh] max-w-7xl mx-auto px-6 py-16">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-[#F0EBE0]/40 uppercase tracking-widest font-light">
              Ülke Rehberleri
            </span>
          </div>

          {/* Country tabs */}
          <div className="hidden md:flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full p-1 border border-white/8">
            {COUNTRY_PAGES.map((c, i) => (
              <button
                key={c.slug}
                onClick={() => go(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  i === active
                    ? "bg-white/15 text-[#F0EBE0]/90"
                    : "text-[#F0EBE0]/35 hover:text-[#F0EBE0]/65"
                }`}
              >
                <span>{c.flag}</span>
                <span className="hidden lg:block">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`info-${active}`}
            custom={direction}
            variants={infoVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex flex-col gap-6 max-w-xl"
          >
            {/* Flag + country name */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl leading-none">{country.flag}</span>
                <div>
                  <p className="text-xs text-[#F0EBE0]/35 uppercase tracking-widest font-light">
                    {country.name}
                  </p>
                  <p className="text-sm text-[#F0EBE0]/50 font-light">
                    {country.tagline}
                  </p>
                </div>
              </div>

              {/* Headline */}
              <h2
                className="text-[clamp(2.4rem,5vw,4rem)] font-light text-[#F0EBE0] leading-[1.08] tracking-tight mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {country.headline.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </h2>

              <p className="text-[#F0EBE0]/55 text-base font-light leading-relaxed max-w-sm">
                {country.intro.slice(0, 160)}…
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-black/35 backdrop-blur-sm border border-white/10 rounded-full px-3.5 py-2">
                <TrendingUp size={11} className="text-emerald-400" />
                <span className="text-xs text-[#F0EBE0]/65 font-light">
                  %{country.visa.approvalRate} onay oranı
                </span>
              </div>
              <div className="flex items-center gap-2 bg-black/35 backdrop-blur-sm border border-white/10 rounded-full px-3.5 py-2">
                <Clock size={11} className="text-[#D4A843]/70" />
                <span className="text-xs text-[#F0EBE0]/65 font-light">
                  {country.visa.processingTime}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-black/35 backdrop-blur-sm border border-white/10 rounded-full px-3.5 py-2">
                <MapPin size={11} className="text-sky-400" />
                <span className="text-xs text-[#F0EBE0]/65 font-light">
                  {country.heroCity}
                </span>
              </div>
              <span
                className={`flex items-center text-xs rounded-full px-3.5 py-2 border font-medium ${
                  DIFF_COLOR[country.visa.difficulty]
                }`}
              >
                {country.visa.difficulty}
              </span>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <Link
                href={`/ulkeler/${country.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-[#111111] bg-[#D4A843] hover:bg-[#C89A35] transition-colors"
                style={{ boxShadow: "0 4px 20px rgba(212,168,67,0.35)" }}
              >
                Rehberi Gör
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/ulkeler"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-light text-[#F0EBE0]/65 border border-white/12 hover:border-white/25 hover:text-[#F0EBE0] transition-all"
              >
                Tüm Ülkeler
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom — progress dots + arrows */}
        <div className="flex items-center justify-between">
          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {COUNTRY_PAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="relative h-0.5 transition-all duration-500 rounded-full overflow-hidden"
                style={{ width: i === active ? 40 : 12 }}
              >
                <div className="absolute inset-0 bg-white/15" />
                {i === active && (
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#D4A843]"
                    initial={{ width: "0%" }}
                    animate={{ width: paused ? undefined : "100%" }}
                    transition={
                      paused
                        ? {}
                        : { duration: 5, ease: "linear", repeat: 0 }
                    }
                    key={`progress-${active}-${paused}`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile tabs */}
          <div className="flex md:hidden items-center gap-2">
            {COUNTRY_PAGES.map((c, i) => (
              <button
                key={c.slug}
                onClick={() => go(i)}
                className={`text-xl transition-opacity ${
                  i === active ? "opacity-100" : "opacity-30"
                }`}
              >
                {c.flag}
              </button>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => {
                const n =
                  (active - 1 + COUNTRY_PAGES.length) % COUNTRY_PAGES.length;
                go(n);
              }}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/12 text-[#F0EBE0]/40 hover:border-[#D4A843]/40 hover:text-[#D4A843] transition-all"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/12 text-[#F0EBE0]/40 hover:border-[#D4A843]/40 hover:text-[#D4A843] transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
