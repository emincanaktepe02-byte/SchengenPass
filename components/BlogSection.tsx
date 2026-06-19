"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, BookOpen } from "lucide-react";

const ARTICLES = [
  {
    id: "schengen-vizesi-nasil-alinir",
    category: "Vize Rehberi",
    catClass: "text-sky-400/80 bg-sky-900/30 border-sky-700/25",
    title: "Schengen Vizesi Nasıl Alınır? 2026 Eksiksiz Rehber",
    excerpt: "Türkiye'den Schengen bölgesine seyahat için vize başvurusu nasıl yapılır, hangi belgeler gerekir, süreç ne kadar sürer? Adım adım, güncel bilgilerle.",
    readTime: "7 dk",
    featured: true,
    content: `
**Schengen Vizesi Nedir?**

Schengen Anlaşması'na taraf 29 ülke için tek bir vize yeterlidir. Alınan vize ile bu ülkelerin tamamında 180 günlük dönem içinde en fazla 90 gün kalınabilir.

**Hangi Konsolosluğa Başvurulur?**

Birden fazla Schengen ülkesi planlanıyorsa, en uzun konaklama yapılacak ülkenin konsolosluğuna başvurulur. Tüm günler eşitse, ilk giriş yapılacak ülke seçilir.

**Gerekli Belgeler:**

• Geçerli pasaport — seyahat sonrasında en az 3 ay geçerli, son 10 yılda alınmış
• 2 adet biyometrik fotoğraf — son 6 ay içinde çekilmiş, beyaz arka planlı
• Eksiksiz doldurulmuş vize başvuru formu
• Seyahat sigortası — minimum 30.000€ teminat, tüm Schengen ülkelerini kapsayan
• Uçuş rezervasyonu — kesinleştirilmiş veya geçici rezervasyon belgesi
• Konaklama belgesi — otel rezervasyonu, Airbnb veya davet mektubu
• Banka hesap özeti — son 3-6 aya ait, düzenli gelir ve yeterli bakiye gösteren
• Gelir belgesi — iş sözleşmesi, maaş bordrosu veya vergi kaydı

**Başvuru Süreci Adım Adım:**

1. Seyahat planını netleştir: Hangi ülke, hangi tarihler, kaç gece?
2. Doğru vize merkezini seç: VFS Global, iDATA, Kosmos Vize, BLS International veya AS Visa Solutions
3. Online randevu al — yoğun ülkeler için 2-3 ay öncesinden
4. Belgeleri eksiksiz hazırla
5. Randevu günü merkeze git, parmak izi ve fotoğraf ver
6. Başvuru sonucunu bekle: ortalama 10-15 iş günü

**2026 Vize Maliyeti:**

Standart Schengen vize ücreti 90€ + vize merkezi hizmet bedeli 25-35€ = kişi başı yaklaşık 115-125€.
    `,
  },
  {
    id: "schengen-gorulecek-yerler",
    category: "Seyahat",
    catClass: "text-emerald-400/80 bg-emerald-900/25 border-emerald-700/20",
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

**8. Budapeşte, Macaristan 🇭🇺**
Tuna Nehri'ni ikiye bölen başkent, Buda Kalesi ve Parlamento Binası.

**9. Lizbon, Portekiz 🇵🇹**
Yedi tepe üzerine kurulu, renkli tramvayları ve fado müziğiyle Avrupa'nın en otantik başkenti.

**10. Santorini, Yunanistan 🇬🇷**
Mavi kubbeli kiliseler, volkanik kayalıklar ve Oia'da gün batımı.

**11. Floransa, İtalya 🇮🇹**
Uffizi Galerisi, Michelangelo'nun Davidi ve Ponte Vecchio.

**12. Tallinn, Estonya 🇪🇪**
Orta Çağ surlarıyla çevrili Eski Şehir — Baltık'ın sürpriz gizemi.
    `,
  },
  {
    id: "yunanistan-adalari",
    category: "Destinasyon",
    catClass: "text-sky-300/70 bg-sky-900/30 border-sky-700/20",
    title: "Yunanistan Adaları: Schengen Vizesiyle Akdeniz'de Rüya Tatili",
    excerpt: "Santorini'nin mavi kubbeleri, Mykonos'un beyaz sokakları, Girit'in antik tarihi — Yunanistan adaları nasıl planlanır?",
    readTime: "5 dk",
    featured: false,
    content: `
**Santorini — Dünyanın En Ünlü Adası**
Kaldera'ya hakim konumuyla Santorini, Ege'nin en ikonik adalarından biridir.

**Mykonos — Eğlence ve Şıklığın Adresi**
Beyaz Cyclades mimarisi ve renkli yel değirmenleriyle Mykonos hem gündüz hem gece canlıdır.

**Girit — Antik Tarih ve Doğal Güzellik**
Minos Uygarlığı'nın merkezi Knossos Sarayı ve Samaria Gorge trekkingiyle farklı bir Yunanistan.

**Rodos — Orta Çağ'ın Akdeniz Kalesi**
UNESCO Dünya Mirası statüsündeki Rodos Eski Şehri, Şövalyeler'den kalma surlarla çevrilidir.

**Pratik Bilgiler:**
• İstanbul-Atina arası 1.5 saatlik uçuş
• Haziran-Eylül yoğun sezon; Mayıs ve Ekim daha sakin ve ekonomik
• Vize başvurusu için Kosmos Vize üzerinden 3-7 iş günü
    `,
  },
  {
    id: "italya-schengen-rotasi",
    category: "Destinasyon",
    catClass: "text-orange-400/70 bg-orange-900/20 border-orange-700/18",
    title: "İtalya'da 10 Günlük Schengen Rotası: Roma'dan Venedik'e",
    excerpt: "Kolezyum, Uffizi, kanallar ve Amalfi kıyısı — İtalya'nın en iyi destinasyonlarını kapsayan 10 günlük ideal rota planı.",
    readTime: "6 dk",
    featured: false,
    content: `
**Gün 1-3: Roma — Ebedi Şehir**
Kolezyum, Roma Forumu ve Palatine Tepesi. Vatikan Müzeleri ve Sistine Şapeli (önceden bilet alın). Trevi Çeşmesi'ne gece gidin.

**Gün 4-5: Floransa — Rönesans'ın Kalbi**
Roma'dan trenle 1.5 saat. Uffizi Galerisi, Accademia'da Michelangelo'nun Davidi, Ponte Vecchio, Duomo.

**Gün 6-7: Cinque Terre — Renkli Kıyı Köyleri**
Riomaggiore, Manarola, Corniglia, Vernazza, Monterosso — köyler arasındaki patikada trekking.

**Gün 8-9: Venedik — Kanallarda Kayık**
Grand Canal boyunca vaporetto, Piazza San Marco, Doge's Palace, Murano Adası.

**Pratik Notlar:**
• Roma-Floransa-Venedik arası Trenitalia veya Italo hızlı tren
• İtalya vizesi iDATA üzerinden, 25-45 gün bekleme süresiyle
    `,
  },
  {
    id: "banka-hazirlik",
    category: "Vize Rehberi",
    catClass: "text-sky-400/80 bg-sky-900/30 border-sky-700/25",
    title: "Schengen Vizesi İçin Banka Hesabı Nasıl Hazırlanır?",
    excerpt: "Yeterli bakiye ne demektir, kaç aylık özet istenecek, ani büyük para girişi neden red sebebidir?",
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
❌ Düzensiz gelir gösterimi

**Yapılması Gerekenler:**
✅ En az 3 ay öncesinden hesabınızı aktif tutun
✅ Aylık düzenli gelir görünür olsun
    `,
  },
  {
    id: "butce-tatil",
    category: "Seyahat",
    catClass: "text-emerald-400/80 bg-emerald-900/25 border-emerald-700/20",
    title: "Schengen'de Bütçe Tatil: En Ekonomik Avrupa Destinasyonları 2026",
    excerpt: "Polonya, Bulgaristan, Macaristan ve Çekya — Schengen vizesiyle en ekonomik Avrupa tatili seçenekleri.",
    readTime: "5 dk",
    featured: false,
    content: `
**Budapeşte, Macaristan 🇭🇺 — Orta Avrupa'nın Gizemi**
UNESCO Dünya Mirası statüsündeki Buda Kalesi ve Parlamento Binası. Günlük yaşam maliyeti Viyana'nın yarısı.

**Prag, Çekya 🇨🇿 — Orta Çağ'da Bir Öğleden Sonra**
Vltava Nehri kıyısındaki Eski Şehir ve Charles Köprüsü.

**Sofya ve Varna, Bulgaristan 🇧🇬**
Sofya'da Alexander Nevski Katedrali. Karadeniz kıyısı Varna yaz aylarında ideal.

**Bratislava, Slovakya 🇸🇰 — Viyana'nın Küçük Kardeşi**
Viyana'ya 60 dakika uzaklıkta; ikisi birlikte planlanabilir.

**Pratik İpuçları:**
• Uçuş biletleri İstanbul'dan 3.000-8.000 TL arası gidiş-dönüş
• Airbnb ve hostel seçenekleri Batı Avrupa'ya göre %40-60 daha ucuz
    `,
  },
];

function renderContent(content: string) {
  return content.trim().split("\n\n").map((para, i) => {
    if (para.startsWith("**") && para.endsWith("**")) {
      return <h4 key={i} className="text-[#F0EBE0]/65 font-semibold text-sm mt-4 mb-2">{para.replace(/\*\*/g, "")}</h4>;
    }
    return (
      <p key={i} className="text-[#F0EBE0]/38 font-light text-[13px] leading-relaxed mb-2.5">
        {para.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
          part.startsWith("**") && part.endsWith("**")
            ? <strong key={j} className="text-[#F0EBE0]/60 font-medium">{part.replace(/\*\*/g, "")}</strong>
            : part
        )}
      </p>
    );
  });
}

function ArticleCard({ article, index }: { article: typeof ARTICLES[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: Math.min(index * 0.07, 0.35) }}
      className="card overflow-hidden hover:border-[#D4A843]/22 transition-all"
    >
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-6 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <span className={`inline-flex text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${article.catClass}`}>
            {article.category}
          </span>
          <div className="flex items-center gap-3 shrink-0 mt-0.5">
            <span className="flex items-center gap-1 text-[11px] text-[#F0EBE0]/22 font-light">
              <Clock size={10} />{article.readTime}
            </span>
            <ChevronDown size={14} className={`text-[#F0EBE0]/20 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </div>
        </div>
        <h3 className="serif text-[16px] font-semibold text-[#F0EBE0]/80 leading-snug tracking-tight text-left">
          {article.title}
        </h3>
        <p className="text-[13px] text-[#F0EBE0]/35 font-light leading-relaxed text-left line-clamp-2">
          {article.excerpt}
        </p>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-6 pb-6 border-t border-white/5 pt-5 bg-[#0F0F0F]">
              {renderContent(article.content)}
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
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="mb-8 card border-[#D4A843]/15 overflow-hidden"
      style={{ boxShadow: "0 2px 30px rgba(212,168,67,0.06)" }}>
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-8 md:p-10">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span className={`inline-flex text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border ${article.catClass}`}>
              {article.category}
            </span>
            <span className="badge badge-gold">Öne Çıkan</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1 text-xs text-[#F0EBE0]/22 font-light">
              <Clock size={11} />{article.readTime}
            </span>
            <ChevronDown size={16} className={`text-[#F0EBE0]/22 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </div>
        </div>
        <h3 className="serif text-2xl md:text-3xl font-semibold text-[#F0EBE0]/85 leading-snug tracking-tight mb-4">
          {article.title}
        </h3>
        <p className="text-[15px] text-[#F0EBE0]/40 font-light leading-relaxed max-w-3xl">
          {article.excerpt}
        </p>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-8 md:px-10 pb-8 border-t border-white/5 pt-6 bg-[#0F0F0F]">
              <div className="max-w-3xl">{renderContent(article.content)}</div>
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
    <section id="blog" className="section-ink py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-12">
          <p className="badge mb-5">
            <BookOpen size={10} className="text-[#D4A843]" />
            Blog &amp; Rehberler
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="serif text-4xl md:text-5xl font-light text-[#F0EBE0] tracking-tight leading-[1.1]">
                Schengen Seyahati<br />
                <em className="not-italic italic opacity-60">Rehberleri</em>
              </h2>
              <p className="text-[#F0EBE0]/35 font-light text-[15px] mt-4 max-w-xl leading-relaxed">
                Vize başvurusundan tatil planlamasına, görülmesi gereken yerlerden bütçe ipuçlarına —
                Schengen seyahatinizi başarıya götürecek kapsamlı rehberler.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {["Vize Rehberi", "Seyahat", "Destinasyon"].map(cat => (
                <span key={cat} className="badge">{cat}</span>
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
