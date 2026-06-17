"use client";
import { motion } from "framer-motion";
import { UserCheck, Bell, Globe } from "lucide-react";

const STEPS = [
  {
    icon: UserCheck,
    number: "01",
    title: "Üye Ol, Kartını Ekle",
    desc: "30 saniyede kayıt ol. Kartını güvenli şekilde kaydet. 7 gün boyunca hiçbir ücret alınmaz — istersen iptal et.",
    detail: "Stripe altyapısı ile kart bilgileriniz şifreli saklanır. Deneme süresinde sizi aramaz, mesaj atmayız.",
  },
  {
    icon: Bell,
    number: "02",
    title: "Sistem Otomatik Tarar",
    desc: "Yapay zeka destekli motorumuz VFS Global'deki tüm merkezleri 3 dakikada bir kontrol eder.",
    detail: "20 Schengen ülkesi × İstanbul + Ankara + İzmir merkezleri × tüm vize kategorileri.",
  },
  {
    icon: Globe,
    number: "03",
    title: "Anında Bildirim Al, Hemen Başvur",
    desc: "Boş randevu bulunduğu saniyede Telegram bot'unuz size ping atar. Randevuyu kendiniz alırsınız — aracı yok.",
    detail: "Randevu alımını SchengenPass üstlenmez; biz sadece fırsatı ilk size gösteririz.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs text-white/40 font-light tracking-wider uppercase">Nasıl Çalışır</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Üç Adımda Randevunuz
          </h2>
          <p className="text-white/40 font-light text-sm mt-4 max-w-md mx-auto">
            Karmaşık araçlar yok, aracı firmalar yok. Sadece teknoloji ve şeffaflık.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-[#202020] border border-white/5 rounded-[10px] p-8 hover:border-white/10 transition-colors group"
            >
              {/* Number */}
              <div className="absolute top-6 right-6 text-5xl font-light text-white/5 group-hover:text-white/10 transition-colors select-none">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-6">
                <step.icon size={18} className="text-white/50" />
              </div>

              <h3 className="text-base font-medium text-white mb-3">{step.title}</h3>
              <p className="text-sm text-white/50 font-light leading-relaxed mb-4">{step.desc}</p>
              <p className="text-xs text-white/25 font-light leading-relaxed border-t border-white/5 pt-4">
                {step.detail}
              </p>

              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-white/10 z-10" />
              )}
            </motion.div>
          ))}
        </div>

        {/* VFS mention */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-xs text-white/20 font-light">
            SchengenPass, VFS Global ile ilişkili değildir. Sistemimiz kamuya açık bilgileri otomatik izler.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
