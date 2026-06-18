"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "SchengenPass nedir?",
    a: "SchengenPass, Türkiye'den Schengen ülkelerine vize başvurusu yapacaklar için ücretsiz, topluluk temelli bir rehber platformudur. Boş randevu paylaşımları, uygun uçuş fırsatları ve ülke başvuru rehberlerini bir arada bulabilirsiniz.",
  },
  {
    q: "Bu site gerçekten ücretsiz mi?",
    a: "Evet, tamamen ücretsiz. Abonelik, premium plan veya gizli ücret yoktur. İçerik topluluk katkıları ve küratörler tarafından hazırlanır; amacımız bilgiyi herkesin erişebileceği hale getirmektir.",
  },
  {
    q: "Scraping veya bot kullanıyor musunuz?",
    a: "Hayır. Siteye girilen tüm içerik — randevu paylaşımları, uçuş fırsatları, ülke rehberleri — elle hazırlanır ve küratörlerimiz tarafından eklenir. Hiçbir web sitesinden otomatik veri çekilmez.",
  },
  {
    q: "Bilgiler güncel ve doğru mu?",
    a: "Vize kuralları sık değişebildiğinden tüm içeriğimize 'resmi konsolosluk veya VFS kaynağından doğrulayın' uyarısı ekliyoruz. Emin olmadığımız bilgileri 'doğrulanmalı' olarak işaretliyoruz; asla tahmin yürütmüyoruz.",
  },
  {
    q: "İçeriği kim hazırlıyor?",
    a: "İçerik, küratörler tarafından elle hazırlanır. Randevu paylaşımları topluluk tarafından katkılanır ve moderasyon sonrasında yayınlanır. İlham aldığımız kaynakları 'Kaynaklar' bölümünde açıkça belirtiyoruz.",
  },
  {
    q: "Paralı vize danışmanlık firmalarına karşı neden uyarıyorsunuz?",
    a: "Schengen vize başvurusu tamamen yasal ve kamuya açık bir süreçtir. Bazı firmalar bu bilgiyi avantajlarına kullanarak yüksek ücretler talep edebilir. Amacımız karalama değil; doğru bilgiyle bilinçli kararlar almanıza yardımcı olmak.",
  },
  {
    q: "Siteye nasıl katkıda bulunabilirim?",
    a: "Yakaladığınız boş randevuları veya uygun uçuş fırsatlarını 'Randevu Paylaş' bölümünden gönderebilirsiniz. Tüm paylaşımlar moderasyon sonrasında yayınlanır. Kişisel bilgileriniz hiçbir zaman paylaşılmaz.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-black">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs text-white/40 font-light tracking-wider uppercase">Sık Sorulan Sorular</span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-light text-white tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Merak Ettikleriniz
          </h2>
        </motion.div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border border-white/5 rounded-[10px] bg-[#202020] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-sm text-white/70 font-light pr-4">{faq.q}</span>
                {open === i ? (
                  <Minus size={14} className="text-white/30 shrink-0" />
                ) : (
                  <Plus size={14} className="text-white/30 shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-white/5 pt-4">
                      <p className="text-sm text-white/40 font-light leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
