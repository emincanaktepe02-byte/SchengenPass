"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=85&auto=format&fit=crop",
    city: "Paris",
    country: "Fransa",
    desc: "Eyfel Kulesi altında bir akşam üstü",
  },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&auto=format&fit=crop",
    city: "İsviçre Alpleri",
    country: "İsviçre",
    desc: "Beyaz örtülü dağ doruklarında",
  },
  {
    url: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=1920&q=85&auto=format&fit=crop",
    city: "Oslo",
    country: "Norveç",
    desc: "Fiyortların gizli şehri",
  },
  {
    url: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1920&q=85&auto=format&fit=crop",
    city: "Amsterdam",
    country: "Hollanda",
    desc: "Kanal kıyısında turuncu akşam",
  },
];

const STATS = [
  { value: "26", label: "Schengen ülkesi" },
  { value: "€0", label: "Tamamen ücretsiz" },
  { value: "Elle", label: "Küratörlenmiş içerik" },
  { value: "Sıfır", label: "Bot veya scraping" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background slideshow */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={SLIDES[current].url}
            alt={SLIDES[current].city}
            className="w-full h-full object-cover"
          />
          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Slide indicator */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              i === current ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Current location badge */}
      <motion.div
        key={`loc-${current}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-36 right-8 z-20 hidden md:flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-white/70 font-light">
          {SLIDES[current].city}, {SLIDES[current].country}
        </span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-xs text-white/70 font-light tracking-wider uppercase">
            Ücretsiz · Küratörlü · Scraping Yok
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] tracking-tight mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Schengen Vizesi
          <br />
          <span className="font-medium italic">İçin Rehberiniz</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-lg text-white/50 font-light max-w-xl mx-auto mb-4 leading-relaxed"
        >
          Topluluk temelli, ücretsiz bir Schengen vize rehberi. Boş randevu paylaşımları,
          uygun uçuş fırsatları ve detaylı ülke başvuru rehberleri.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-white/30 font-light mb-10"
        >
          Bot yok. Scraping yok. Ücret yok. Sadece bilgi.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Link href="#guide">
            <Button variant="default" size="lg" className="text-sm px-8">
              Ülke Rehberini Gör →
            </Button>
          </Link>
          <Link href="#appointments">
            <Button variant="ghost" size="lg" className="text-sm px-8">
              Randevu Paylaşımları
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto border-t border-white/10 pt-8"
        >
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-medium text-white tracking-tight">{s.value}</div>
              <div className="text-xs text-white/30 font-light mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
