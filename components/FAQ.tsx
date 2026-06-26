"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SceneryBg from "@/components/SceneryBg";

const FAQS = [
  { q: "Schengen vizesi ne kadar sürede çıkar?", a: "Schengen vizesi standart süre 15 iş günüdür (yaklaşık 3 hafta). Yunanistan ve Malta gibi ülkelerde Kosmos veya VFS üzerinden 3-7 iş gününde sonuçlanabilir. Almanya (iDATA) ve Belçika (VFS) süreçleri daha uzun sürebilir. Yoğun sezonda (Nisan–Eylül) bekleme süreleri uzayabilir." },
  { q: "Hesabımda ne kadar para olmalı? Minimum bakiye nedir?", a: "Konsoloslukların genel beklentisi: (Kalınacak gün × 50-100€) + konaklama tutarı + uçuş bedeli. Örnek: 10 günlük İtalya turu için ≈1.700€ (yaklaşık 60.000-70.000 TL) bankada görünmeli. En kritik nokta: başvurudan kısa süre önce büyük nakit yatırmayın; bu doğrudan ret sebebidir." },
  { q: "Schengen vizesi reddedilirse ne olur? Tekrar başvurabilir miyim?", a: "Ret kararı, pasaportunuza yapıştırılan bir etiketle bildirilir ve ret gerekçesi yazılı olarak sunulur. Hemen tekrar başvurabilirsiniz — bekleme süresi yoktur. Ancak ret gerekçesini dikkate alarak eksik belgeleri tamamlamanız gerekir. Tekrar ret, ilerleyen başvurularda dezavantaj oluşturabilir." },
  { q: "90/180 günlük kural nedir?", a: "Herhangi bir 180 günlük zaman diliminde toplamda en fazla 90 gün Schengen bölgesinde kalabilirsiniz. Avrupa'dan çıkış günü ve giriş günü de bu 90 güne dahildir. Tek bir ihlal bile sizi kara listeye alabilir ve CASCADE kademelemenizi sıfırlayabilir. Her girişte schengen.info hesap makinesiyle günlerinizi hesaplayın." },
  { q: "Hangi ülkeye başvurmalıyım? Doğru konsolosluğu nasıl seçerim?", a: "Birden fazla Schengen ülkesi planlanıyorsa EN UZUN konaklama yapacağınız ülkenin konsolosluğuna başvurun. Süre eşitse ilk giriş yaptığınız ülke belirleyicidir. İlk Schengen başvurusu için Yunanistan (Kosmos), Malta (VFS), Estonya (VFS) veya Slovakya (BLS) önerilir." },
  { q: "CASCADE (kademeleme) kuralı nedir? Nasıl çalışır?", a: "CASCADE kuralı, AB Vize Kodu Madde 24/2 kapsamında vizelerini kurallara uygun kullanan başvuru sahiplerine bir sonraki başvuruda daha uzun süreli vize verilmesini zorunlu kılar. İlk vize → kısa süreli; 2. başvuru → 1 yıl çok girişli; 3. başvuru → 2 yıl çok girişli; 4. başvuru → 5 yıl çok girişli. Tek bir ihlal CASCADE'i sıfırlar." },
  { q: "Çift girişli vize nedir? Çok girişli vizeden farkı ne?", a: "Tek girişli vize: Schengen'e bir kez girip çıkınca biter. Çift girişli: İki ayrı giriş hakkı verir. Çok girişli (multiple entry): Vize geçerlilik süresi boyunca istediğiniz kadar giriş çıkış yapabilirsiniz (90/180 kuralına uygun). Çok girişli vize için birinci vizenizi kurallara uygun kullanmış olmanız gerekir." },
  { q: "Biometrik veri nedir? Merkeze gitmeden başvurabilir miyim?", a: "Schengen vize başvurusunda biyometrik parmak izi ve dijital fotoğraf vermeniz zorunludur. Bu işlem yalnızca yetkili vize merkezinde fiziksel olarak yapılabilir. İlk kez başvuranlar kesinlikle merkeze gelmek zorundadır. Biyometrik veriler 59 ay sistemde saklanır; bu süre içindeki sonraki başvurularda fiziksel katılım gerekli olmayabilir." },
  { q: "Schengen vizesi için hangi sigorta zorunlu?", a: "Tüm Schengen ülkelerinde geçerli, minimum 30.000€ teminatlı seyahat sağlık sigortası zorunludur. Poliçe; tüm Schengen bölgesini kapsamalı, hastane, acil tıbbi tahliye ve cenaze masraflarını içermeli ve seyahat süresini eksiksiz kapsamalıdır." },
  { q: "Türkiye'de bağ belgesi nedir? Neden önemli?", a: "Konsolosluklar, başvuru sahibinin seyahat sonunda Türkiye'ye döneceğinden emin olmak ister. Bağ belgesi bu güvenceyi sağlayan evraklardır: iş sözleşmesi veya işveren yazısı, tapu veya kira sözleşmesi, SGK belgesi, araç ruhsatı, öğrenci belgesi. Ne kadar güçlü bir Türkiye bağınız olursa ret riski o kadar düşer." },
  { q: "Vize ücreti ne kadar? Ücret iadesi olur mu?", a: "2026 itibarıyla standart Schengen vize ücreti 90€'dur (çocuklar için 45€, 6 yaş altı ücretsiz). Buna ek olarak vize merkezi hizmet bedeli 25–35€ arasındadır. Toplam kişi başı yaklaşık 115–130€. Vize reddedilse dahi vize ücreti iade edilmez." },
  { q: "Hangi ülkeler en yüksek onay oranına sahip?", a: "2023 AB Schengen İstatistiklerine göre en yüksek onay oranları: Estonya (~%92), Letonya (~%91), Malta (~%89), Macaristan (~%88), Slovakya (~%87), Yunanistan (~%86). En yüksek red oranları Belçika (~%26), Fransa (~%24) ve Almanya'dadır (~%20)." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-28" style={{ background: "#0D0D0D" }}>
      <SceneryBg
        images={["/Iskocya.jpg", "/Kopenhag.jpg", "/Koln.jpg"]}
        darkness={90}
        interval={11}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-12">
          <p className="badge mx-auto mb-6">Sık Sorulan Sorular</p>
          <h2 className="serif text-3xl md:text-4xl font-light text-[#F0EBE0] tracking-tight mb-4 leading-tight">
            İnternette En Çok<br />
            <em className="not-italic italic" style={{
              background: "linear-gradient(135deg, #D4A843, #F0CC6A, #C89A35)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
            }}>
              Sorulan Sorular
            </em>
          </h2>
          <p className="text-[#F0EBE0]/35 font-light text-[15px] leading-relaxed max-w-xl mx-auto">
            Schengen vizesi başvurusunda merak edilen her şey — sade, açık ve güncel cevaplarla.
          </p>
        </motion.div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: Math.min(i * 0.04, 0.3) }}
              className={`card overflow-hidden transition-all ${open === i ? "border-[#D4A843]/18" : "hover:border-[#D4A843]/12"}`}
            >
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between p-5 text-left gap-4 hover:bg-white/2 transition-colors">
                <span className="text-[14px] text-[#F0EBE0]/60 font-light leading-relaxed pr-2">{faq.q}</span>
                <span className={`shrink-0 mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                  open === i ? "border-[#D4A843]/30 bg-[#D4A843]/8" : "border-white/10 bg-white/3"
                }`}>
                  {open === i
                    ? <Minus size={11} className="text-[#D4A843]" />
                    : <Plus  size={11} className="text-[#F0EBE0]/30" />
                  }
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                    <div className="px-5 pb-5 border-t border-white/5 pt-4">
                      <p className="text-[14px] text-[#F0EBE0]/50 font-light leading-[1.8]">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-8 text-center text-xs text-[#F0EBE0]/18 font-light">
          Cevaplar genel bilgi amaçlıdır · Başvurudan önce ilgili konsolosluğun resmi sitesini kontrol edin
        </motion.p>
      </div>
    </section>
  );
}
