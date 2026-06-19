"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, BookOpen } from "lucide-react";

// ── Article data ──────────────────────────────────────────────────────────────

const ARTICLES = [
  {
    id: "schengen-vizesi-nasil-alinir",
    category: "Vize Rehberi",
    categoryColor: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    title: "Schengen Vizesi Nasıl Alınır? 2026 Eksiksiz Rehber",
    excerpt:
      "Türkiye'den Schengen bölgesine seyahat etmek için vize başvurusu nasıl yapılır, hangi belgeler gerekir, süreç ne kadar sürer? Adım adım, güncel bilgilerle.",
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

İlk Schengen başvurusu için Yunanistan, Malta veya Estonya gibi randevusu kolay ve işlemi hızlı ülkeler önerilir. Doğru kullanılan her vize, sonraki başvuruda daha uzun süreli çok girişli vize kapısı açar (Kaskad Kuralı).
    `,
  },
  {
    id: "schengen-gorulecek-yerler",
    category: "Seyahat",
    categoryColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    title: "Schengen Bölgesinde Mutlaka Görülmesi Gereken 15 Yer",
    excerpt:
      "Paris'ten Dubrovnik'e, Santorini'den Prag'a — Schengen vizesiyle erişebileceğiniz Avrupa'nın en büyülü destinasyonları ve pratik seyahat notları.",
    readTime: "8 dk",
    featured: false,
    content: `
Schengen bölgesi, dünyanın en zengin turizm destinasyonlarını barındıran Avrupa kıtasının büyük bölümünü kapsar. Tek bir vizeyle 29 ülkeyi özgürce gezebilirsiniz.

**1. Atina, Yunanistan 🇬🇷**
Akropolis, Parthenon ve tarihi Plaka semtiyle insanlık tarihinin en önemli yapılarına ev sahipliği yapan Atina, her Schengen seyahatinin başlangıç noktası olabilir. Rodos, Santorini ve Mykonos adaları ise ayrı birer cennet.

**2. Paris, Fransa 🇫🇷**
Eyfel Kulesi, Louvre Müzesi, Notre-Dame Katedrali ve Montmartre — Paris, Avrupa'nın en ikonik şehrini sunar. Seine Nehri kıyısında bir kahve molası, tarihin içine dalmak gibidir.

**3. Roma, İtalya 🇮🇹**
Kolezyum, Vatikan Müzeleri, Trevi Çeşmesi ve Pantheon — Roma, nereye adım atsan tarihin soluğunu hissettiren açık hava müzesidir. Floransa ve Venedik ise İtalya turunu tamamlar.

**4. Barselona, İspanya 🇪🇸**
Gaudí'nin Sagrada Família'sı, Park Güell ve Las Ramblas — Barselona, modern mimari ve Akdeniz kültürünün buluşma noktasıdır. Güneşli plajları ve canlı gece hayatıyla tüm mevsimler cazip.

**5. Amsterdam, Hollanda 🇳🇱**
Kanal evleri, Van Gogh Müzesi ve Rijksmuseum — Amsterdam, bisikletle gezilebilecek boyuttaki büyük bir Avrupa başkentidir. Keukenhof lale bahçeleri ilkbaharda ayrı bir güzellik sunar.

**6. Prag, Çekya 🇨🇿**
Orta Çağ'dan kalma Eski Şehir, büyüleyici Kale semti ve Vltava Nehri üzerindeki Charles Köprüsü — Prag, adeta bir peri masalı şehridir. Uygun fiyatı ve eşsiz atmosferiyle öne çıkar.

**7. Viyana, Avusturya 🇦🇹**
Mozart ve Beethoven'in şehri Viyana, Schönbrunn Sarayı, Opera Binası ve Belvedere Müzesi ile klasik müzik ve sanat severlerin başkentidir. Kafelerinin kültürü UNESCO listesindedir.

**8. Dubrovnik, Hırvatistan 🇭🇷**
Adriyatik kıyısındaki surlarla çevrili bu tarihi kent, Game of Thrones çekimleriyle de tanınır. Mavi suları ve kırmızı çatılı evleriyle Dalmaçya kıyısı eşsizdir.

**9. Budapeşte, Macaristan 🇭🇺**
Tuna Nehri'ni ikiye bölen Budapest, Buda Kalesi, Parlamento Binası ve termal banyolarıyla Orta Avrupa'nın en görkemli şehirlerinden biridir. Akşam yılbaşı ışıkları altında köprüler büyüleyicidir.

**10. Lizbon, Portekiz 🇵🇹**
Yedi tepe üzerine kurulu Lizbon, renkli tramvayları, fado müziği ve merkezindeki Alfama semtiyle Avrupa'nın en otantik başkentlerinden biridir. Sintra ve Cascais günübirlik tur noktaları olarak idealdir.

**11. Brüksel, Belçika 🇧🇪**
Grand Place, Manneken Pis ve Atomium — Brüksel, çikolatası, waffle'ı ve AB kurumlarıyla küçük ama özgün bir şehirdir. Bruges ve Gent ise tarihi dokularıyla farklı bir Belçika deneyimi sunar.

**12. Oslo, Norveç 🇳🇴**
Fiyortlar, Viking Müzesi ve Vigeland Heykel Parkı — Oslo, doğa ve kültürü dengede tutan bir Kuzey Avrupa başkentidir. Kasım-Mart arası kuzey ışıklarını görmek için fırsat.

**13. Santorini, Yunanistan 🇬🇷**
Mavi kubbeli kiliseler, volkanik kayalıklar ve Akdeniz'in sonsuz mavisi — Santorini, dünyanın en çok fotoğraflanan destinasyonlarından biridir. Oia'da gün batımı ömür boyu unutulmaz.

**14. Floransa, İtalya 🇮🇹**
Uffizi Galerisi, Michelangelo'nun Davidi ve Ponte Vecchio — Floransa, Rönesans'ın doğduğu kenttir. Her köşe başında bir müze kalitesinde yapıt bulunur.

**15. Tallinn, Estonya 🇪🇪**
Orta Çağ surlarıyla çevrili Eski Şehir, kaldırım taşlı sokaklarda yürüyüş ve en iyi korunan gotik mimari — Tallinn, Baltık'ın sürpriz gizemi. Schengen ülkeleri arasında en ekonomik destinasyonlardan biri.
    `,
  },
  {
    id: "yunanistan-adalari",
    category: "Destinasyon",
    categoryColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    title: "Yunanistan Adaları: Schengen Vizesiyle Akdeniz'de Rüya Tatili",
    excerpt:
      "Santorini'nin mavi kubbeleri, Mykonos'un beyaz sokakları, Girit'in antik tarihi — Yunanistan adaları nasıl planlanır, hangi ada neyi sunar?",
    readTime: "5 dk",
    featured: false,
    content: `
Yunanistan, hem kıta hem de 227 nüfuslu ada dahil 6.000'den fazla adayı barındıran eşsiz bir Schengen destinasyonudur. Türkiye'den en kolay ulaşılabilir Schengen ülkesi olan Yunanistan, aynı zamanda ilk Schengen başvurusu için en önerilen ülkedir.

**Santorini — Dünyanın En Ünlü Adası**
Kaldera'ya hakim konumuyla Santorini, Ege'nin en ikonik adalarından biridir. Oia köyündeki gün batımı, tüm seyahat listelerinde birinci sırada yer alır. Mavi kubbeli kiliseler, beyaz badanalı evler ve volkanik kayalıklar benzersiz bir manzara oluşturur. İstanbul'dan doğrudan uçuş veya Atina üzerinden feribot bağlantısı mevcuttur.

**Mykonos — Eğlence ve Şıklığın Adresi**
Beyaz Cyclades mimarisi ve renkli yel değirmenleriyle Mykonos, hem gündüz hem gece eşit ölçüde canlıdır. Adanın kuzeybatısındaki Delos Adası ise antik Yunan medeniyetinin en önemli arkeolojik alanlarından biridir.

**Girit (Crete) — Antik Tarih ve Doğal Güzellik**
Yunanistan'ın en büyük adası Girit, Minos Uygarlığı'nın merkezi Knossos Sarayı, antik şehirler ve Samaria Gorge trekkingiyle farklı bir Yunanistan deneyimi sunar. Heraklion ve Hanya limanları özellikle güzel.

**Rodos — Orta Çağ'ın Akdeniz Kalesi**
UNESCO Dünya Mirası statüsündeki Rodos Eski Şehri, Şövalyeler'in döneminden kalma surlarla çevrilidir. Lindos Acropolisi ve kristal berraklığındaki koylari ile hem tarihi hem doğal güzelliği sunar.

**Korfu — Venedik Etkisinin İzleri**
İyon Denizi'ndeki Korfu, Venedik mimarisinin bıraktığı izlerle Kuzey Yunanistan'ın en özgün adasıdır. Yeşil tepeleri ve sakin plajlarıyla aileler ve çiftler için idealdir.

**Pratik Bilgiler:**
• İstanbul-Atina arasında 1.5 saatlik uçuş
• Atina'dan adalara feribot veya küçük uçakla ulaşım
• Haziran-Eylül yoğun sezon; Mayıs ve Ekim daha sakin ve ekonomik
• Vize başvurusu için Kosmos Vize üzerinden 3-7 iş günü süre
    `,
  },
  {
    id: "italya-schengen-rotasi",
    category: "Destinasyon",
    categoryColor: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    title: "İtalya'da 10 Günlük Schengen Rotası: Roma'dan Venedik'e",
    excerpt:
      "Kolezyum, Uffizi, kanallar ve Amalfi kıyısı — İtalya'nın en iyi destinasyonlarını kapsayan 10 günlük ideal rota planı ve pratik seyahat notları.",
    readTime: "6 dk",
    featured: false,
    content: `
İtalya, tek bir Schengen vizesiyle doğu kıyısından batı kıyısına farklı şehir karakterleri, mutfaklar ve tarihi dönemler sunan çok yönlü bir destinasyondur. 10 günlük bir İtalya turu için önerilen rota:

**Gün 1-3: Roma — Ebedi Şehir**
Kolezyum, Roma Forumu ve Palatine Tepesi'nden başlayın (2-3 saat). Trastevere semtinde öğle yemeği mola verin. Öğleden sonra Vatikan Müzeleri ve Sistine Şapeli (önceden bilet alın). Akşam Campo de' Fiori meydanında italyan aperitif kültürünü yaşayın. Trevi Çeşmesi'ne gece gidin — kalabalıktan azade olur. Pantheon sabah erken saatlerde görün, çok daha sakin.

**Gün 4-5: Floransa — Rönesans'ın Kalbi**
Roma'dan trenle 1.5 saat. Uffizi Galerisi mutlaka görülmeli — Botticelli'nin Venüs'ün Doğuşu burada. Accademia'da Michelangelo'nun orijinal Davidi. Ponte Vecchio üzerinde yürüyüş. Floransa Katedrali'ne (Duomo) çıkarak şehrin tamamını kuş bakışı görün. Akşam Oltrarno semtinde otantik Floransalı trattoría'larda yemek.

**Gün 6-7: Cinque Terre — Renkli Kıyı Köyleri**
Floransa'dan trenle ulaşılabilen beş köy — Riomaggiore, Manarola, Corniglia, Vernazza, Monterosso — İtalya'nın en etkileyici kıyı manzarasını sunar. Köyler arasındaki patikada trekking veya tekneyle tur yapılabilir. Günübirlik veya bir geceleme planlanabilir.

**Gün 8-9: Venedik — Kanallarda Kayık**
Dünyada eşi benzeri olmayan şehir. Grand Canal boyunca vaporetto yolculuğu, Piazza San Marco ve Doge's Palace. Rialto Köprüsü'nden gün batımını izleyin. Murano Adası'nda cam atölyesi ziyareti. Gondol turu fiyat pazarlığı gerektirir — akşam saatleri daha romantik.

**Gün 10: Milano — Moda ve Sanat**
Venedik'ten trene atlayın. Milano Katedrali (Duomo) ve çatısına çıkış. Leonardo da Vinci'nin Son Akşam Yemeği freski (önceden rezervasyon şart). Galeria Vittorio Emanuele II'de alışveriş vitrinleri. Navigli kanalı çevresinde akşam yemeği.

**Pratik Notlar:**
• Roma-Floransa-Venedik arası Trenitalia veya Italo hızlı tren önerilir
• Yoğun dönemlerde (Nisan-Ekim) müze biletlerini önceden satın alın
• İtalya vizesi iDATA üzerinden, 25-45 gün bekleme süresiyle
• Haziran öncesi veya Eylül sonrası fiyatlar ve kalabalık açısından daha elverişli
    `,
  },
  {
    id: "banka-hesabi-hazirlik",
    category: "Vize Rehberi",
    categoryColor: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    title: "Schengen Vizesi İçin Banka Hesabı Nasıl Hazırlanır?",
    excerpt:
      "Yeterli bakiye ne demektir, kaç aylık özet istenecek, ani büyük para girişi neden red sebebidir? Vize finansal hazırlığı için bilinmesi gereken her şey.",
    readTime: "4 dk",
    featured: false,
    content: `
Schengen vize başvurularında en sık red sebebi olan finansal yetersizlik, aslında doğru hazırlıkla kolaylıkla önlenebilir. İşte bilmeniz gerekenler:

**Ne Kadar Para Olmalı?**

Konsoloslukların genel beklentisi günlük 50-100€ karşılığı TL + konaklama masrafı + bilet maliyetidir. Pratik formül:
• (Kalınacak gün sayısı × 80€) + konaklama toplam + bilet fiyatı = Minimum görünmesi gereken bakiye
• Örnek: 10 günlük İtalya turu için (10×80€=800€) + (500€ otel) + (400€ bilet) = ~1.700€ → Yaklaşık 60.000-70.000 TL

Bu rakam hesabınızda görünmeli. Almanya için standart daha yüksektir; günlük 45-50€ + masraflar.

**Kaç Aylık Özet İstenir?**

• Çoğu ülke: Son 3 aylık hesap özeti
• Almanya, Litvanya: Son 6 aylık hesap özeti
• Banka kaşeli ve imzalı orijinal belge istenir

**Kesinlikle Yapılmaması Gerekenler:**

❌ Başvurudan hemen önce büyük nakit yatırma — Konsolosluklar bu hareketi "sahte bakiye" olarak yorumlar
❌ Birden fazla hesaptan küçük miktarları birleştirerek sunma — Hesap geçmişindeki düzensizlik şüphe yaratır
❌ Düzensiz gelir gösterimi — Maaş yerine arada bir gelen ödemeler yetersiz kabul edilir

**Yapılması Gerekenler:**

✅ En az 3 ay öncesinden hesabınızı aktif tutun ve düzenli işlem yapın
✅ Aylık düzenli gelir (maaş, kira geliri, serbest meslek ödemesi) görünür olsun
✅ Birden fazla banka hesabınız varsa hepsini belgeleyin
✅ Mümkünse banka kaşeli ve imzalı, apostilleli özet sunun
✅ Hesap özetini başvurudan en fazla 1 ay önce alın (güncel olmalı)

**Önemli Hatırlatma:**

Almanya vizesi için bu kurallar çok daha katı uygulanır. 6 aylık düzenli gelir akışı ve ani artış olmaması kritik öneme sahiptir. İlk Schengen başvurusu için finansal beklentilerin daha makul olduğu Yunanistan veya Malta önerilir.
    `,
  },
  {
    id: "butce-tatil-schengen",
    category: "Seyahat",
    categoryColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    title: "Schengen'de Bütçe Tatil: En Ekonomik Avrupa Destinasyonları 2026",
    excerpt:
      "Batı Avrupa fiyatlarına gerek yok — Polonya, Bulgaristan, Macaristan ve Çekya gibi ülkeler, Schengen vizesiyle en ekonomik Avrupa tatilini sunar.",
    readTime: "5 dk",
    featured: false,
    content: `
Schengen vizesi almak Batı Avrupa fiyatlarında tatil yapmak zorunda olduğunuz anlamına gelmez. Doğu Avrupa'daki Schengen ülkeleri, daha uygun maliyetlerle eşit derecede zengin bir kültürel deneyim sunar.

**Budapeşte, Macaristan 🇭🇺 — Orta Avrupa'nın Gizemi**
Tuna'nın iki yakasına yayılan başkent, UNESCO Dünya Mirası statüsündeki Buda Kalesi ve Parlamento Binası ile görkemlidir. Szechenyi Termal Hamamı'nda bir öğle saati, şehrin ruhunu hissettiren bir deneyimdir. İstanbul'dan yaklaşık 5.000-8.000 TL gidiş-dönüş bilet fiyatlarıyla erişilebilir. Günlük yaşam maliyeti Viyana veya Paris'in yarısı kadardır.

**Prag, Çekya 🇨🇿 — Orta Çağ'da Bir Öğleden Sonra**
Vltava Nehri kıyısındaki büyüleyici başkent, Orta Çağ'dan kalma yapılarla dolu Eski Şehir ve Charles Köprüsü ile sanki zaman durmuş hissiyatı yaratır. Çek biraları dünyaca ünlü; Staroměstské náměstí meydanındaki bar kültürü eşsizdir.

**Varşova ve Kraków, Polonya 🇵🇱 — Tarih ve Direniş**
Varşova, II. Dünya Savaşı'nın yıkımından yeniden doğan bir şehirdir. Kraków ise Wawel Kalesi ve Kazimierz semtiyle büyüleyicidir. Auschwitz-Birkenau Anıt Müzesi, Kraków'dan günübirlik ziyaret edilebilir; tarih bilincini derinden sarsar.

**Sofya ve Varna, Bulgaristan 🇧🇬 — Avrupa'nın En Ekonomik Schengen Ülkesi**
Bulgaristan, Avrupa'nın en düşük yaşam maliyetine sahip Schengen ülkeleri arasındadır. Sofya'da Alexander Nevski Katedrali ve Boyana Kilisesi görülmeli. Karadeniz kıyısı Varna ve Burgaz ise yaz aylarında plaj tatili için idealdir — hem daha uygun maliyetli hem daha az kalabalık.

**Bratislava, Slovakya 🇸🇰 — Viyana'nın Küçük Kardeşi**
Bratislava, Viyana'ya 60 dakika uzaklıktadır ve ikisi birlikte planlanabilir. Eski şehir ve kale gündüzleri, nehir kıyısı akşamları olmak üzere yoğun bir şekilde gezilebilir. Viyana biletleri aldıysanız Bratislava ekstra maliyetsizdir.

**Pratik İpuçları:**
• Bu ülkelerin uçuş biletleri İstanbul'dan çok daha uygun (3.000-8.000 TL arası gidiş-dönüş)
• Airbnb ve hostel seçenekleri Batı Avrupa'ya göre %40-60 daha ucuz
• Yemek, ulaşım ve aktivite maliyetleri çok daha düşük
• Vize başvurusu Slovakya (BLS), Macaristan (AS Visa) ve Polonya (VFS) için görece kolay ve hızlı
    `,
  },
];

// ── Article card (small) ──────────────────────────────────────────────────────

function ArticleCard({ article, index }: { article: typeof ARTICLES[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.07, 0.35) }}
      className="bg-[#111111] border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-200"
    >
      {/* Card header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 flex flex-col gap-3"
      >
        <div className="flex items-start justify-between gap-3">
          <span className={`inline-flex text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${article.categoryColor}`}>
            {article.category}
          </span>
          <div className="flex items-center gap-3 shrink-0 mt-0.5">
            <span className="flex items-center gap-1 text-[11px] text-white/25 font-light">
              <Clock size={10} />
              {article.readTime}
            </span>
            <ChevronDown
              size={15}
              className={`text-white/20 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        <h3
          className="text-lg font-semibold text-white/90 leading-snug tracking-tight text-left"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {article.title}
        </h3>
        <p className="text-sm text-white/40 font-light leading-relaxed text-left line-clamp-2">
          {article.excerpt}
        </p>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-white/6 pt-5">
              <div className="prose prose-sm prose-invert max-w-none">
                {article.content.trim().split("\n\n").map((para, i) => {
                  if (para.startsWith("**") && para.endsWith("**")) {
                    return (
                      <h4 key={i} className="text-white/80 font-semibold text-sm mt-4 mb-2">
                        {para.replace(/\*\*/g, "")}
                      </h4>
                    );
                  }
                  return (
                    <p key={i} className="text-white/45 font-light text-sm leading-relaxed mb-3">
                      {para.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                        part.startsWith("**") && part.endsWith("**")
                          ? <strong key={j} className="text-white/70 font-semibold">{part.replace(/\*\*/g, "")}</strong>
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

// ── Featured article ──────────────────────────────────────────────────────────

function FeaturedArticle({ article }: { article: typeof ARTICLES[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8 bg-gradient-to-br from-violet-500/8 via-[#111111] to-blue-500/5 border border-violet-500/15 rounded-2xl overflow-hidden"
    >
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-8 md:p-10">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span className={`inline-flex text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border ${article.categoryColor}`}>
              {article.category}
            </span>
            <span className="text-[10px] text-white/25 font-medium uppercase tracking-wider bg-white/5 border border-white/8 rounded-full px-2.5 py-1">
              Öne Çıkan
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1 text-xs text-white/25 font-light">
              <Clock size={11} />
              {article.readTime}
            </span>
            <ChevronDown
              size={16}
              className={`text-white/25 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        <h3
          className="text-2xl md:text-3xl font-semibold text-white leading-snug tracking-tight mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {article.title}
        </h3>
        <p className="text-base text-white/45 font-light leading-relaxed max-w-3xl">
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
            <div className="px-8 md:px-10 pb-8 border-t border-white/6 pt-6">
              <div className="max-w-3xl">
                {article.content.trim().split("\n\n").map((para, i) => {
                  if (para.startsWith("**") && para.endsWith("**")) {
                    return (
                      <h4 key={i} className="text-white/80 font-semibold text-base mt-6 mb-3">
                        {para.replace(/\*\*/g, "")}
                      </h4>
                    );
                  }
                  return (
                    <p key={i} className="text-white/50 font-light text-sm leading-relaxed mb-3">
                      {para.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                        part.startsWith("**") && part.endsWith("**")
                          ? <strong key={j} className="text-white/75 font-semibold">{part.replace(/\*\*/g, "")}</strong>
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

// ── Main component ────────────────────────────────────────────────────────────

export default function BlogSection() {
  const [featured, ...rest] = ARTICLES;

  return (
    <section id="blog" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-5">
            <BookOpen size={11} className="text-white/40" />
            <span className="text-xs text-white/40 font-light tracking-wider uppercase">Blog & Rehberler</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2
                className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Schengen Seyahati
                <br />
                <span className="italic">Rehberleri</span>
              </h2>
              <p className="text-white/35 font-light text-base mt-4 max-w-xl leading-relaxed">
                Vize başvurusundan tatil planlamasına, görülmesi gereken yerlerden bütçe ipuçlarına
                — Schengen seyahatinizi başarıya götürecek kapsamlı rehberler.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {["Vize Rehberi", "Seyahat", "Destinasyon"].map((cat) => (
                <span key={cat} className="text-xs text-white/30 border border-white/8 rounded-full px-3 py-1.5">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured article */}
        <FeaturedArticle article={featured} />

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
