"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, BookOpen } from "lucide-react";

const ARTICLES = [
  {
    id: "schengen-vizesi-nasil-alinir",
    category: "Vize Rehberi",
    categoryColor: "text-[#0077B6] bg-[#0077B6]/8 border-[#0077B6]/18",
    title: "Schengen Vizesi Nasıl Alınır? 2026 Eksiksiz Rehber",
    excerpt: "Türkiye'den Schengen bölgesine seyahat etmek için vize başvurusu nasıl yapılır, hangi belgeler gerekir, süreç ne kadar sürer? Adım adım, güncel bilgilerle.",
    readTime: "7 dk",
    featured: true,
    content: `
Schengen Vizesi, Avrupa'nın 29 ülkesini kapsayan Schengen bölgesine giriş için Türkiye Cumhuriyeti vatandaşlarının alması gereken kısa süreli vizedir. Turistik, iş, aile ziyareti veya transit amaçlı seyahatlerde zorunludur.

**Schengen Vizesi Nedir?**

Schengen Anlaşması'na taraf 29 ülke (27 AB üyesi + Norveç, İzlanda, İsviçre, Liechtenstein) için tek bir vize yeterlidir. Alınan vize ile bu ülkelerin tamamında 180 günlük dönem içinde en fazla 90 gün kalınabilir.

**Hangi Konsolosluğa Başvurulur?**

Birden fazla Schengen ülkesi planlanıyorsa, en uzun konaklama yapılacak ülkenin konsolosluğuna (veya yetkili vize merkezine) başvurulur. Tüm günler eşitse, ilk giriş yapılacak ülke seçilir.

**Gerekli Belgeler:**

• Geçerli pasaport — seyahat sonrasında en az 3 ay geçerli, son 10 yılda alınmış
• 2 adet biyometrik fotoğraf — son 6 ay içinde çekilmiş, beyaz arka planlı
• Eksiksiz doldurulmuş vize başvuru formu
• Seyahat sigortası — minimum 30.000€ teminat, tüm Schengen ülkelerini kapsayan
• Uçuş rezervasyonu — kesinleştirilmiş veya geçici rezervasyon belgesi
• Konaklama belgesi — otel rezervasyonu, Airbnb veya davet mektubu
• Banka hesap özeti — son 3-6 aya ait, düzenli gelir ve yeterli bakiye gösteren
• Gelir belgesi — iş sözleşmesi, maaş bordrosu veya vergi kaydı
• Türkiye'de ikamet belgesi — tapu, kira sözleşmesi veya ikametgah belgesi

**Başvuru Süreci Adım Adım:**

1. Seyahat planını netleştir: Hangi ülke, hangi tarihler, kaç gece?
2. Doğru vize merkezini seç: VFS Global, iDATA, Kosmos Vize, BLS International veya AS Visa Solutions
3. Online randevu al — yoğun ülkeler için 2-3 ay öncesinden
4. Belgeleri eksiksiz hazırla
5. Randevu günü merkeze git, parmak izi ve fotoğraf ver
6. Başvuru sonucunu bekle: ortalama 10-15 iş günü
7. Vizeyi al ve seyahat et

**2026 Vize Maliyeti:**

• Standart Schengen vize ücreti: 90€
• Vize merkezi hizmet bedeli: 25-35€
• Toplam kişi başı: yaklaşık 115-125€

**Önemli Bilgiler:**

İlk Schengen başvurusu için Yunanistan, Malta veya Estonya gibi randevusu kolay ve işlemi hızlı ülkeler önerilir. Doğru kullanılan her vize, sonraki başvuruda daha uzun süreli çok girişli vize kapısı açar (CASCADE Kuralı).
    `,
  },
  {
    id: "schengen-gorulecek-yerler",
    category: "Seyahat",
    categoryColor: "text-emerald-700 bg-emerald-500/8 border-emerald-500/18",
    title: "Schengen Bölgesinde Mutlaka Görülmesi Gereken 15 Yer",
    excerpt: "Paris'ten Dubrovnik'e, Santorini'den Prag'a — Schengen vizesiyle erişebileceğiniz Avrupa'nın en büyülü destinasyonları ve pratik seyahat notları.",
    readTime: "8 dk",
    featured: false,
    content: `
**1. Atina, Yunanistan 🇬🇷**
Akropolis, Parthenon ve tarihi Plaka semtiyle insanlık tarihinin en önemli yapılarına ev sahipliği yapan Atina.

**2. Paris, Fransa 🇫🇷**
Eyfel Kulesi, Louvre Müzesi, Notre-Dame Katedrali ve Montmartre.

**3. Roma, İtalya 🇮🇹**
Kolezyum, Vatikan Müzeleri, Trevi Çeşmesi ve Pantheon.

**4. Barselona, İspanya 🇪🇸**
Gaudí'nin Sagrada Família'sı, Park Güell ve Las Ramblas.

**5. Amsterdam, Hollanda 🇳🇱**
Kanal evleri, Van Gogh Müzesi ve Rijksmuseum.

**6. Prag, Çekya 🇨🇿**
Orta Çağ'dan kalma Eski Şehir ve büyüleyici Kale semti.

**7. Viyana, Avusturya 🇦🇹**
Schönbrunn Sarayı, Opera Binası ve Belvedere Müzesi.

**8. Dubrovnik, Hırvatistan 🇭🇷**
Adriyatik kıyısındaki surlarla çevrili bu tarihi kent.

**9. Budapeşte, Macaristan 🇭🇺**
Tuna Nehri'ni ikiye bölen başkent, Buda Kalesi ve Parlamento Binası.

**10. Lizbon, Portekiz 🇵🇹**
Yedi tepe üzerine kurulu, renkli tramvayları ve fado müziğiyle Avrupa'nın en otantik başkenti.

**11. Brüksel, Belçika 🇧🇪**
Grand Place, Manneken Pis ve Atomium.

**12. Oslo, Norveç 🇳🇴**
Fiyortlar, Viking Müzesi ve Vigeland Heykel Parkı.

**13. Santorini, Yunanistan 🇬🇷**
Mavi kubbeli kiliseler, volkanik kayalıklar ve Oia'da gün batımı.

**14. Floransa, İtalya 🇮🇹**
Uffizi Galerisi, Michelangelo'nun Davidi ve Ponte Vecchio.

**15. Tallinn, Estonya 🇪🇪**
Orta Çağ surlarıyla çevrili Eski Şehir — Baltık'ın sürpriz gizemi.
    `,
  },
  {
    id: "yunanistan-adalari",
    category: "Destinasyon",
    categoryColor: "text-sky-700 bg-sky-500/8 border-sky-500/18",
    title: "Yunanistan Adaları: Schengen Vizesiyle Akdeniz'de Rüya Tatili",
    excerpt: "Santorini'nin mavi kubbeleri, Mykonos'un beyaz sokakları, Girit'in antik tarihi — Yunanistan adaları nasıl planlanır, hangi ada neyi sunar?",
    readTime: "5 dk",
    featured: false,
    content: `
**Santorini — Dünyanın En Ünlü Adası**
Kaldera'ya hakim konumuyla Santorini, Ege'nin en ikonik adalarından biridir. Oia köyündeki gün batımı, tüm seyahat listelerinde birinci sırada yer alır.

**Mykonos — Eğlence ve Şıklığın Adresi**
Beyaz Cyclades mimarisi ve renkli yel değirmenleriyle Mykonos, hem gündüz hem gece eşit ölçüde canlıdır.

**Girit (Crete) — Antik Tarih ve Doğal Güzellik**
Minos Uygarlığı'nın merkezi Knossos Sarayı, antik şehirler ve Samaria Gorge trekkingiyle farklı bir Yunanistan deneyimi.

**Rodos — Orta Çağ'ın Akdeniz Kalesi**
UNESCO Dünya Mirası statüsündeki Rodos Eski Şehri, Şövalyeler'in döneminden kalma surlarla çevrilidir.

**Korfu — Venedik Etkisinin İzleri**
İyon Denizi'ndeki Korfu, Venedik mimarisinin bıraktığı izlerle Kuzey Yunanistan'ın en özgün adasıdır.

**Pratik Bilgiler:**
• İstanbul-Atina arası 1.5 saatlik uçuş
• Haziran-Eylül yoğun sezon; Mayıs ve Ekim daha sakin ve ekonomik
• Vize başvurusu için Kosmos Vize üzerinden 3-7 iş günü
    `,
  },
  {
    id: "italya-schengen-rotasi",
    category: "Destinasyon",
    categoryColor: "text-orange-700 bg-orange-500/8 border-orange-500/18",
    title: "İtalya'da 10 Günlük Schengen Rotası: Roma'dan Venedik'e",
    excerpt: "Kolezyum, Uffizi, kanallar ve Amalfi kıyısı — İtalya'nın en iyi destinasyonlarını kapsayan 10 günlük ideal rota planı.",
    readTime: "6 dk",
    featured: false,
    content: `
**Gün 1-3: Roma — Ebedi Şehir**
Kolezyum, Roma Forumu ve Palatine Tepesi'nden başlayın. Vatikan Müzeleri ve Sistine Şapeli (önceden bilet alın). Trevi Çeşmesi'ne gece gidin.

**Gün 4-5: Floransa — Rönesans'ın Kalbi**
Roma'dan trenle 1.5 saat. Uffizi Galerisi, Accademia'da Michelangelo'nun Davidi, Ponte Vecchio, Duomo.

**Gün 6-7: Cinque Terre — Renkli Kıyı Köyleri**
Riomaggiore, Manarola, Corniglia, Vernazza, Monterosso — köyler arasındaki patikada trekking.

**Gün 8-9: Venedik — Kanallarda Kayık**
Grand Canal boyunca vaporetto, Piazza San Marco, Doge's Palace, Murano Adası cam atölyesi.

**Gün 10: Milano — Moda ve Sanat**
Milano Katedrali, Leonardo'nun Son Akşam Yemeği (önceden rezervasyon şart), Galeria Vittorio Emanuele II.

**Pratik Notlar:**
• Roma-Floransa-Venedik arası Trenitalia veya Italo hızlı tren
• İtalya vizesi iDATA üzerinden, 25-45 gün bekleme süresiyle
    `,
  },
  {
    id: "banka-hesabi-hazirlik",
    category: "Vize Rehberi",
    categoryColor: "text-[#0077B6] bg-[#0077B6]/8 border-[#0077B6]/18",
    title: "Schengen Vizesi İçin Banka Hesabı Nasıl Hazırlanır?",
    excerpt: "Yeterli bakiye ne demektir, kaç aylık özet istenecek, ani büyük para girişi neden red sebebidir? Vize finansal hazırlığı için bilinmesi gereken her şey.",
    readTime: "4 dk",
    featured: false,
    content: `
**Ne Kadar Para Olmalı?**
(Kalınacak gün sayısı × 80€) + konaklama toplam + bilet fiyatı = Minimum görünmesi gereken bakiye.
Örnek: 10 günlük İtalya turu için ~1.700€ → Yaklaşık 60.000-70.000 TL.

**Kaç Aylık Özet İstenir?**
• Çoğu ülke: Son 3 aylık hesap özeti
• Almanya, Litvanya: Son 6 aylık hesap özeti

**Kesinlikle Yapılmaması Gerekenler:**
❌ Başvurudan hemen önce büyük nakit yatırma
❌ Birden fazla hesaptan küçük miktarları birleştirerek sunma
❌ Düzensiz gelir gösterimi

**Yapılması Gerekenler:**
✅ En az 3 ay öncesinden hesabınızı aktif tutun
✅ Aylık düzenli gelir görünür olsun
✅ Hesap özetini başvurudan en fazla 1 ay önce alın
    `,
  },
  {
    id: "butce-tatil-schengen",
    category: "Seyahat",
    categoryColor: "text-emerald-700 bg-emerald-500/8 border-emerald-500/18",
    title: "Schengen'de Bütçe Tatil: En Ekonomik Avrupa Destinasyonları 2026",
    excerpt: "Batı Avrupa fiyatlarına gerek yok — Polonya, Bulgaristan, Macaristan ve Çekya gibi ülkeler, Schengen vizesiyle en ekonomik Avrupa tatilini sunar.",
    readTime: "5 dk",
    featured: false,
    content: `
**Budapeşte, Macaristan 🇭🇺 — Orta Avrupa'nın Gizemi**
UNESCO Dünya Mirası statüsündeki Buda Kalesi ve Parlamento Binası. Günlük yaşam maliyeti Viyana veya Paris'in yarısı.

**Prag, Çekya 🇨🇿 — Orta Çağ'da Bir Öğleden Sonra**
Vltava Nehri kıyısındaki Eski Şehir ve Charles Köprüsü.

**Varşova ve Kraków, Polonya 🇵🇱 — Tarih ve Direniş**
Kraków'dan Auschwitz-Birkenau Anıt Müzesi günübirlik.

**Sofya ve Varna, Bulgaristan 🇧🇬 — Avrupa'nın En Ekonomik Schengen Ülkesi**
Sofya'da Alexander Nevski Katedrali. Karadeniz kıyısı Varna yaz aylarında idealdir.

**Bratislava, Slovakya 🇸🇰 — Viyana'nın Küçük Kardeşi**
Viyana'ya 60 dakika uzaklıktadır; ikisi birlikte planlanabilir.

**Pratik İpuçları:**
• Uçuş biletleri İstanbul'dan 3.000-8.000 TL arası gidiş-dönüş
• Airbnb ve hostel seçenekleri Batı Avrupa'ya göre %40-60 daha ucuz
    `,
  },
];

function ArticleCard({ article, index }: { article: typeof ARTICLES[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.07, 0.35) }}
      className="bg-white border border-[#0A1628]/7 rounded-2xl overflow-hidden hover:border-[#C9A84C]/30 hover:shadow-md transition-all duration-200"
      style={{ boxShadow: "0 1px 4px rgba(10,22,40,0.04)" }}
    >
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-6 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <span className={`inline-flex text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${article.categoryColor}`}>
            {article.category}
          </span>
          <div className="flex items-center gap-3 shrink-0 mt-0.5">
            <span className="flex items-center gap-1 text-[11px] text-[#0A1628]/30 font-light">
              <Clock size={10} />
              {article.readTime}
            </span>
            <ChevronDown size={15} className={`text-[#0A1628]/25 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </div>
        </div>

        <h3
          className="text-lg font-semibold text-[#0A1628]/85 leading-snug tracking-tight text-left"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {article.title}
        </h3>
        <p className="text-sm text-[#0A1628]/45 font-light leading-relaxed text-left line-clamp-2">
          {article.excerpt}
        </p>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-[#0A1628]/5 pt-5 bg-[#FAF9F7]">
              <div className="prose prose-sm max-w-none">
                {article.content.trim().split("\n\n").map((para, i) => {
                  if (para.startsWith("**") && para.endsWith("**")) {
                    return (
                      <h4 key={i} className="text-[#0A1628]/75 font-semibold text-sm mt-4 mb-2">
                        {para.replace(/\*\*/g, "")}
                      </h4>
                    );
                  }
                  return (
                    <p key={i} className="text-[#0A1628]/50 font-light text-sm leading-relaxed mb-3">
                      {para.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                        part.startsWith("**") && part.endsWith("**")
                          ? <strong key={j} className="text-[#0A1628]/70 font-semibold">{part.replace(/\*\*/g, "")}</strong>
                          : part
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FeaturedArticle({ article }: { article: typeof ARTICLES[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8 bg-gradient-to-br from-[#C9A84C]/5 via-white to-[#0077B6]/4 border border-[#C9A84C]/18 rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 2px 20px rgba(201,168,76,0.08)" }}
    >
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-8 md:p-10">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span className={`inline-flex text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border ${article.categoryColor}`}>
              {article.category}
            </span>
            <span className="text-[10px] text-[#C9A84C] font-medium uppercase tracking-wider bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-2.5 py-1">
              Öne Çıkan
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1 text-xs text-[#0A1628]/30 font-light">
              <Clock size={11} />
              {article.readTime}
            </span>
            <ChevronDown size={16} className={`text-[#0A1628]/30 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </div>
        </div>

        <h3
          className="text-2xl md:text-3xl font-semibold text-[#0A1628] leading-snug tracking-tight mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {article.title}
        </h3>
        <p className="text-base text-[#0A1628]/50 font-light leading-relaxed max-w-3xl">
          {article.excerpt}
        </p>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-8 md:px-10 pb-8 border-t border-[#0A1628]/6 pt-6 bg-[#FAF9F7]">
              <div className="max-w-3xl">
                {article.content.trim().split("\n\n").map((para, i) => {
                  if (para.startsWith("**") && para.endsWith("**")) {
                    return (
                      <h4 key={i} className="text-[#0A1628]/75 font-semibold text-base mt-6 mb-3">
                        {para.replace(/\*\*/g, "")}
                      </h4>
                    );
                  }
                  return (
                    <p key={i} className="text-[#0A1628]/55 font-light text-sm leading-relaxed mb-3">
                      {para.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                        part.startsWith("**") && part.endsWith("**")
                          ? <strong key={j} className="text-[#0A1628]/75 font-semibold">{part.replace(/\*\*/g, "")}</strong>
                          : part
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BlogSection() {
  const [featured, ...rest] = ARTICLES;

  return (
    <section id="blog" className="py-24 section-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 border border-[#0A1628]/8 bg-white rounded-full px-4 py-1.5 mb-5 shadow-sm">
            <BookOpen size={11} className="text-[#0A1628]/40" />
            <span className="text-xs text-[#0A1628]/40 font-light tracking-wider uppercase">Blog & Rehberler</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2
                className="text-4xl md:text-5xl font-light text-[#0A1628] tracking-tight leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Schengen Seyahati
                <br />
                <span className="italic">Rehberleri</span>
              </h2>
              <p className="text-[#0A1628]/40 font-light text-base mt-4 max-w-xl leading-relaxed">
                Vize başvurusundan tatil planlamasına, görülmesi gereken yerlerden bütçe ipuçlarına
                — Schengen seyahatinizi başarıya götürecek kapsamlı rehberler.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {["Vize Rehberi", "Seyahat", "Destinasyon"].map((cat) => (
                <span key={cat} className="text-xs text-[#0A1628]/35 border border-[#0A1628]/8 bg-white rounded-full px-3 py-1.5">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <FeaturedArticle article={featured} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
