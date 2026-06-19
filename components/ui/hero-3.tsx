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
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 22 },
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
      {/* Subtle radial glow behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-radial from-[#00d4ff]/8 via-[#7b2ff7]/5 to-transparent blur-[80px] pointer-events-none" />

      {/* Text content */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
        className="relative z-10 flex flex-col items-center pb-4"
      >
        {/* Tagline badge */}
        <motion.div
          variants={FADE_UP}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
          {tagline}
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={FADE_UP}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[82px] font-light text-white tracking-tight leading-[1.07] mb-5"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={FADE_UP}
          className="max-w-xl text-base sm:text-lg text-white/45 font-light leading-relaxed mb-8"
        >
          {description}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-3 items-center">
          <motion.a
            href={ctaPrimary.href}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7b2ff7] text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity"
            style={{ boxShadow: "0 0 30px rgba(0,212,255,0.25)" }}
          >
            {ctaPrimary.label}
          </motion.a>
          {ctaSecondary && (
            <motion.a
              href={ctaSecondary.href}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-full border border-white/15 text-white/65 text-sm font-light hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
            >
              {ctaSecondary.label}
            </motion.a>
          )}
        </motion.div>
      </motion.div>

      {/* Animated image marquee */}
      <div
        className="absolute bottom-0 left-0 w-full h-[42%]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 22%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 22%, black 75%, transparent 100%)",
        }}
      >
        <motion.div
          className="flex gap-4 items-end h-full"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 50, repeat: Infinity }}
          style={{ width: "max-content" }}
        >
          {duplicated.map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-xl"
              style={{
                width: "clamp(130px, 14vw, 200px)",
                height: "clamp(170px, 18vw, 260px)",
                rotate: `${i % 3 === 0 ? -2.5 : i % 3 === 1 ? 1.5 : -1}deg`,
              }}
            >
              <img
                src={src}
                alt={`Schengen destinasyon ${(i % (duplicated.length / 2)) + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
