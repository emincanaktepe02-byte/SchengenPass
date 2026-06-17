import Link from "next/link";
import { MapPin, Send, Mail } from "lucide-react";

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
              Türkiye'den Schengen vize randevusu takibi için geliştirilmiş otomatik izleme platformu.
              Şeffaf, erişilebilir, suiistimalsiz.
            </p>

            {/* Address */}
            <div className="flex items-start gap-2 mt-6">
              <MapPin size={14} className="text-white/20 mt-0.5 shrink-0" />
              <div>
                <p className="text-white/25 text-xs font-light leading-relaxed">
                  Folkart Towers, A Blok<br />
                  Altınyol Mah. 1518 Sk. No:3<br />
                  Bayraklı, İzmir, Türkiye
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-2 mt-4">
              <a href="mailto:info@schengenpass.com" className="flex items-center gap-2 text-white/25 text-xs hover:text-white/50 transition-colors">
                <Mail size={12} />
                info@schengenpass.com
              </a>
              <a
                href="https://t.me/schengenpassbot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/25 text-xs hover:text-white/50 transition-colors"
              >
                <Send size={12} />
                @SchengenPassBot
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs text-white/50 font-medium uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { href: "#signals", label: "Canlı Sinyaller" },
                { href: "#how", label: "Nasıl Çalışır" },
                { href: "#guide", label: "Vize Rehberi" },
                { href: "#pricing", label: "Fiyatlar" },
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
              {[
                "Gizlilik Politikası",
                "Kullanım Koşulları",
                "Çerez Politikası",
                "KVKK",
              ].map((l) => (
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
                  <a href="#signals" className="text-white/25 text-xs font-light hover:text-white/50 transition-colors">
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
            Sunulan bilgiler bilgilendirme amaçlıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
