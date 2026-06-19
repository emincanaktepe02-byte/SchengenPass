"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=85&auto=format&fit=crop",
    city: "Paris",
    country: "Fransa",
    flag: "🇫🇷",
  },
  {
    url: "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=1920&q=85&auto=format&fit=crop",
    city: "Santorini",
    country: "Yunanistan",
    flag: "🇬🇷",
  },
  {
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=85&auto=format&fit=crop",
    city: "Roma",
    country: "İtalya",
    flag: "🇮🇹",
  },
  {
    url: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1920&q=85&auto=format&fit=crop",
    city: "Amsterdam",
    country: "Hollanda",
    flag: "🇳🇱",
  },
];

const STATS = [
  { value: "26+", label: "Schengen ülkesi rehberi" },
  { value: "~90%", label: "En yüksek onay oranı" },
  { value: "CASCADE", label: "Kademeleme sistemi" },
  { value: "0", label: "Bot veya scraping" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Aurora animated background */}
      <div className="absolute inset-0 aurora-bg" />

      {/* Floating ambient orbs */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full bg-[#00d4ff]/6 blur-[120px] pointer-events-none orb-1" />
      <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] rounded-full bg-[#7b2ff7]/8 blur-[100px] pointer-events-none orb-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#00ff87]/4 blur-[80px] pointer-events-none orb-3" />

      {/* Photo slideshow */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={SLIDES[current].url}
            alt={SLIDES[current].city}
            className="w-full h-full object-cover"
          />
          {/* Multi-layer darkening */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020918] via-[#020918]/70 to-[#020918]/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020918]/60 via-transparent to-[#020918]/60" />
          <div className="absolute inset-0 bg-[#020918]/20" />
        </motion.div>
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
          <span className="text-xs text-white/65 font-light tracking-widest uppercase">
            Türkiye&apos;nin Schengen Vize Rehberi · 2026
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[86px] font-light text-white leading-[1.05] tracking-tight mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Schengen Vizesi
          <br />
          <span className="font-medium italic gradient-text">
            İçin Rehberiniz
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-base sm:text-lg text-white/50 font-light max-w-2xl mx-auto mb-3 leading-relaxed"
        >
          Onay oranları, CASCADE kademeleme, güncel uçuş fiyatları ve 26 ülke için
          detaylı başvuru rehberleri — tamamen ücretsiz, bot yok.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="text-sm text-white/25 font-light mb-10"
        >
          Topluluk katkısı · Elle küratörlenmiş · Scraping yok
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16"
        >
          <Link href="#guide">
            <button className="px-8 py-4 rounded-full text-sm font-medium text-white transition-all bg-gradient-to-r from-[#00d4ff] to-[#7b2ff7] hover:opacity-90 glow-cyan">
              Ülke Rehberini Gör →
            </button>
          </Link>
          <Link href="#flights">
            <button className="px-8 py-4 rounded-full glass text-white/70 font-light text-sm hover:text-white hover:bg-white/[0.07] transition-all">
              ✈ Ucuz Uçuşlar
            </button>
          </Link>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.08 }}
              className="glass rounded-2xl py-4 px-3 text-center"
            >
              <div className="text-xl font-semibold text-white mb-1">{s.value}</div>
              <div className="text-[11px] text-white/35 font-light leading-tight">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              i === current ? "w-8 h-1.5 bg-[#00d4ff]" : "w-2 h-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Location badge */}
      <AnimatePresence>
        <motion.div
          key={`loc-${current}`}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-2.5 glass rounded-full px-4 py-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
          <span className="text-xs text-white/55 font-light">
            {SLIDES[current].flag} {SLIDES[current].city}, {SLIDES[current].country}
          </span>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
