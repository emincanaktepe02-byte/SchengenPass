"use client";
import { motion } from "framer-motion";
import { Send, Bell, Shield, Clock } from "lucide-react";

const FEATURES = [
  { icon: Bell, text: "Randevu bulunduğu saniyede bildirim" },
  { icon: Clock, text: "7/24 kesintisiz izleme" },
  { icon: Shield, text: "Güvenli ve resmi Telegram kanalı" },
];

export default function TelegramCTA() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#202020] border border-white/10 rounded-[10px] p-10 md:p-14 text-center relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none" />

          {/* Telegram icon */}
          <div className="w-14 h-14 rounded-full bg-[#2AABEE]/10 border border-[#2AABEE]/20 flex items-center justify-center mx-auto mb-6">
            <Send size={22} className="text-[#2AABEE]" />
          </div>

          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs text-white/40 font-light tracking-wider uppercase">Telegram Bildirimleri</span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-light text-white tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Anı Kaçırma, <span className="italic">Anında Uyan</span>
          </h2>

          <p className="text-white/40 font-light text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Paket satın alanlar Telegram bot'umuza katılır. Randevu açıldığı saniyede telefonunuz titrer.
            Bildirim geç gelmez — çünkü sistem hiç uyumaz.
          </p>

          {/* Features */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-white/40">
                <f.icon size={14} className="text-white/30" />
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://t.me/schengenpassbot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#2AABEE] text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-[#229ED9] transition-colors"
            >
              <Send size={14} />
              Telegram Bot'una Katıl
            </a>
            <a href="#pricing">
              <button className="inline-flex items-center justify-center gap-2 border border-white/20 text-white rounded-full px-6 py-2.5 text-sm font-light hover:border-white/40 transition-colors">
                Önce Fiyatları Gör
              </button>
            </a>
          </div>

          <p className="text-xs text-white/20 font-light mt-6">
            Bot aktivasyonu paket aktivasyonu sonrası otomatik gönderilir.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
