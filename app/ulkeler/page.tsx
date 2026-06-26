import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COUNTRY_PAGES } from "@/lib/countryPages";
import { ArrowRight, TrendingUp, Clock, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Ülke Rehberleri — schengenim.com",
  description:
    "Fransa, İtalya, Almanya, İspanya, Hollanda için kapsamlı seyahat ve vize rehberi. Onay oranları, dikkat edilmesi gerekenler, seyahat tavsiyeleri.",
};

const DIFF_COLOR = {
  Kolay: { text: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/25" },
  Orta: { text: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/25" },
  Zorlu: { text: "text-red-400", bg: "bg-red-400/10 border-red-400/25" },
};

export default function UlkelerPage() {
  return (
    <main className="min-h-screen bg-[#111111]">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="mb-3">
          <span className="badge badge-gold">Ülke Rehberleri 2026</span>
        </div>
        <h1
          className="text-[clamp(2.8rem,6vw,5rem)] font-light text-[#F0EBE0] leading-[1.08] tracking-tight mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Schengen'in
          <br />
          <em className="italic opacity-60">5 İkonu</em>
        </h1>
        <p className="text-[#F0EBE0]/50 text-lg font-light max-w-xl leading-relaxed">
          Fransa'dan Hollanda'ya; seyahat tavsiyeleri, vize dikkat noktaları,
          onay oranları ve yerel rehber — her şey bir arada.
        </p>
      </section>

      {/* Country cards */}
      <section className="pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COUNTRY_PAGES.map((country, i) => {
            const diff = DIFF_COLOR[country.visa.difficulty];
            return (
              <Link
                key={country.slug}
                href={`/ulkeler/${country.slug}`}
                className="group card overflow-hidden hover:border-[#D4A843]/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={country.heroImage}
                    alt={country.heroCity}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/20 to-transparent" />
                  {/* Flag overlay */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <p className="text-[#F0EBE0]/90 font-semibold text-base leading-tight">
                        {country.name}
                      </p>
                      <p className="text-[#F0EBE0]/45 text-xs font-light">
                        {country.heroCity}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="text-[#F0EBE0]/45 text-sm font-light leading-relaxed mb-4 line-clamp-2">
                    {country.tagline}
                  </p>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-full px-3 py-1.5">
                      <TrendingUp size={10} className="text-emerald-400" />
                      <span className="text-xs text-[#F0EBE0]/55 font-light">
                        %{country.visa.approvalRate} onay
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-full px-3 py-1.5">
                      <Clock size={10} className="text-[#D4A843]/70" />
                      <span className="text-xs text-[#F0EBE0]/55 font-light">
                        {country.visa.processingTime}
                      </span>
                    </div>
                    <span
                      className={`flex items-center gap-1 text-xs rounded-full px-3 py-1.5 border font-medium ${diff.text} ${diff.bg}`}
                    >
                      <Shield size={9} />
                      {country.visa.difficulty}
                    </span>
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#F0EBE0]/30 font-light">
                      {country.visa.operator}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#D4A843]/70 group-hover:text-[#D4A843] transition-colors font-medium">
                      Rehberi Gör <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Back to guide link */}
        <div className="mt-12 text-center">
          <Link
            href="/#guide"
            className="inline-flex items-center gap-2 text-sm text-[#F0EBE0]/35 hover:text-[#F0EBE0]/65 font-light border border-white/8 hover:border-white/15 rounded-full px-6 py-2.5 transition-all"
          >
            ← Tüm Schengen Ülkeleri
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
