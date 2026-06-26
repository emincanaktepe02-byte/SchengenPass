export interface Attraction {
  name: string;
  description: string;
  type: "tarihi" | "müze" | "doğa" | "yemek" | "alışveriş" | "eğlence";
}

export interface CountryPageData {
  slug: string;
  code: string;
  name: string;
  flag: string;
  heroImage: string;
  heroCity: string;
  tagline: string;
  headline: string;
  intro: string;
  color: string;
  accentColor: string;

  travel: {
    bestTime: string;
    currency: string;
    language: string;
    budget: string;
    transport: string;
    climate: string;
    mustSee: Attraction[];
    localFood: { name: string; description: string }[];
    practicalTips: string[];
  };

  visa: {
    operator: string;
    operatorUrl: string;
    processingTime: string;
    avgWait: string;
    approvalRate: number;
    difficulty: "Kolay" | "Orta" | "Zorlu";
    cascadeFriendly: boolean;
    requirements: string[];
    bankRequirements: string;
    tips: string[];
    rejectionReasons: string[];
    centers: string[];
  };
}

export const COUNTRY_PAGES: CountryPageData[] = [
  // ── FRANSA ──────────────────────────────────────────────────────────────────
  {
    slug: "fransa",
    code: "fra",
    name: "Fransa",
    flag: "🇫🇷",
    heroImage: "/Paris.jpg",
    heroCity: "Paris",
    tagline: "Aşkın, sanatın ve lezzetin başkenti",
    headline: "Paris'te\nkahve içmek\nister misin?",
    intro:
      "Fransa, 90 milyonu aşan ziyaretçisiyle dünyanın en çok turist çeken ülkesi. Eyfel Kulesi'nden Loire vadisi şatolarına, Provence lavantalarından Riviera sahillerine uzanan bu ülke; tarih, gastronomi ve sanatı benzersiz bir harmanda sunar.",
    color: "#002395",
    accentColor: "#ED2939",

    travel: {
      bestTime:
        "Nisan–Haziran ve Eylül–Ekim: İklim dengeli, kalabalık az, fiyatlar makul. Yaz (Temmuz–Ağustos) Riviera için ideal ama Paris kalabalık ve sıcak. Kış Noel pazarları için Alsace bölgesi harikadır.",
      currency: "Euro (€)",
      language: "Fransızca — turistik bölgelerde İngilizce yaygın",
      budget:
        "Paris: günlük 80–150€ (orta segment). Güneyfransa taşra daha uygun. Müze geçişi için Paris Museum Pass (2–6 gün) değerlidir.",
      transport:
        "TGV hızlı trenleri şehirler arası en hızlı seçenek. Paris'te métro 1–14 hatla her yere ulaşır. Kiralık bisiklet (Vélib') şehir içi turlar için ideal.",
      climate:
        "Ilıman okyanus iklimi. Kuzey'de yağışlı ve serin; güney Fransa (Provence, Côte d'Azur) daha sıcak ve güneşli.",
      mustSee: [
        {
          name: "Eyfel Kulesi",
          description:
            "Paris'in simgesi, özellikle gece ışık gösterisi (saatin başında 5 dakika) eşsiz. Üst platforma erişim için önceden online bilet alın.",
          type: "tarihi",
        },
        {
          name: "Louvre Müzesi",
          description:
            "Dünyanın en büyük sanat müzesi. Mona Lisa, Venüs de Milo, Winged Victory. Sabah ilk giriş veya Cuma akşamları daha az kalabalık.",
          type: "müze",
        },
        {
          name: "Versailles Sarayı",
          description:
            "Paris'e 40 dk TER trenle. Bahçeler ücretsiz, saray için bilet gerekli. Çarşamba ve Cumartesi günleri müzik çeşmeleri gösterisi.",
          type: "tarihi",
        },
        {
          name: "Côte d'Azur",
          description:
            "Nice, Cannes, Monaco. Akdeniz güneşi, turkuaz sular, şık restoranlar. Temmuz–Ağustos için mümkünse erken rezervasyon.",
          type: "doğa",
        },
        {
          name: "Mont Saint-Michel",
          description:
            "Normandiya'da gelgitle adaya dönüşen tarihi manastır. Sabah çekilmesinde yürüyerek geçilebilir.",
          type: "tarihi",
        },
        {
          name: "Galeries Lafayette",
          description:
            "Paris'in efsanevi büyük mağazası. Lüks markalar, çatı terası ücretsiz; şehrin panoramik görüntüsü.",
          type: "alışveriş",
        },
      ],
      localFood: [
        {
          name: "Croissant & Pain au Chocolat",
          description: "Sabah kahvaltısı ritüeli — boulangerie'den taze alın",
        },
        {
          name: "Crêpes & Galettes",
          description: "Bretanya usulü; tatlı crepe veya tuzlu galette",
        },
        {
          name: "Escargot (Salyangoz)",
          description: "Tereyağı ve sarımsakla; Paris brasserie klasiği",
        },
        {
          name: "Coq au Vin",
          description:
            "Şarapta pişirilmiş tavuk — Fransız ev yemeğinin sembolü",
        },
        {
          name: "Crème Brûlée",
          description: "Karamel kaplı vanilyalı muhallebi, Fransız tatlı ikonu",
        },
        {
          name: "Fromage (Peynir)",
          description:
            "400+ çeşit peynir; Brie, Camembert, Roquefort mutlaka deneyin",
        },
      ],
      practicalTips: [
        "Birçok müze ilk Pazar ücretsiz (Louvre, Orsay, Versailles değil). Ocak–Mart tercih edin.",
        "Fransızlar merhaba demeden sipariş almaktan hoşlanmaz: 'Bonjour!' ile başlayın.",
        "Paris'te Navigo haftalık kart metro + RER + otobüs için ekonomik.",
        "Restoranda su ücretsiz isteyebilirsiniz: 'Une carafe d'eau, s'il vous plaît'",
        "Grevler (grève) sık olur; seyahat öncesi SNCF ve RATP uyarılarını takip edin.",
        "Val-d'Isère ve Chamonix için kayak sezonu Aralık–Mart.",
      ],
    },

    visa: {
      operator: "VFS Global",
      operatorUrl: "https://visa.vfsglobal.com/tur/en/fra/",
      processingTime: "10–15 iş günü",
      avgWait: "45–60 gün randevu bekleme",
      approvalRate: 72,
      difficulty: "Zorlu",
      cascadeFriendly: true,
      centers: ["İstanbul Şişli", "İstanbul Kadıköy", "Ankara", "İzmir"],
      requirements: [
        "Pasaport (seyahat sonrası min. 3 ay geçerli + boş sayfa)",
        "2 biyometrik fotoğraf (3.5×4.5 cm, beyaz fon)",
        "Eksiksiz doldurulmuş vize başvuru formu",
        "Seyahat sigortası (min. 30.000€, tüm Schengen geçerli)",
        "Uçuş rezervasyonu (gidiş-dönüş, bilet zorunlu değil)",
        "Otel/konaklama rezervasyonu (tüm geceleri kapsayan)",
        "Son 3 aylık banka hesap özeti",
        "Gelir belgesi (maaş bordrosu / vergi levhası / bilanço)",
        "İş sözleşmesi veya işveren yazısı",
        "Türkiye bağ belgesi (tapu / kira sözleşmesi / SGK)",
        "İzin belgesi (çalışıyorsanız işverenden)",
        "VFS hizmet ücreti dekontu",
      ],
      bankRequirements:
        "Son 3 aylık banka hesap özeti — her sayfa imzalı veya e-imzalı. Kişi başı günlük minimum 100€ karşılığı TL + tüm konaklama + bilet tutarı hesapta görünmeli. Ani büyük nakit girişleri şüphe uyandırır; düzenli maaş veya gelir akışı tercih edilir. Mümkünse apostille veya İngilizce bankacı tasdikli belge.",
      tips: [
        "Başvurudan en az 3 ay önceden randevu alın — Yaz/Noel dönemlerinde 4–5 ay önceden bakın.",
        "Gün gün detaylı seyahat planı (itinerary) hazırlayın: nerede, ne zaman, kaç gece.",
        "Konaklama rezervasyonunu iade edilebilir yaptırın; vize reddi durumunda iptal edebilirsiniz.",
        "Başvuru dosyasının her sayfasını kronolojik sıralayın, dosyalayın.",
        "Fransa CASCADE'i en tutarlı uygulayan ülkelerden biri: önceki Schengen vizelerinizi mutlaka ekleyin.",
        "Çalışmıyorsanız emeklilik belgesi, kira geliri veya banka mevduat faizi ile finansal gücü kanıtlayın.",
      ],
      rejectionReasons: [
        "Banka bakiyesi yetersiz veya ani artış var → 3+ ay önceden düzenli yatırım yapın",
        "Konaklama / uçuş rezervasyonu eksik ya da kesinleşmemiş → Onaylı rezervasyon belgesi sunun",
        "Türkiye bağ belgesi yetersiz → İş sözleşmesi + tapu/kira + SGK ekleyin",
        "Seyahat amacı veya güzergah belirsiz → Gün gün plan + otel adresleri hazırlayın",
        "Pasaport geçerlilik süresi yetersiz → Seyahat sonrası min. 3 ay geçerli olmalı",
        "Önceki vizede ihlal (süre aşımı) → Tüm çıkış damgaları ve boarding pass'ları ekleyin",
      ],
    },
  },

  // ── İTALYA ──────────────────────────────────────────────────────────────────
  {
    slug: "italya",
    code: "ita",
    name: "İtalya",
    flag: "🇮🇹",
    heroImage: "/Roma.jpg",
    heroCity: "Roma",
    tagline: "Ebedi şehirden Venedik kanallarına",
    headline: "Roma tatili mi\nplanlıyorsun?",
    intro:
      "İtalya, tarihin canlı olduğu bir açık hava müzesi. Roma'nın Kolezyum'undan Floransa'nın Renaissance sanatına, Venedik'in sihirli kanallarından Sicilya'nın eşsiz mutfağına kadar her köşesi ayrı bir keşif sunar.",
    color: "#009246",
    accentColor: "#CE2B37",

    travel: {
      bestTime:
        "Nisan–Mayıs ve Eylül–Ekim en ideal dönem: yoğunluk az, hava hoş. Temmuz–Ağustos Roma ve Floransa kavurucu ve çok kalabalık; kıyı ve adalar (Amalfi, Sardunya) bu dönemde popüler.",
      currency: "Euro (€)",
      language: "İtalyanca — Roma, Floransa, Venedik'te İngilizce yaygın",
      budget:
        "Günlük 70–130€ orta segment. Roma ve Floransa uygun seçenek bolken Venedik genel olarak %20–30 daha pahalı. Trenitalia veya Italo hızlı treni şehirler arası ekonomik.",
      transport:
        "Frecciarossa hızlı treni: Roma–Floransa 1.5 saat, Roma–Milano 3 saat. Venedik'te araç yok, vaporetto (su otobüsü) her yere ulaştırır. Roma'da metro 3 hat.",
      climate:
        "Kuzey İtalya (Milano, Venedik) ılıman kıta iklimi; kışı soğuk. Orta ve güney (Roma, Napoli) Akdeniz iklimi; yazlar sıcak ve kuru.",
      mustSee: [
        {
          name: "Kolezyum & Roma Forum",
          description:
            "MS 80 yılında inşa edilen gladyatör arenası. Kombineli bilet (Kolezyum + Forum + Palatino) önceden online alın; kuyruk 2+ saat olabilir.",
          type: "tarihi",
        },
        {
          name: "Vatikan Müzeleri & Sistine Şapeli",
          description:
            "Michelangelo'nun tavan freskiyle eşsiz. Sabah 8'de açılış, ilk 2 saat görece sakin. Önceden bilet şart.",
          type: "müze",
        },
        {
          name: "Venedik Kanalları & Gondol",
          description:
            "Venedik Büyük Kanalı'nda gondol (35€/30 dk). Kalabalıktan kaçmak için sabah erken veya kış aylarını tercih edin.",
          type: "tarihi",
        },
        {
          name: "Uffizi Galerisi (Floransa)",
          description:
            "Botticelli, Leonardo, Michelangelo eserleri. Dünyanın en önemli Rönesans koleksiyonu. Online bilet zorunlu.",
          type: "müze",
        },
        {
          name: "Amalfi Sahil Yolu",
          description:
            "Positano, Ravello, Amalfi kasabaları. SITA otobüs veya tekne ile gezilebilir. Temmuz–Ağustos yollar çok tıkanık.",
          type: "doğa",
        },
        {
          name: "Cinque Terre",
          description:
            "5 renkli köy, yürüyüş yolları ve tren. Cinque Terre kart günlük trenler ve yürüyüş için gerekli.",
          type: "doğa",
        },
      ],
      localFood: [
        {
          name: "Pizza Napoletana",
          description: "Napoli'den dünyaya yayılan ince ve yumuşak kenarlı pizza",
        },
        {
          name: "Carbonara",
          description:
            "Roma klasiği: yumurta, pecorino, guanciale — asla krema yok",
        },
        {
          name: "Gelato",
          description:
            "Gerçek dükkanlar 'artigianale' yazar; kaplara yığılmış dükkanlardan kaçının",
        },
        {
          name: "Risotto alla Milanese",
          description: "Milano'ya özgü safranla sararmış pirinç yemeği",
        },
        {
          name: "Tiramisù",
          description: "Venedik kökenli kahveli katmanlı tatlı, her restoranda farklı",
        },
        {
          name: "Arancini",
          description: "Sicilya'nın çıtır kızarmış pirinç topları",
        },
      ],
      practicalTips: [
        "İtalyan restoranlarında 'coperto' (örtü bedeli) 1–3€ tabak başı normal.",
        "Kilise ve katedrallere girmek için omuz + diz üstü kıyafet şart (şal bulundurun).",
        "Roma'da fontanellalardan ücretsiz içme suyu içilebilir.",
        "Venedik'te suya düşmek tehlikeli; kanallarda yüzmek yasak ve cezalı.",
        "Floransa'da Duomo ücretsiz ama kubbesi / çan kulesi biletli; online rezervasyon yapın.",
        "İtalya'da eczane (farmacia) yeşil haç işaretiyle belirlidir; yaygın ve güvenilir.",
      ],
    },

    visa: {
      operator: "iDATA",
      operatorUrl: "https://www.idata.com.tr/en/italy/",
      processingTime: "10–15 iş günü",
      avgWait: "45–90 gün randevu bekleme (yaz öncesi kritik)",
      approvalRate: 76,
      difficulty: "Orta",
      cascadeFriendly: true,
      centers: [
        "İstanbul Levent",
        "İstanbul Kadıköy",
        "Ankara",
        "İzmir",
        "Antalya",
        "Bursa",
      ],
      requirements: [
        "Pasaport (seyahat sonrası min. 3 ay + son 10 yıl içinde düzenlenmiş)",
        "2 biyometrik fotoğraf",
        "Vize başvuru formu (iDATA sistemi)",
        "Seyahat sigortası (min. 30.000€, tüm Schengen)",
        "Uçuş rezervasyonu (gidiş-dönüş)",
        "Konaklama belgesi",
        "Son 3 aylık banka ekstresi",
        "Gelir belgesi / vergi beyanı",
        "İstihdam belgesi",
        "Türkiye bağ belgesi",
      ],
      bankRequirements:
        "Son 3 aylık banka özeti (iDATA formatı tercih edilir). Günlük min. 50€ × gün sayısı + bilet + konaklama hesapta görünmeli. İtalya randevu yoğunluğu en yüksek ülkeler arasında; iDATA portalında randevuyu çok önceden takip edin.",
      tips: [
        "Yaz sezonu (Haziran–Ağustos) için en az 3 ay önceden randevu alın — iDATA portali sabah 9'da dolabilir.",
        "iDATA randevuları sık dolup boşalır; sabah ve gece yeni slot için portalı kontrol edin.",
        "İtalya CASCADE sistemini aktif uygular: önceki vizelerinizi ve seyahatlerinizi belgeleyin.",
        "Venedik için konaklama belgesi adres + rezervasyon numarası içermeli.",
        "Floransa, Napoli, Milano için ayrı ayrı adresleri seyahat planına ekleyin.",
        "Kıyı tatilinde (Amalfi, Cinque Terre) kiralık villa belgesi de kabul edilir.",
      ],
      rejectionReasons: [
        "Randevu çok geç alındı (yaz sezonu için) → 3–4 ay önceden başvurun",
        "iDATA özel belge formatı kullanılmadı → Portaldaki şablonları indirin",
        "Banka özeti düzensiz veya tutar yetersiz → 50€/gün × gün sayısı + rezervasyonlar",
        "Seyahat güzergahı çok belirsiz → Şehir şehir, gece gece plan yapın",
        "Seyahat sigortası Sicilya veya adaları kapsamıyor → Tüm İtalya dahil poliçe alın",
      ],
    },
  },

  // ── ALMANYA ─────────────────────────────────────────────────────────────────
  {
    slug: "almanya",
    code: "deu",
    name: "Almanya",
    flag: "🇩🇪",
    heroImage: "/Koln.jpg",
    heroCity: "Köln",
    tagline: "Rönesans şatolari, Oktoberfest ve mühendislik harikası",
    headline: "Almanya seni\nbekliyordu",
    intro:
      "Almanya, Avrupa'nın ekonomik kalbi ve kültür hazinesi. Bavyera dağlarından kuzey sahillerine, ortaçağ duvarlarıyla çevrili şehirlerden modern sanat galerilerine uzanan ülke; tarihin ve geleceğin iç içe geçtiği eşsiz bir destinasyon.",
    color: "#000000",
    accentColor: "#DD0000",

    travel: {
      bestTime:
        "Mayıs–Eylül: ılıman hava, açık hava etkinlikleri, Ren nehri turları. Ekim: Oktoberfest (Münih, Eylül sonu–Ekim başı). Aralık: Weihnachtsmarkt (Noel pazarları) — Köln, Nürnberg, Dresden efsanevi.",
      currency: "Euro (€)",
      language: "Almanca — büyük şehirlerde İngilizce çok yaygın",
      budget:
        "Günlük 60–120€ orta segment. Münih biraz daha pahalı, Leipzig ve Dresde uygun. Almanya Turu bilet (9€ ticket sona erdi; Deutsche Bahn Deutschlandticket 49€/ay hâlâ geçerli).",
      transport:
        "ICE hızlı trenleri şehirler arası mükemmel. Otoban araçla geziler için ideal. Büyük şehirlerde U-Bahn ve S-Bahn. Hamburg su otobüsü (Fähre) ücretsiz HVV biletinde dahil.",
      climate:
        "Ilıman kıta iklimi. Kuzey daha yağışlı ve soğuk; güney (Bavyera) soğuk kışlar ama yazlar hoş. İklim değişimleri hızlı, katmanlı giyinin.",
      mustSee: [
        {
          name: "Neuschwanstein Şatosu",
          description:
            "Bavyera Alplerindeki peri masalı şatosu; Walt Disney ilham almıştır. Füssen'den servis var. Bilet önceden online alın.",
          type: "tarihi",
        },
        {
          name: "Berlin Duvarı & Checkpoint Charlie",
          description:
            "Soğuk Savaş'ın sembolü. East Side Gallery (duvar üzerine sanat eserleri) ücretsiz. Topography of Terror Müzesi giriş ücretsiz.",
          type: "tarihi",
        },
        {
          name: "Köln Katedrali",
          description:
            "800 yılda tamamlanan Gotik başyapıt. Ren nehrine bakan kule tırmanışı (533 basamak) panoramik manzara sunar.",
          type: "tarihi",
        },
        {
          name: "Oktoberfest (Münih)",
          description:
            "Eylül sonu–Ekim başı 16 günlük bira festivali. Zelt (çadır) rezervasyonunu yıllar öncesinden yapın.",
          type: "eğlence",
        },
        {
          name: "Pergamon Müzesi (Berlin)",
          description:
            "Antik Pergamon Sunağı, Babil İştar Kapısı. Türk tarihi için özel önemi var. Online bilet şart.",
          type: "müze",
        },
        {
          name: "Romantische Strasse",
          description:
            "Würzburg'dan Füssen'e 350 km'lik ortaçağ şehirleri güzergahı. Rothenburg ob der Tauber en güzeli.",
          type: "doğa",
        },
      ],
      localFood: [
        {
          name: "Bratwurst",
          description: "Her bölgenin farklı tarifi olan ızgara sosis",
        },
        {
          name: "Currywurst",
          description: "Berlin sokak yemeği: dilimlenmiş sosis + köri sosu + ketçap",
        },
        {
          name: "Pretzel (Brezel)",
          description: "Tuzlu, çıtır hamur halkası; Bavyera kahvaltısının vazgeçilmezi",
        },
        {
          name: "Sauerbraten",
          description: "Sirke sosunda marine edilmiş et rosto; Ren bölgesi klasiği",
        },
        {
          name: "Schwarzwälder Kirschtorte",
          description: "Viyana usulü Kara Orman pastası; kiraz + krema + çikolata",
        },
        {
          name: "Weißwurst",
          description:
            "Münih sabah beyaz sucuğu — tatlı hardal ve pretzel ile 11:00'dan önce yenir",
        },
      ],
      practicalTips: [
        "Almanya'da süpermarketler Pazar kapalı; alışverişi Cumartesi yapın.",
        "Bahşiş kültürü var ama zorunlu değil; %5–10 memnuniyete göre.",
        "Toplu taşıma biletleri zaman damgalı; kontrol memurundan kaçınmayın (ceza 60€+).",
        "Yeşil ışık olmadan yayalar geçmez — trafik kuralları çok sıkı.",
        "Alman müzeleri çoğunlukla Pazartesi kapalı; ziyaret planını buna göre yapın.",
        "Nürnberg, Dresden, Freiburg kalabalığa göre daha sakin Almanya deneyimi sunar.",
      ],
    },

    visa: {
      operator: "iDATA",
      operatorUrl: "https://www.idata.com.tr/en/germany/",
      processingTime: "10–15 iş günü",
      avgWait: "30–60 gün randevu bekleme",
      approvalRate: 79,
      difficulty: "Orta",
      cascadeFriendly: true,
      centers: [
        "İstanbul Levent",
        "İstanbul Kadıköy",
        "Ankara",
        "İzmir",
        "Bursa",
        "Antalya",
        "Gaziantep",
      ],
      requirements: [
        "Pasaport (seyahat sonrası min. 3 ay geçerli)",
        "2 biyometrik fotoğraf",
        "iDATA başvuru formu (online doldurulmuş + imzalı)",
        "Seyahat sigortası (min. 30.000€)",
        "Uçuş rezervasyonu (gidiş-dönüş)",
        "Tüm gecelere ait konaklama belgesi",
        "Son 3–6 aylık banka hesap özeti",
        "Maaş bordrosu veya vergi levhası",
        "İşveren yazısı (izin belgesiyle birlikte)",
        "Türkiye bağ belgesi (gayrimenkul / kira / araç ruhsatı)",
        "Davet mektubu (iş/aile ziyaretinde)",
      ],
      bankRequirements:
        "Almanya en titiz belge incelemesini yapan Schengen ülkelerinden biri. Son 3 aylık banka özeti eksiksiz olmalı; ani para girişi kabul edilmez. Kişi başı günlük min. 50–100€ karşılığı + tüm rezervasyonların toplamı hesapta görünmeli. Maaşla birlikte işyeri SGK belgesi ve vergi levhası sunulması güçlü bir dosya oluşturur.",
      tips: [
        "Almanya CASCADE'i en tutarlı uygulayan ülkedir: ilk vizeni kurallara uygun kullan, 2.'de 1 yıl çok girişli çık.",
        "Belgelerinizi titizlikle hazırlayın: Almanya eksik belgede açıklama yerine red tercih eder.",
        "iDATA Almanya için ayrı bir kontrol listesi var; portaldan indirip her maddeyi işaretleyin.",
        "Türkiye'de kök belgelerini güçlendirin: birden fazla belge (tapu + araç + sigorta) şüpheyi azaltır.",
        "Oktoberfest dönemi (Eylül–Ekim) için 4–5 ay önceden başvurun; randevu çok dolar.",
        "İş ziyaretinde Almanya firması davet mektubu mutlaka gerekli.",
      ],
      rejectionReasons: [
        "Banka belgesi ani artış gösteriyor → 3+ ay önceden düzenli bakiye sağlayın",
        "Seyahat planı net değil (hangi şehir, kaç gece) → Ayrıntılı itinerary hazırlayın",
        "Türkiye'ye geri dönüş bağı zayıf → İş + mülk + aile belgelerini birlikte sunun",
        "Önceki vizeyi tam kullanmama veya süre aşımı → Tüm seyahat damgaları ve boarding pass'ları ekleyin",
        "iDATA özel belge sıralamasına uyulmadı → Portaldaki sıralamayı takip edin",
      ],
    },
  },

  // ── İSPANYA ─────────────────────────────────────────────────────────────────
  {
    slug: "ispanya",
    code: "esp",
    name: "İspanya",
    flag: "🇪🇸",
    heroImage: "/Barcelona.jpg",
    heroCity: "Barcelona",
    tagline: "Flamenco, Gaudí ve Akdeniz güneşi",
    headline: "Barcelona\nseni çağırıyor",
    intro:
      "İspanya, Avrupa'nın en canlı ve çeşitli ülkelerinden biri. Gaudí'nin mimarisiyle büyüleyen Barcelona'dan Moorish mirasıyla dolu Endülüs'e, tapas kültüründen La Tomatina festivaline; her şehir farklı bir dünya sunar.",
    color: "#AA151B",
    accentColor: "#F1BF00",

    travel: {
      bestTime:
        "Nisan–Haziran ve Eylül–Kasım: hava ideal, kalabalık orta düzey. Temmuz–Ağustos özellikle kıyı şeritleri (Costa Brava, Costa del Sol) çok kalabalık ve sıcak. Kış iç bölgeler için uygun; Madrid müze sezonu.",
      currency: "Euro (€)",
      language: "İspanyolca (Kastilya); Katalonya'da Katalanca yaygın",
      budget:
        "Günlük 60–110€ orta segment. Barcelona ve Madrid en pahalı şehirler; Endülüs (Sevilla, Granada, Córdoba) belirgin şekilde uygun. Menú del día (günlük öğle yemeği) 10–15€ — şarap dahil.",
      transport:
        "AVE hızlı treni Madrid–Barcelona 2.5 saat, Madrid–Sevilla 2.5 saat. Büyük şehirlerde metro ve otobüs. Ryanair/Vueling iç hatlar çok ucuz.",
      climate:
        "Kuzey (San Sebastián, Bilbao) yağışlı Atlantik iklimi. İç bölgeler (Madrid) karasal; yazlar sıcak, kışlar soğuk. Güney ve kıyı Akdeniz iklimi; uzun güneşli yazlar.",
      mustSee: [
        {
          name: "Sagrada Família",
          description:
            "Gaudí'nin 140 yıldır tamamlanmayan başyapıtı. Bilet online şart; özellikle tower tırmanışı için. 2026 tamamlanma hedefi.",
          type: "tarihi",
        },
        {
          name: "Alhambra (Granada)",
          description:
            "Nasrid Sarayları, Generalife bahçeleri — dünya mirasındaki Mağrip şaheseri. Online bilet aylarca önceden tükeniyor; sabah erken giriş.",
          type: "tarihi",
        },
        {
          name: "Prado Müzesi (Madrid)",
          description:
            "Goya, Velázquez, El Greco koleksiyonu. Her yıl 3.2 milyon ziyaretçi. Pazartesi hariç her gün açık.",
          type: "müze",
        },
        {
          name: "Park Güell",
          description:
            "Gaudí'nin Barcelona'ya hediyeliği rengarenk park. Anıtsal bölgeye giriş biletli; çevre yürüyüş alanları ücretsiz.",
          type: "doğa",
        },
        {
          name: "Barseloneta Plajı & Las Ramblas",
          description:
            "Barseloneta şehir plajı + Las Ramblas 1.2 km'lik yaya bulvarı. Yankesicilere dikkat; çantanızı önünüzde tutun.",
          type: "eğlence",
        },
        {
          name: "Mezquita (Córdoba)",
          description:
            "Cami–katedral dönüşümünün en çarpıcı örneği. Sabah namazı saatinde ücretsiz giriş (08:30–09:30).",
          type: "tarihi",
        },
      ],
      localFood: [
        {
          name: "Jamón Ibérico",
          description:
            "İberiko domuz jamonu — İspanya'nın en ikonik lezzeti; meşe palamutlu beslenmiş",
        },
        {
          name: "Paella",
          description:
            "Valencia'da deniz ürünlü, tavuklu veya karışık; gerçek paella öğlen yemeğidir",
        },
        {
          name: "Tapas",
          description:
            "Patatas bravas, croquetas, gambas al ajillo — bardan bara gezerek tapa turu",
        },
        {
          name: "Tortilla Española",
          description: "Yumurta ve patatesli kalın omlet; soğuk veya sıcak servis",
        },
        {
          name: "Churros con Chocolate",
          description:
            "Kızarmış hamur çubukları + koyu sıcak çikolata; sabah 7'de çikolaterías'ta",
        },
        {
          name: "Gazpacho",
          description: "Soğuk domates çorbası; Endülüs yazının vazgeçilmezi",
        },
      ],
      practicalTips: [
        "İspanya'da öğle siestası gerçek: 14:00–17:00 arası küçük dükkanlar kapalı olabilir.",
        "Akşam yemeği 21:00–22:00'da başlar; 20:00'da restoran boş.",
        "Flamenco gösterisi için Sevilla veya Granada'da gerçek tablao seçin; Barcelona'daki turistik.",
        "La Barceloneta'da sahil şeridinde içki içmek yasaklı; ceza 100€+.",
        "Granada'da Alhambra bileti birkaç ay önceden satılabiliyor; resmi siteden alın.",
        "Endülüs şehirleri (Sevilla, Córdoba, Granada) üçü birden 3–4 günde görülebilir.",
      ],
    },

    visa: {
      operator: "BLS International",
      operatorUrl: "https://blsspain-turkey.com/",
      processingTime: "10–15 iş günü",
      avgWait: "45–90 gün randevu bekleme (yaz sezonu kritik)",
      approvalRate: 74,
      difficulty: "Zorlu",
      cascadeFriendly: false,
      centers: [
        "İstanbul Şişli",
        "İstanbul Kadıköy",
        "Ankara",
        "İzmir",
        "Antalya",
      ],
      requirements: [
        "Pasaport (seyahat sonrası min. 3 ay geçerli + boş sayfa)",
        "2 biyometrik fotoğraf",
        "BLS başvuru formu (imzalı)",
        "Seyahat sigortası (min. 30.000€)",
        "Gidiş-dönüş uçuş rezervasyonu",
        "Tüm gecelere konaklama belgesi",
        "Son 3 aylık banka hesap özeti",
        "Maaş bordrosu veya vergi beyanı",
        "İşveren yazısı + izin belgesi",
        "Türkiye bağ belgesi",
      ],
      bankRequirements:
        "Son 3 aylık banka hesap özeti. Kişi başı günlük min. 65€ karşılığı + konaklama + bilet. BLS İspanya için ek olarak 'yeterli mali kaynak' beyanı isteyebilir. Yaz sezonu randevu krizi en çok İspanya'yı etkiler; 2–3 ay önceden takipte olun.",
      tips: [
        "Yaz tatili (Temmuz–Ağustos) için en az 3 ay önceden BLS portalını takip edin.",
        "İptal olan randevular sabah 8–9 ve gece 23–24'te sisteme düşer.",
        "Barcelona için Katalunya özelindeki aktivite planınızı ayrıntılandırın.",
        "Alhambra ziyareti planlıyorsanız biletinizi başvuruya ekleyin (erken rezervasyon güven verir).",
        "BLS İspanya yardımcı hizmetleri (ek ücretli) sunar; belge incelemesini kendiniz yapabilirsiniz.",
        "İspanya Konsolosluğu'nun Kapasite Kısıtlamaları nedeniyle randevu bulmak zor; alternatif şehirleri deneyin.",
      ],
      rejectionReasons: [
        "Yaz için randevu çok geç alındı → 3 ay önceden takibe başlayın",
        "Konaklama ve uçuş rezervasyonu tam kesinleşmemiş → Onaylı belgeler ekleyin",
        "Banka özeti yetersiz veya düzensiz → Minimum 65€/gün + rezervasyon tutarları",
        "Türkiye bağ belgesi zayıf → İş + mülk + aile birden sunun",
        "Seyahat planı Barselona–Madrid–Sevilla gibi karmaşık ama belgesiz → Tüm şehirlerde konaklama belgesi gerekli",
      ],
    },
  },

  // ── HOLLANDA ─────────────────────────────────────────────────────────────────
  {
    slug: "hollanda",
    code: "nld",
    name: "Hollanda",
    flag: "🇳🇱",
    heroImage: "/Amsterdam.jpg",
    heroCity: "Amsterdam",
    tagline: "Lale bahçeleri, bisiklet yolları ve kanallar",
    headline: "Amsterdam'da\nkaybolmak ister\nmisin?",
    intro:
      "Hollanda, dünyanın en bisiklet dostu ülkesi ve Avrupa'nın en toleranslı topluluklarından biri. Amsterdam'ın birbirine bağlı kanalları, Keukenhof'un renkli lale tarlalarından Delft'in mavi çiniciliğine kadar küçük ama şaşırtıcı zengin bir ülke.",
    color: "#AE1C28",
    accentColor: "#21468B",

    travel: {
      bestTime:
        "Nisan–Mayıs: lale sezonu (Keukenhof), hava hoş, kalabalık orta düzey. Haziran–Ağustos kanallar kalabalık ama canlı. Kış (Aralık) Amsterdam Işık Festivali harika.",
      currency: "Euro (€)",
      language: "Felemenkçe — İngilizce düzeyi Avrupa'nın en yükseklerinden",
      budget:
        "Günlük 80–140€ Amsterdam merkez. Rotterdam ve Lahey daha uygun. Müze kart (Museumkaart, 69.95€) 400+ müzeye ücretsiz giriş sağlar; 3+ müze ziyaret edecekseniz değerli.",
      transport:
        "Amsterdam Merkez'den tren ile tüm ülke 2–3 saatte ulaşılabilir. Bisiklet kiralama her köşede (10–15€/gün). OV-chipkaart toplu taşıma şarj kartı.",
      climate:
        "Deniz iklimi; ılıman ama yağışlı. Her mevsim yağmur olabilir — rüzgarlık ve katmanlı giyim şart. En güzel günler Nisan–Mayıs ve Haziran–Temmuz.",
      mustSee: [
        {
          name: "Anne Frank Müzesi",
          description:
            "Holokost döneminde Anne Frank'in saklandığı tarihi ev. Online bilet aylarca öncesinden tükeniyor; mutlaka önceden alın.",
          type: "müze",
        },
        {
          name: "Rijksmuseum",
          description:
            "Rembrandt, Vermeer ve Hollanda Altın Çağı koleksiyonu. Gece Devriyesi burada. Online bilet şart.",
          type: "müze",
        },
        {
          name: "Keukenhof (Lisse)",
          description:
            "Nisan–Mayıs'ta açık; 7 milyondan fazla çiçek. Amsterdam'dan trenle 40 dk. En güzel fotoğraflar sabah erken.",
          type: "doğa",
        },
        {
          name: "Amsterdam Kanalları",
          description:
            "Tekne turları (canal cruise) ile kanalları keşfedin; gece turları ışıklı. Bisikletle kendiniz de dolaşabilirsiniz.",
          type: "tarihi",
        },
        {
          name: "Van Gogh Müzesi",
          description:
            "Dünyanın en büyük Van Gogh koleksiyonu. Bilet önceden alınmalı; giriş zaman slotlu.",
          type: "müze",
        },
        {
          name: "Kinderdijk Yel Değirmenleri",
          description:
            "19 tarihi değirmen, UNESCO mirası. Rotterdam'dan feribot veya bisikletle ulaşılabilir.",
          type: "tarihi",
        },
      ],
      localFood: [
        {
          name: "Stroopwafel",
          description: "İnce waffle + karamel; kahvenin üstüne koyarak ısıtın",
        },
        {
          name: "Herring (Haring)",
          description:
            "Soğan + turşu ile çiğ tuzlanmış ringa; Hollanda sokak klasiği",
        },
        {
          name: "Bitterballen",
          description: "Kızarmış et kroket topları; bira ile mükemmel ikili",
        },
        {
          name: "Poffertjes",
          description:
            "Küçük puf puf karnıyarık gibi tatil; pudra şekeri + tereyağı",
        },
        {
          name: "Gouda Peyniri",
          description:
            "Şehrin kendisinden gelen sarı peynir; haftalık pazar (Gouda kaas markt)",
        },
        {
          name: "Erwtensoep",
          description: "Bezelye çorbası; kış aylarında sokaklarda satılan kalın çorba",
        },
      ],
      practicalTips: [
        "Bisiklet yollarında yürümek tehlikeli; şeritler katı — yayaların kendi şeridi var.",
        "Amsterdam'da konaklama pahalı; Haarlem veya Leiden'dan tren ile 20 dk mesafe.",
        "Hollanda'da pazarlık yapılmaz; fiyatlar belirli.",
        "Keukenhof için hafta içi sabah erken gelin; hafta sonu çok kalabalık.",
        "Gece müzesi etkinlikleri (Museumnacht, Nisan) için biletleri önceden alın.",
        "Rotterdam modern mimarisiyle ayrı bir Hollanda deneyimi sunar; gün turu değerli.",
      ],
    },

    visa: {
      operator: "VFS Global",
      operatorUrl: "https://visa.vfsglobal.com/tur/en/nld/",
      processingTime: "10–15 iş günü",
      avgWait: "40–55 gün randevu bekleme",
      approvalRate: 77,
      difficulty: "Orta",
      cascadeFriendly: true,
      centers: ["İstanbul Şişli", "Ankara", "İzmir"],
      requirements: [
        "Pasaport (seyahat sonrası min. 3 ay geçerli + boş sayfa)",
        "2 biyometrik fotoğraf",
        "VFS başvuru formu (online)",
        "Seyahat sigortası (min. 30.000€)",
        "Gidiş-dönüş uçuş rezervasyonu",
        "Konaklama belgesi",
        "Son 3 aylık banka hesap özeti (apostille önerilir)",
        "Maaş bordrosu / vergi beyanı",
        "İşveren yazısı",
        "Türkiye bağ belgesi",
        "Parmak izi kaydı (fiziksel başvuru zorunlu)",
      ],
      bankRequirements:
        "Son 3 aylık banka özeti — Hollanda titiz belge incelemesi yapar. Apostille veya bankacı imzalı resmi belge tercih edilir. Günlük min. 70–100€ karşılığı TL + rezervasyonların toplamı görünmeli. Parmak izi verisi 59 ay geçerli; bu sürede tekrar fiziksel başvuru gerekmez.",
      tips: [
        "Parmak izi kaydı zorunlu; VFS İstanbul veya Ankara'ya mutlaka fiziksel gidin.",
        "Apostille onaylı banka belgesi güven verir; bazı noter tasdikli belgeleri de sunum.",
        "Hollanda CASCADE uyumludur: önceki Schengen geçmişinizi belgeleyin.",
        "Keukenhof sezonu (Nisan–Mayıs) için en az 2 ay önceden randevu alın.",
        "Birden fazla ülke planlanıyorsa Hollanda en uzun konaklama ülkesiyse başvuru buraya yapılır.",
        "VFS Hollanda için giriş amacını net belirtin: turizm/iş/aile ayrı belgeler gerektirir.",
      ],
      rejectionReasons: [
        "Banka özeti düzensiz gelir veya ani artış gösteriyor → 3+ ay istikrarlı gelir akışı",
        "Apostille veya resmi tasdik eksik → Belgeleri noter onaylı sunun",
        "Parmak izi için fiziksel başvuru yapılmadı → VFS merkezine bizzat gidin",
        "Giriş amacı belgesi net değil (turizm/iş/aile ayrımı) → Amaca özel belgeler hazırlayın",
        "Parmak izi kaydı var ama 59 ay dolmuş → Yeniden fiziksel başvuru yapın",
      ],
    },
  },
];

export function getCountryPage(slug: string): CountryPageData | undefined {
  return COUNTRY_PAGES.find((c) => c.slug === slug);
}
