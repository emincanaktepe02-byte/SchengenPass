"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Props {
  images: string[];
  interval?: number;   // seconds per slide (default 8)
  darkness?: number;   // 0–100 overlay strength (default 82)
  edges?: "all" | "top" | "bottom" | "sides" | "none";
}

export default function SceneryBg({
  images,
  interval = 8,
  darkness = 82,
  edges = "all",
}: Props) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(
      () => setIdx((i) => (i + 1) % images.length),
      interval * 1000
    );
    return () => clearInterval(t);
  }, [images.length, interval]);

  // hex alpha for base overlay
  const hex = Math.round((darkness / 100) * 255)
    .toString(16)
    .padStart(2, "0");
  const baseColor = `#111111${hex}`;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.0 }}
          animate={{ opacity: 1, scale: 1.07 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{
            opacity: { duration: 1.6, ease: "easeInOut" },
            scale: { duration: interval + 1.6, ease: "linear" },
          }}
        >
          <Image
            src={images[idx]}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={idx === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Base darkening layer */}
      <div className="absolute inset-0" style={{ background: baseColor }} />

      {/* Edge gradients */}
      {(edges === "top" || edges === "all") && (
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#111111] via-[#111111]/60 to-transparent" />
      )}
      {(edges === "bottom" || edges === "all") && (
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
      )}
      {(edges === "sides" || edges === "all") && (
        <>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#111111]/60 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#111111]/60 to-transparent" />
        </>
      )}

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 35%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Subtle noise texture overlay for film-grain feel */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
