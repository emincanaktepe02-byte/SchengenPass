"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const IMAGES = [
  { src: "/Paris.jpg",     name: "Paris",     flag: "🇫🇷", country: "Fransa"     },
  { src: "/Roma.jpg",      name: "Roma",      flag: "🇮🇹", country: "İtalya"     },
  { src: "/Amsterdam.jpg", name: "Amsterdam", flag: "🇳🇱", country: "Hollanda"   },
  { src: "/Atina.jpg",     name: "Atina",     flag: "🇬🇷", country: "Yunanistan" },
  { src: "/Barcelona.jpg", name: "Barcelona", flag: "🇪🇸", country: "İspanya"    },
  { src: "/Venedik.jpg",   name: "Venedik",   flag: "🇮🇹", country: "İtalya"     },
  { src: "/Prag.jpg",      name: "Prag",      flag: "🇨🇿", country: "Çekya"      },
  { src: "/Kopenhag.jpg",  name: "Kopenhag",  flag: "🇩🇰", country: "Danimarka"  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Title fades up and out
  const titleOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const titleY       = useTransform(scrollYProgress, [0, 0.28], [0, -50]);

  // Grid scales up: starts at 0.64 (cropped, small gap visible), expands to 1.05 (edge bleed)
  const gridScale = useTransform(scrollYProgress, [0, 0.88], [0.64, 1.05]);

  // Dark overlay fades as grid expands
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.82], [0.62, 0]);

  // Bottom CTA fades in at the end of the scroll
  const ctaOpacity = useTransform(scrollYProgress, [0.58, 0.86], [0, 1]);
  const ctaY       = useTransform(scrollYProgress, [0.58, 0.86], [20, 0]);

  // Entire sticky section fades just before scroll ends
  const sectionOpacity = useTransform(scrollYProgress, [0.92, 1], [1, 0]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "290vh" }}>
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 h-screen overflow-hidden"
        aria-label="Ana Sayfa Hero"
      >
        {/* ── IMAGE GRID ── */}
        <motion.div
          style={{ scale: gridScale }}
          className="absolute inset-0 grid grid-cols-4 grid-rows-2"
        >
          {IMAGES.map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image
                src={img.src}
                alt={`${img.name}, ${img.country}`}
                fill
                className="object-cover"
                priority={i < 4}
                sizes="25vw"
              />
              {/* Per-image label (visible at 100% expansion) */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-light">{img.flag} {img.name}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── DARK OVERLAY ── */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 z-10 bg-[#111111] pointer-events-none"
        />

        {/* ── TITLE ── */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none"
        >
          <p className="badge mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Türkiye&apos;nin Schengen Vize Rehberi · 2026
          </p>

          <h1
            className="text-[clamp(2.8rem,8vw,6.5rem)] font-light text-[#F0EBE0] leading-[1.04] tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Schengen
            <br />
            <em className="not-italic font-medium" style={{ color: "#D4A843" }}>
              Vizesi İçin
            </em>
            <br />
            <span className="font-light italic opacity-80">Rehberiniz</span>
          </h1>

          <p className="mt-7 text-[#F0EBE0]/45 text-base font-light max-w-md leading-relaxed">
            26 ülke · Onay oranları · CASCADE kademeleme · Anlık uçuş fiyatları
          </p>
        </motion.div>

        {/* ── BOTTOM CTA (appears at end of scroll) ── */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute bottom-10 left-0 right-0 z-30 flex flex-col items-center gap-5 pointer-events-none"
        >
          <p className="text-[#F0EBE0]/55 text-sm font-light tracking-wide">
            Başvuru rehberini incele
          </p>
          <div className="flex gap-3 pointer-events-auto">
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
          {/* Scroll indicator */}
          <div className="flex items-center gap-2 text-[#F0EBE0]/20 text-xs tracking-widest uppercase mt-2">
            <div className="w-6 h-px bg-[#F0EBE0]/15" />
            keşfet
            <div className="w-6 h-px bg-[#F0EBE0]/15" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
