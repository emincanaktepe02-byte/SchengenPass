"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const STATS = [
  { n: "26",        l: "ülke rehberi"   },
  { n: "Ücretsiz",  l: "her zaman"      },
  { n: "CASCADE",   l: "kademeleme"     },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      className="bg-[#fffef0] min-h-screen flex items-center pt-16"
      aria-label="Ana Sayfa Hero"
    >
      <div className="max-w-[1200px] mx-auto px-6 w-full py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Content ── */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#d7ffc2] text-[#004449] text-[11px] font-semibold tracking-[0.14em] uppercase px-4 py-2 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#004449] animate-pulse" />
              Türkiye&apos;nin Schengen Vize Rehberi · 2026
            </div>

            {/* Display headline */}
            <h1
              className="font-semibold leading-[1.06] text-[#004449]"
              style={{
                fontFamily: "Inter, 'General Sans', sans-serif",
                fontSize: "clamp(2.6rem, 6.5vw, 5rem)",
                letterSpacing: "0.04em",
              }}
            >
              <span className="block">Artık</span>
              <span className="block">
                Schengen
                <span style={{ color: "#483cff" }}>im</span>
              </span>
              <span
                className="block"
                style={{ color: "rgba(0,68,73,0.45)", fontWeight: 400, fontStyle: "italic" }}
              >
                var.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-[18px] text-[#004449]/55 font-normal leading-relaxed max-w-md"
              style={{ fontFamily: "Inter, 'General Sans', sans-serif", letterSpacing: "0.02em" }}
            >
              26 Schengen ülkesi için vize rehberi, topluluk randevuları ve anlık uçuş fırsatları. Tamamen ücretsiz.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="#guide"
                className="px-8 py-3.5 rounded-[900px] bg-[#483cff] text-white text-[13px] font-semibold tracking-[0.06em] transition-colors hover:bg-[#3b31e0]"
                style={{ boxShadow: "0 4px 20px rgba(72,60,255,0.28)" }}
              >
                Ülke Rehberi →
              </Link>
              <Link
                href="#flights"
                className="px-8 py-3.5 rounded-[900px] border border-[#004449]/25 text-[#004449] text-[13px] font-semibold tracking-[0.06em] transition-all hover:border-[#004449]/55 hover:bg-[#004449]/5"
              >
                ✈ Uçuş Fırsatları
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="flex gap-8 pt-5 mt-1 border-t"
              style={{ borderColor: "rgba(0,68,73,0.10)" }}
            >
              {STATS.map((s) => (
                <div key={s.n}>
                  <p
                    className="text-[#004449] font-semibold text-sm"
                    style={{ fontFamily: "Inter" }}
                  >
                    {s.n}
                  </p>
                  <p className="text-[#004449]/38 text-[11px] font-medium tracking-wide mt-0.5">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Photo ── */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            {/* Main photo */}
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "4/5",
                borderRadius: "24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <Image
                src="/Paris.jpg"
                alt="Paris, Fransa"
                fill
                className="object-cover"
                priority
                sizes="40vw"
              />
            </div>

            {/* Floating accent card — bottom-left */}
            <div
              className="absolute -bottom-5 -left-5 bg-[#fffef0] px-5 py-4"
              style={{
                borderRadius: "24px",
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <p className="text-[#004449] text-xs font-semibold">
                🏆 CASCADE Kademeleme
              </p>
              <p className="text-[#004449]/45 text-[11px] mt-0.5">
                1 yıl → 2 yıl → 5 yıl çok girişli
              </p>
            </div>

            {/* Floating mini card — top-right */}
            <div
              className="absolute -top-4 -right-4 bg-[#d7ffc2] px-4 py-3"
              style={{
                borderRadius: "24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <p className="text-[#004449] text-xs font-semibold">90/180 Gün Kuralı</p>
              <p className="text-[#004449]/55 text-[11px] mt-0.5">Kalan günlerin hesabı →</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
