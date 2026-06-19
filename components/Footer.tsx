import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(to bottom, #030b14, #020918)" }} className="border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#7b2ff7] flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">SP</span>
              </div>
              <span className="font-light text-white text-base tracking-tight">
                Schengen<span className="font-semibold gradient-text-cyan-violet">Pass</span>
              </span>
            </div>
            <p className="text-white/30 text-sm font-light leading-relaxed max-w-xs">
              Türkiye&apos;den Schengen vize başvurusu yapacaklar için topluluk temelli
              bir rehber. Scraping yok, bot yok, doğrulanmış bilgi.
            </p>
            <div className="flex flex-col gap-2 mt-6">
              <a
                href="mailto:info@schengenpass.com"
                className="flex items-center gap-2 text-white/25 text-xs hover:text-[#00d4ff] transition-colors"
              >
                <Mail size={12} />
                info@schengenpass.com
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs text-white/40 font-medium uppercase tracking-wider mb-4">Site</h4>
            <ul className="space-y-2.5">
              {[
                { href: "#appointments", label: "Randevu Paylaşımları" },
                { href: "#flights", label: "Uçuş Fırsatları" },
                { href: "#guide", label: "Ülke Rehberi" },
                { href: "#blog", label: "Blog" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/25 text-xs font-light hover:text-white/60 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs text-white/40 font-medium uppercase tracking-wider mb-4">Yasal</h4>
            <ul className="space-y-2.5">
              {["Gizlilik Politikası", "Kullanım Koşulları", "KVKK"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/25 text-xs font-light hover:text-white/50 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-xs text-white/40 font-medium uppercase tracking-wider mt-8 mb-4">Ülkeler</h4>
            <ul className="space-y-2.5">
              {["Yunanistan", "Malta", "Estonya", "Macaristan", "Almanya"].map((c) => (
                <li key={c}>
                  <a href="#guide" className="text-white/25 text-xs font-light hover:text-white/50 transition-colors">
                    {c} Vizesi
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/15 font-light">
            © 2026 SchengenPass. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-white/10 font-light text-center md:text-right max-w-sm">
            SchengenPass, VFS Global veya herhangi bir konsolosluğun resmi temsilcisi değildir.
            Sunulan bilgiler bilgilendirme amaçlıdır; resmi kaynaklardan doğrulayın.
          </p>
        </div>
      </div>
    </footer>
  );
}
