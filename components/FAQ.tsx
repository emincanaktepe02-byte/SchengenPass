"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "SchengenPass bir vize danışmanlık firması mıdır?",
    a: "Hayır. SchengenPass, VFS Global randevularını otomatik izleyen bir teknoloji platformudur. Randevu almak ya da vize başvurunuzu yönetmek için hizmet sunmayız; yalnızca boş randevu fırsatlarını size ilk gösteren teknolojiyi geliştirip işletiriz.",
  },
  {
    q: "Sisteminiz VFS Global'e yasal yollarla mı erişiyor?",
    a: "Evet. Sistemimiz yalnızca VFS Global'in kamuya açık sayfalarını izler. Hiçbir sisteme yetkisiz erişim yapılmaz. Bu, haber sitelerini takip etmekten farklı değildir — sadece sizin yerinize yapar.",
  },
  {
    q: "Deneme süresi bittikten sonra ne olur?",
    a: "Kayıt sırasında kaydettiğiniz karttan 7. gün sonunda 18 Euro tahsil edilir ve aboneliğiniz başlar. İptal ederseniz bir daha ücret alınmaz. Deneme süresinde istediğiniz zaman üye panelinizden iptal edebilirsiniz.",
  },
  {
    q: "Hangi VFS merkezleri takip ediliyor?",
    a: "İstanbul (Şişli ve Kadıköy), Ankara ve İzmir'deki VFS Global Türkiye merkezlerinin tamamı, her 3 dakikada bir 20 Schengen ülkesi için ayrı ayrı kontrol edilmektedir.",
  },
  {
    q: "Telegram bildirimi nasıl çalışıyor?",
    a: "Paket aktivasyonu sonrasında size özel bir bot aktivasyon linki gönderilir. Linke tıklayarak SchengenPass Telegram botunu başlatırsınız. Randevu bulunduğunda bot, ülke ve merkez bilgisiyle birlikte size anlık mesaj gönderir.",
  },
  {
    q: "Randevuyu SchengenPass mi alıyor?",
    a: "Hayır. Randevuyu siz alırsınız, doğrudan VFS Global web sitesinden. SchengenPass size yalnızca fırsatı gösterir; randevu sürecine müdahil olmaz.",
  },
  {
    q: "Danışmanlık paketine (165€) ne zaman başvurabilirim?",
    a: "Danışmanlık paketi şu an kontenjanı dolu olduğundan satışa kapalıdır. Bekleme listesine girerek kontenjan açıldığında öncelikli bildirim alabilirsiniz.",
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
