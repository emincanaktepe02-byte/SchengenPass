import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-sm bg-[#D4A843] flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#111111]">SP</span>
              </div>
              <span className="font-light text-[#F0EBE0] text-base tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                schengenim<span className="font-semibold" style={{ color: "#D4A843" }}>.com</span>
              </span>
            </div>
            <p className="text-[#F0EBE0]/22 text-[13px] font-light leading-relaxed max-w-xs">
              Türkiye&apos;den Schengen vize başvurusu yapacaklar için topluluk temelli
              bir rehber. Scraping yok, bot yok, doğrulanmış bilgi.
            </p>
            <div className="flex flex-col gap-2 mt-6">
              <a href="mailto:info@schengenim.com"
                className="flex items-center gap-2 text-[#F0EBE0]/20 text-xs hover:text-[#D4A843] transition-colors">
                <Mail size={12} />
                info@schengenim.com
              </a>
            </div>
          </div>

          {/* Site links */}
          <div>
            <h4 className="text-[10px] text-[#F0EBE0]/28 font-medium uppercase tracking-wider mb-5">Site</h4>
            <ul className="space-y-2.5">
              {[
                { href: "#appointments", label: "Randevu Paylaşımları" },
                { href: "#flights",      label: "Uçuş Fırsatları"      },
                { href: "#guide",        label: "Ülke Rehberi"          },
                { href: "#blog",         label: "Blog"                   },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href}
                    className="text-[#F0EBE0]/20 text-xs font-light hover:text-[#D4A843] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] text-[#F0EBE0]/28 font-medium uppercase tracking-wider mb-5">Yasal</h4>
            <ul className="space-y-2.5">
              {["Gizlilik Politikası", "Kullanım Koşulları", "KVKK"].map(l => (
                <li key={l}>
                  <a href="#" className="text-[#F0EBE0]/20 text-xs font-light hover:text-[#D4A843]/60 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-[10px] text-[#F0EBE0]/28 font-medium uppercase tracking-wider mt-8 mb-5">Popüler</h4>
            <ul className="space-y-2.5">
              {["Yunanistan", "Malta", "Estonya", "Macaristan", "Almanya"].map(c => (
                <li key={c}>
                  <a href="#guide" className="text-[#F0EBE0]/20 text-xs font-light hover:text-[#D4A843]/60 transition-colors">
                    {c} Vizesi
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gold divider */}
        <div className="gold-line mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#F0EBE0]/12 font-light">
            © 2026 schengenim.com. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-[#F0EBE0]/10 font-light text-center md:text-right max-w-sm">
            schengenim.com, VFS Global veya herhangi bir konsolosluğun resmi temsilcisi değildir.
            Sunulan bilgiler bilgilendirme amaçlıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
