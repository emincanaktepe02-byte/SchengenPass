import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                <span className="text-[10px] font-medium text-white">S</span>
              </div>
              <span className="font-light text-white text-base">
                Schengen<span className="font-medium">Pass</span>
              </span>
            </div>
            <p className="text-white/30 text-sm font-light leading-relaxed max-w-xs">
              Türkiye'den Schengen vize başvurusu yapacaklar için ücretsiz, topluluk temelli
              bir rehber. Scraping yok, bot yok, ücret yok.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2 mt-6">
              <a href="mailto:info@schengenpass.com" className="flex items-center gap-2 text-white/25 text-xs hover:text-white/50 transition-colors">
                <Mail size={12} />
                info@schengenpass.com
              </a>
            </div>

            {/* Inspiration sources */}
            <div className="mt-6">
              <p className="text-white/20 text-[11px] font-light mb-2 uppercase tracking-wider">İlham Aldığımız Kaynaklar</p>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "@gokdenizgok", href: "https://www.instagram.com/gokdenizgok" },
                  { label: "@ucuzarota", href: "https://www.instagram.com/ucuzarota" },
                  { label: "@ucuza.ucak", href: "https://www.instagram.com/ucuza.ucak" },
                  { label: "ucuzaucak.net", href: "https://ucuzaucak.net" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/25 text-xs hover:text-white/50 transition-colors"
                  >
                    <ExternalLink size={11} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs text-white/50 font-medium uppercase tracking-wider mb-4">Site</h4>
            <ul className="space-y-2.5">
              {[
                { href: "#appointments", label: "Randevu Paylaşımları" },
                { href: "#flights", label: "Uygun Uçuşlar" },
                { href: "#guide", label: "Ülke Rehberi" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/25 text-xs font-light hover:text-white/50 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs text-white/50 font-medium uppercase tracking-wider mb-4">Yasal</h4>
            <ul className="space-y-2.5">
              {["Gizlilik Politikası", "Kullanım Koşulları", "KVKK"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/25 text-xs font-light hover:text-white/50 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-xs text-white/50 font-medium uppercase tracking-wider mt-8 mb-4">Ülkeler</h4>
            <ul className="space-y-2.5">
              {["Fransa", "Hollanda", "Norveç", "İsviçre", "İsveç"].map((c) => (
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
            © 2025 SchengenPass. Tüm hakları saklıdır.
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
