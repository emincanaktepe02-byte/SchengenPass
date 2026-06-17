"use client";
import { motion } from "framer-motion";
import { CheckCircle, Lock, Send, Zap, Users } from "lucide-react";

const PLAN1_FEATURES = [
  "20 Schengen ülkesi sinyali",
  "Tüm VFS Türkiye merkezleri",
  "Telegram anlık bildirim",
  "Vize rehberi & ipuçları",
  "Uçuş & konaklama linkleri",
  "Sinyaller paneline tam erişim",
];

const PLAN2_FEATURES = [
  "Temel Plan'daki her şey",
  "Birebir vize danışmanlığı",
  "Belge kontrolü ve hazırlık",
  "Başvuru takip hizmeti",
  "Öncelikli destek hattı",
  "Kontenjan dolduğunda çağrı listesi",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <Zap size={12} className="text-white/50" />
            <span className="text-xs text-white/40 font-light tracking-wider uppercase">Fiyatlandırma</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Sade ve Şeffaf Fiyatlar
          </h2>
          <p className="text-white/40 font-light text-sm max-w-md mx-auto">
            7 gün ücretsiz dene. Sonrası 18 Euro/ay. Aracı firmalara vereceğinizin %1'i bile değil.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Plan 1 - Basic */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative bg-[#202020] border border-white/20 rounded-[10px] overflow-hidden"
          >
            {/* Most popular badge */}
            <div className="absolute top-4 right-4">
              <span className="text-[10px] bg-white text-black rounded-full px-2.5 py-1 font-medium">
                En Çok Tercih Edilen
              </span>
            </div>

            <div className="p-8 border-b border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={14} className="text-white/50" />
                <h3 className="text-sm font-medium text-white uppercase tracking-wider">Temel Plan</h3>
              </div>
              <p className="text-white/30 text-xs font-light mb-6">
                Vize randevusunu kendin takip edenler için
              </p>

              {/* Price */}
              <div className="mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-light text-white">18€</span>
                  <span className="text-white/30 text-sm">/ay</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-white/20 line-through">25,70€</span>
                  <span className="text-xs bg-white/10 text-white/60 rounded-full px-2 py-0.5">%30 İndirim</span>
                </div>
              </div>

              <p className="text-xs text-white/30 font-light mt-3 mb-0">
                İlk 7 gün tamamen ücretsiz. Kart bilgisi gerekli.
              </p>
            </div>

            <div className="p-8 space-y-3">
              {PLAN1_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-white/60 font-light">
                  <CheckCircle size={14} className="text-white/40 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-white/5">
              <button className="w-full bg-white text-black rounded-full py-3 text-sm font-medium hover:bg-[#f5f5f0] transition-colors">
                7 Gün Ücretsiz Başla →
              </button>
              <p className="text-center text-[10px] text-white/20 mt-3">
                Dilediğin zaman iptal et. Gizli ücret yok.
              </p>
            </div>
          </motion.div>

          {/* Plan 2 - Premium / Sold Out */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative bg-[#161616] border border-white/5 rounded-[10px] overflow-hidden opacity-70"
          >
            {/* Sold out badge */}
            <div className="absolute top-4 right-4">
              <span className="text-[10px] bg-white/10 text-white/40 border border-white/10 rounded-full px-2.5 py-1 font-light flex items-center gap-1">
                <Lock size={8} />
                Kontenjan Dolu
              </span>
            </div>

            <div className="p-8 border-b border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <Users size={14} className="text-white/30" />
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Danışmanlık Paketi</h3>
              </div>
              <p className="text-white/20 text-xs font-light mb-6">
                Birebir vize uzmanı desteği dahil
              </p>

              {/* Price */}
              <div className="mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-light text-white/40">165€</span>
                  <span className="text-white/20 text-sm">/ tek seferlik</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-white/15 line-through">201,20€</span>
                  <span className="text-xs bg-white/5 text-white/30 rounded-full px-2 py-0.5">%18 İndirim</span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400/50" />
                <p className="text-xs text-orange-400/50 font-light">
                  Şu an kontenjan dolu — bekleme listesine girebilirsiniz
                </p>
              </div>
            </div>

            <div className="p-8 space-y-3">
              {PLAN2_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-white/30 font-light">
                  <CheckCircle size={14} className="text-white/20 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-white/5">
              <button
                disabled
                className="w-full border border-white/10 text-white/30 rounded-full py-3 text-sm font-light cursor-not-allowed"
              >
                Kontenjan Dolu
              </button>
              <button className="w-full text-center text-[10px] text-white/25 mt-3 hover:text-white/40 transition-colors">
                Bekleme listesine gir →
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom trust text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center space-y-2"
        >
          <p className="text-xs text-white/25 font-light">
            Ödemeler Stripe altyapısı ile güvence altındadır. Kart bilgileri SchengenPass sunucularında saklanmaz.
          </p>
          <p className="text-xs text-white/20 font-light">
            Aboneliğinizi istediğiniz zaman üye panelinden iptal edebilirsiniz.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
