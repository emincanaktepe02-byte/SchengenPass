"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "Schengen vizesi ne kadar sürede çıkar?",
    a: "Schengen vizesi standart süre 15 iş günüdür (yaklaşık 3 hafta). Yunanistan ve Malta gibi ülkelerde Kosmos veya VFS üzerinden 3-7 iş gününde sonuçlanabilir. Almanya (iDATA) ve Belçika (VFS) süreçleri daha uzun sürebilir. Acele vize servisi yoktur; randevu alır almaz başvurmak en doğru yoldur. Yoğun sezonda (Nisan–Eylül) bekleme süreleri uzayabilir.",
  },
  {
    q: "Hesabımda ne kadar para olmalı? Minimum bakiye nedir?",
    a: "Konsoloslukların genel beklentisi: (Kalınacak gün × 50-100€) + konaklama tutarı + uçuş bedeli. Örnek: 10 günlük İtalya turu için ≈ 800€ günlük harcama + 500€ otel + 400€ bilet = ~1.700€ (yaklaşık 60.000-70.000 TL) bankada görünmeli. Almanya için standart daha yüksek (günlük 45-50€ × gün). En kritik nokta: başvurudan kısa süre önce büyük nakit yatırmayın; bu doğrudan ret sebebidir.",
  },
  {
    q: "Schengen vizesi reddedilirse ne olur? Tekrar başvurabilir miyim?",
    a: "Ret kararı, pasaportunuza yapıştırılan bir etiketle bildirilir ve ret gerekçesi yazılı olarak sunulur. Hemen tekrar başvurabilirsiniz — bekleme süresi yoktur. Ancak ret gerekçesini dikkate alarak eksik belgeleri tamamlamanız gerekir. Tekrar ret, ilerleyen başvurularda dezavantaj oluşturabilir. Fransa, Almanya ve Belçika redleri için itiraz hakkı mevcuttur ancak itiraz süreçleri uzundur.",
  },
  {
    q: "90/180 günlük kural nedir?",
    a: "Schengen kuralına göre herhangi bir 180 günlük zaman diliminde toplamda en fazla 90 gün Schengen bölgesinde kalabilirsiniz. Avrupa'dan çıkış günü ve giriş günü de bu 90 güne dahildir. İhlali — tek bir ihlal bile — sizi kara listeye alabilir ve CASCADE kademelemenizi sıfırlayabilir. Avrupa'ya her girişte schengen.info hesap makinesiyle günlerinizi hesaplayın.",
  },
  {
    q: "Hangi ülkeye başvurmalıyım? Doğru konsolosluğu nasıl seçerim?",
    a: "Birden fazla Schengen ülkesi planlanıyorsa EN UZUN konaklama yapacağınız ülkenin konsolosluğuna başvurun. Süre eşitse ilk giriş yaptığınız ülke belirleyicidir. Eğer sadece bir ülkeye gidiyorsanız o ülkeye başvurun. İlk Schengen başvurusu için randevu kolaylığı ve hızlı işlem açısından Yunanistan (Kosmos), Malta (VFS), Estonya (VFS) veya Slovakya (BLS) önerilir.",
  },
  {
    q: "CASCADE (kademeleme) kuralı nedir? Nasıl çalışır?",
    a: "CASCADE kuralı, AB Vize Kodu Madde 24/2 kapsamında vizelerini kurallara uygun kullanan başvuru sahiplerine bir sonraki başvuruda daha uzun süreli vize verilmesini zorunlu kılar. Adımlar: İlk vize → seyahat süresi kadar kısa; 2. başvuru → 1 yıl çok girişli; 3. başvuru → 2 yıl çok girişli; 4. başvuru → 5 yıl çok girişli. Tek bir ihlal (aşım, erken dönüş yokluğu) CASCADE&apos;i sıfırlar. Almanya iDATA ve Fransa VFS bu kuralı en tutarlı uygulayan merkezler arasındadır.",
  },
  {
    q: "Çift girişli (double entry) vize nedir? Çok girişli vizeden farkı ne?",
    a: "Tek girişli vize: Schengen'e bir kez girip çıkınca biter. Çift girişli: İki ayrı giriş hakkı verir (örn. İtalya → Türkiye → tekrar Schengen). Çok girişli (multiple entry): Vize geçerlilik süresi boyunca istediğiniz kadar giriş çıkış yapabilirsiniz (90/180 kuralına uygun). Çok girişli vize almak için birinci vizenizi kurallara uygun kullanmış olmanız ve ikinci başvuruda bunu kanıtlamanız gerekir (CASCADE kuralı).",
  },
  {
    q: "Biometrik veri nedir? Merkeze gitmeden başvurabilir miyim?",
    a: "Schengen vize başvurusunda biyometrik parmak izi ve dijital fotoğraf vermeniz zorunludur. Bu işlem yalnızca yetkili vize merkezinde (VFS, iDATA, Kosmos vb.) fiziksel olarak yapılabilir. İlk kez başvuranlar kesinlikle merkeze gelmek zorundadır. Biyometrik veriler 59 ay (yaklaşık 5 yıl) sistemde saklanır; bu süre içindeki sonraki başvurularda fiziksel katılım gerekli olmayabilir. Postane veya posta yoluyla başvuru kabul edilmez.",
  },
  {
    q: "Schengen vizesi için hangi sigorta zorunlu?",
    a: "Tüm Schengen ülkelerinde geçerli, minimum 30.000€ teminatlı seyahat sağlık sigortası zorunludur. Poliçe; tüm Schengen bölgesini kapsamalı, hastane, acil tıbbi tahliye ve cenaze masraflarını içermeli ve seyahat süresini eksiksiz kapsamalıdır. Yabancı sigorta poliçeleri genellikle kabul edilir ancak İngilizce veya seyahat edilen ülkenin dilinde olması tercih edilir. Türkiye'den Mapfre, Axa ve Allianz güvenilir seçenekler sunar.",
  },
  {
    q: "Türkiye'de bağ belgesi nedir? Neden önemli?",
    a: "Konsolosluklar, başvuru sahibinin seyahat sonunda Türkiye'ye döneceğinden emin olmak ister. Bağ belgesi bu güvenceyi sağlayan evraklardır: iş sözleşmesi veya işveren yazısı, tapu veya kira sözleşmesi, SGK belgesi, araç ruhsatı, öğrenci belgesi. Ne kadar güçlü bir Türkiye bağınız olursa ret riski o kadar düşer. Bu belgelerin yokluğu özellikle Almanya ve Fransa'da ret gerekçesi olarak gösterilmektedir.",
  },
  {
    q: "Vize ücreti ne kadar? Ücret iadesi olur mu?",
    a: "2026 itibarıyla standart Schengen vize ücreti 90€'dur (çocuklar için 45€, 6 yaş altı ücretsiz). Buna ek olarak vize merkezi hizmet bedeli 25–35€ arasındadır. Toplam kişi başı yaklaşık 115–130€. Vize reddedilse dahi vize ücreti iade edilmez; hizmet bedeli ise bazı merkezlerde kısmen iade edilebilir. Başvuru formu doldurulduktan sonra geri çekilse bile ücret iade edilmez.",
  },
  {
    q: "Hangi ülkeler en yüksek onay oranına sahip?",
    a: "2023 AB Schengen İstatistiklerine göre Türk başvuru sahipleri için en yüksek onay oranına sahip ülkeler: Estonya (~%92), Letonya (~%91), Malta (~%89), Macaristan (~%88), Slovakya (~%87), Yunanistan (~%85-88). En yüksek red oranları ise Belçika (~%26), Fransa (~%24) ve Almanya'dadır (~%20). Red oranı yüksek olan ülkeler, CASCADE kuralını daha tutarlı uygulayan ülkelerdir — doğru belgelerle başvurulduğunda red riski düşer.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24" style={{ background: "linear-gradient(to bottom, #040d1a, #020918)" }}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs text-white/40 font-light tracking-wider uppercase">
              Sık Sorulan Sorular
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-light text-white tracking-tight mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            İnternette En Çok
            <br />
            <span className="italic gradient-text">Sorulan Sorular</span>
          </h2>
          <p className="text-white/35 font-light text-sm leading-relaxed max-w-xl mx-auto">
            Schengen vizesi başvurusunda merak edilen her şey — sade, açık ve güncel cevaplarla.
          </p>
        </motion.div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.04, 0.3) }}
              className="glass rounded-2xl overflow-hidden hover:border-white/12 transition-all"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between p-5 text-left hover:bg-white/[0.03] transition-colors gap-4"
              >
                <span className="text-sm text-white/75 font-light leading-relaxed pr-2">{faq.q}</span>
                <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full glass flex items-center justify-center">
                  {open === i ? (
                    <Minus size={11} className="text-[#00d4ff]" />
                  ) : (
                    <Plus size={11} className="text-white/40" />
                  )}
                </span>
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
                      <p className="text-sm text-white/50 font-light leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-xs text-white/20 font-light"
        >
          Cevaplar genel bilgi amaçlıdır · Başvurudan önce ilgili konsolosluğun resmi sitesini kontrol edin
        </motion.p>
      </div>
    </section>
  );
}
