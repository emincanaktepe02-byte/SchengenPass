"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const GLSLHills = dynamic(
  () => import("@/components/ui/glsl-hills").then((m) => m.GLSLHills),
  { ssr: false }
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.38], [0, -60]);
  const sectionOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const photoScale     = useTransform(scrollYProgress, [0, 1], [1.0, 1.12]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "200vh" }}>
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 h-screen overflow-hidden"
        aria-label="Ana Sayfa Hero"
      >
        {/* ── LANDSCAPE PHOTO ── */}
        <motion.div
          style={{ scale: photoScale }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/Iskocya.jpg"
            alt="Avrupa manzarası"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* ── DARK OVERLAY ── */}
        <div className="absolute inset-0 z-[1] bg-[#111111]/72 pointer-events-none" />

        {/* ── GLSL HILLS ANIMATION ── */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <GLSLHills width="100%" height="100%" speed={0.4} cameraZ={125} planeSize={256} />
        </div>

        {/* ── CONTENT ── */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none"
        >
          <p className="badge mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Türkiye&apos;nin Schengen Vize Rehberi · 2026
          </p>

          <h1
            className="text-[clamp(3.2rem,9vw,7.5rem)] font-light text-[#F0EBE0] leading-[1.05] tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            <span className="font-light italic opacity-75">Artık</span>
            <br />
            <span className="font-light">
              Schengen
              <em className="not-italic font-semibold" style={{ color: "#D4A843" }}>im</em>
            </span>
            <br />
            <span className="font-light italic opacity-80">var.</span>
          </h1>

          <p className="mt-8 text-[#F0EBE0]/50 text-lg font-light max-w-lg leading-relaxed">
            26 ülke · Onay oranları · CASCADE kademeleme · Anlık uçuş fiyatları
          </p>

          <div className="flex gap-3 mt-10 pointer-events-auto">
            <Link
              href="#guide"
              className="px-7 py-3 rounded-full text-sm font-medium text-[#111111] bg-[#D4A843] hover:bg-[#C89A35] transition-colors shadow-lg"
              style={{ boxShadow: "0 4px 20px rgba(212,168,67,0.4)" }}
            >
              Ülke Rehberi →
            </Link>
            <Link
              href="#flights"
              className="px-7 py-3 rounded-full text-sm font-light text-[#F0EBE0]/70 border border-[#F0EBE0]/15 hover:border-[#F0EBE0]/35 hover:text-[#F0EBE0] transition-all"
            >
              ✈ Uçuş Fırsatları
            </Link>
          </div>
        </motion.div>

        {/* ── SCROLL INDICATOR ── */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex items-center justify-center gap-2 text-[#F0EBE0]/20 text-xs tracking-widest uppercase pointer-events-none select-none">
          <div className="w-6 h-px bg-[#F0EBE0]/15" />
          keşfet
          <div className="w-6 h-px bg-[#F0EBE0]/15" />
        </div>
      </motion.div>
    </div>
  );
}
