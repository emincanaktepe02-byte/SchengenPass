"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  images: string[];
  className?: string;
}

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 20 },
  },
};

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  images,
  className,
}) => {
  const duplicated = [...images, ...images];

  return (
    <section
      className={cn(
        "relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center text-center px-4",
        className
      )}
    >
      {/* Subtle gold radial glow behind text */}
      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, rgba(0,119,182,0.04) 40%, transparent 70%)" }}
      />

      {/* Decorative thin gold horizontal rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      {/* Text content */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}
        className="relative z-10 flex flex-col items-center pb-8 pt-20"
      >
        {/* Tagline badge */}
        <motion.div
          variants={FADE_UP}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/25 bg-white/70 backdrop-blur-sm px-5 py-1.5 text-xs font-medium text-[#0A1628]/55 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {tagline}
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={FADE_UP}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[82px] font-light text-[#0A1628] tracking-tight leading-[1.06] mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={FADE_UP}
          className="max-w-lg text-base sm:text-lg text-[#0A1628]/45 font-light leading-relaxed mb-9"
        >
          {description}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-3 items-center">
          <motion.a
            href={ctaPrimary.href}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-9 py-3.5 rounded-full text-white text-sm font-semibold shadow-lg transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #C9A84C 0%, #B8933F 100%)",
              boxShadow: "0 4px 24px rgba(201,168,76,0.35), 0 1px 2px rgba(10,22,40,0.08)",
            }}
          >
            {ctaPrimary.label}
          </motion.a>
          {ctaSecondary && (
            <motion.a
              href={ctaSecondary.href}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-9 py-3.5 rounded-full border border-[#0A1628]/15 text-[#0A1628]/55 text-sm font-light hover:text-[#0A1628] hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/5 transition-all"
            >
              {ctaSecondary.label}
            </motion.a>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={FADE_UP}
          className="mt-12 flex flex-col items-center gap-2 text-[#0A1628]/25"
        >
          <span className="text-[10px] tracking-widest uppercase font-light">Keşfet</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/30 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Animated image marquee */}
      <div
        className="absolute bottom-0 left-0 w-full h-[38%]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 28%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 28%, black 80%, transparent 100%)",
        }}
      >
        {/* Also fade the sides */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            maskImage: "linear-gradient(to right, black 0%, transparent 4%, transparent 96%, black 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 4%, transparent 96%, black 100%)",
            background: "inherit",
          }}
        />
        <motion.div
          className="flex gap-3 items-end h-full"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 55, repeat: Infinity }}
          style={{ width: "max-content" }}
        >
          {duplicated.map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-lg"
              style={{
                width: "clamp(120px, 13vw, 190px)",
                height: "clamp(160px, 17vw, 250px)",
                rotate: `${i % 3 === 0 ? -3 : i % 3 === 1 ? 2 : -1.5}deg`,
                border: "1px solid rgba(201,168,76,0.18)",
              }}
            >
              <img
                src={src}
                alt={`Schengen destinasyon ${(i % (duplicated.length / 2)) + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Subtle warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/15 to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
