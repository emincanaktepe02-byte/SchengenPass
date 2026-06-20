"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";

const ARTICLES = [
  {
    id: "schengen-vizesi-nasil-alinir",
    category: "Vize Rehberi",
    catClass: "text-sky-400/80 bg-sky-900/30 border-sky-700/25",
    title: "Schengen Vizesi Nasıl Alınır? 2026 Eksiksiz Rehber",
    excerpt: "Türkiye'den Schengen bölgesine seyahat için vize başvurusu nasıl yapılır, hangi belgeler gerekir, süreç ne kadar sürer? Adım adım, güncel bilgilerle.",
    featured: true,
    content: `
**Schengen Vizesi Nedir?**

Schengen Anlaşması'na taraf 29 ülke için tek bir vize yeterlidir. Alınan vize ile bu ülkelerin tamamında 180 günlük dönem içinde en fazla 90 gün kalınabilir. Turistik, iş, aile ziyareti veya transit amaçlı seyahatlerde zorunludur.

**Hangi Konsolosluğa Başvurulur?**

Birden fazla Schengen ülkesi planlanıyorsa, en uzun konaklama yapılacak ülkenin konsolosluğuna (veya yetkili vize merkezine) başvurulur. Süre eşitse, ilk giriş yapılacak ülke belirleyicidir.

**Gerekli Belgeler:**

• Geçerli pasaport — seyahat sonrasında en az 3 ay geçerli, son 10 yılda alınmış
• 2 adet biyometrik fotoğraf — son 6 ay içinde çekilmiş, beyaz arka planlı
• Eksiksiz doldurulmuş vize başvuru formu
• Seyahat sigortası — minimum 30.000€ teminat, tüm Schengen'i kapsayan
• Uçuş rezervasyonu — kesinleştirilmiş veya geçici rezervasyon belgesi
• Konaklama belgesi — otel rezervasyonu, Airbnb veya davet mektubu
• Banka hesap özeti — son 3-6 aya ait, düzenli gelir ve yeterli bakiye gösteren
• Gelir belgesi — iş sözleşmesi, maaş bordrosu veya vergi kaydı
• Türkiye'de ikamet belgesi — tapu, kira sözleşmesi veya ikametgah belgesi

**Başvuru Süreci Adım Adım:**

1. Seyahat planını netleştir: Hangi ülke, hangi tarihler, kaç gece?
2. Doğru vize merkezini seç: VFS Global, iDATA, Kosmos Vize, BLS International veya AS Visa Solutions
3. Online randevu al — yoğun ülkeler için 2-3 ay öncesinden
4. Belgeleri eksiksiz hazırla ve dosyalama sırasını kontrol et
5. Randevu günü merkeze git, parmak izi ve fotoğraf ver
6. Başvuru sonucunu bekle: ortalama 10-15 iş günü
7. Vizeyi al ve seyahat et

**2026 Vize Maliyeti:**

Standart Schengen vize ücreti 90€ + vize merkezi hizmet bedeli 25-35€ = kişi başı yaklaşık 115-125€. Döviz kuru farkını hesaba katmak için başvuru öncesi güncel kuru kontrol edin.

**İlk Başvuru Önerileri:**

İlk Schengen başvurusu için Yunanistan (Kosmos Vize, 3-7 gün), Malta (VFS, 7-10 gün), Estonya (VFS, 5-10 gün) veya Slovakya (BLS, 7-10 gün) önerilir. Bu ülkeler hem randevu kolaylığı hem de yüksek onay oranıyla öne çıkar.
    `,
  },
  {
    id: "vize-reddi-itiraz",
    category: "Vize Rehberi",
    catClass: "text-sky-400/80 bg-sky-900/30 border-sky-700/25",
    title: "Schengen Vize Reddi: İtiraz Nasıl Yapılır? Tekrar Başvuruda Doğru Yol",
    excerpt: "Vize reddedilince ne yapmalısın? Ret gerekçesi nasıl okunur, itiraz hakkı var mı, tekrar başvuruda başarı şansını nasıl artırırsın?",
    featured: false,
    content: `
**Ret Bildirimini Anlamak**

Schengen vize reddi, pasaportunuza yapıştırılan standart bir form ve yazılı ret gerekçesiyle bildirilir. Ret formunda işaretlenen kutucuklar, reddedilme nedenini gösterir:

• (A) Sahte/yanıltıcı belge — en ağır ret kategorisi
• (B) Seyahat amacı ispatlanamadı
• (C) Kalış koşulları yeterliliği ispatlanamadı
• (D) 90/180 günü aşacak kalış planı
• (E) Giriş yasağı/kara liste
• (F) Halk düzeni ve güvenlik

**Sıkça Ret Gerekçeleri:**

Türkiye'den yapılan başvurularda en yaygın ret nedenleri: yetersiz banka bakiyesi veya düzensiz gelir, Türkiye'ye geri dönüş bağının ispatlanamaması, eksik belgeler, seyahat amacının tutarsızlığı ve ülke notlarının çelişmesidir.

**İtiraz Hakkı Var Mı?**

Evet. Fransa, Almanya, Belçika ve İspanya'ya yapılan başvurularda ret karşı itiraz hakkı tanınır. İtiraz süresi ve yöntemi her ülkeye göre farklılık gösterir:

• Fransa: 2 ay içinde İdare Mahkemesi'ne
• Almanya: 1 ay içinde yetkili konsolosluğa yazılı itiraz
• Belçika: 30 gün içinde Yabancılar Ofisi'ne

İtiraz süreçleri uzun ve belirsizdir. Çoğu durumda doğrudan tekrar başvuru çok daha pratiktir.

**Tekrar Başvuruda Dikkat Edilecekler:**

Bekleme süresi yoktur — hemen tekrar başvurabilirsiniz. Ancak ret gerekçesini çözmeden başvurmak ikinci redde yol açar. Önceki reddi göz ardı etmeyin; yeni başvurunuzda onu ele aldığınızı gösterin.

**Başarı Şansını Artıran Adımlar:**

Ret gerekçesine özel belgeler ekleyin. Banka özetini güçlendirin (en az 3 aylık düzenli gelir görünmeli). Türkiye bağını belgeleyin: iş sözleşmesi, tapu, araç ruhsatı, SGK kaydı. Seyahat amacını detaylı anlatan bir niyet mektubu yazın.

**Farklı Ülkeye Başvurmayı Düşünün:**

Eğer seyahat rotanız esnek ise, ret aldığınız ülke yerine randevusu daha kolay ve onay oranı daha yüksek bir Schengen ülkesine başvurmak mantıklıdır.
    `,
  },
  {
    id: "ispanya-vize-rehberi",
    category: "Vize Rehberi",
    catClass: "text-sky-400/80 bg-sky-900/30 border-sky-700/25",
    title: "İspanya Schengen Vizesi: 2026 Başvuru Rehberi ve İpuçları",
    excerpt: "Barselona, Madrid, Endülüs — İspanya için Schengen vizesi nasıl alınır? Başvuru merkezi, belgeler, süreler ve sık yapılan hatalar.",
    featured: false,
    content: `
**İspanya Vize Merkezi**

Türkiye'deki İspanya Schengen vize başvuruları VFS Global üzerinden yürütülmektedir. İstanbul, Ankara ve İzmir'de merkezler bulunmaktadır.

**Bekleme Süresi**

İspanya başvuruları ortalama 15-25 iş günü sürmektedir. Yaz sezonu (Mayıs-Eylül) öncesinde randevu almak zorlaşır; en az 6-8 hafta öncesinden başvurmanız önerilir. 180 günlük başvuru penceresi açıldığı gün randevu almak en sağlıklı stratejidir.

**Zorunlu Belgeler:**

• Geçerli pasaport (seyahat sonrası en az 3 ay geçerli)
• Biyometrik fotoğraf (son 3 ay içinde çekilmiş)
• İspanya için doldurulmuş Schengen vize formu
• Uçuş rezervasyonu (bilet değil, kesinleştirilmiş rezervasyon yeterli)
• Otel/konaklama belgesi
• Seyahat sigortası (minimum 30.000€)
• Son 3-6 aylık banka hesap özeti
• Gelir belgesi (maaş bordrosu, iş sözleşmesi veya serbest meslek belgesi)
• Türkiye'de ikamet/çalışma belgesi

**Reddedilme Riski Yüksek Durumlar:**

İspanya'nın özellikle dikkat ettiği noktalar: kısa süreli iş değişiklikleri, eş zamanlı birden fazla ülke seyahati planı, tutarsız otel seçimi ve yetersiz banka bakiyesidir. Barselona + Madrid + Portekiz + Fransa planı gibi yogun rotalar dikkat gerektirir.

**İpucu — Kış Sezonu:**

Ekim-Mart dönemi İspanya başvuruları için en uygun dönemdir. Hem randevu kolaylaşır hem de inceleme daha hızlı sonuçlanır. Kış döneminde İspanya'yı ilk Schengen ülkesi olarak tercih edenler yüksek onay oranı bildirmektedir.

**Barselona mı Madrid mi Önce?**

Başvuruda "en uzun konaklama yeri" İspanya olmalıdır. Eğer sadece Barselona veya sadece Madrid geziyorsanız, zaten İspanya'ya başvurmak zorundasınız. Karma bir Avrupa rotasında günleri hesaplayın.
    `,
  },
  {
    id: "amsterdam-seyahat-rehberi",
    category: "Destinasyon",
    catClass: "text-sky-300/70 bg-sky-900/30 border-sky-700/20",
    title: "Amsterdam'ı Keşfet: Hollanda'da 5 Günlük Seyahat Rehberi",
    excerpt: "Kanal evleri, müzeler, bisiklet kültürü ve Hollanda yemekleri — Amsterdam'a gitmeden önce bilmeniz gereken her şey.",
    featured: false,
    content: `
**Amsterdam'a Nasıl Gidilir?**

İstanbul'dan Amsterdam Schiphol Havalimanı'na günlük doğrudan uçuşlar mevcuttur. Uçuş süresi yaklaşık 3.5 saat. Havalimanından şehir merkezine tren ile 15 dakikada ulaşılır.

**Konaklama Bölgeleri:**

Jordaan semti kanallar ve butik oteller açısından en romantik seçenektir. De Pijp, genç dinamik atmosferiyle bütçe dostu seçenekler sunar. Leidseplein çevresinde müzelere yakın konumda orta segment oteller bulunur.

**Gün 1: Tarihî Kanallar ve Jordaan**

Vondelpark'ta sabah yürüyüşü, ardından Jordaan semtinde yerel kahvaltı. Öğleden sonra Westerkerk'i ziyaret edin ve Prinsengracht kanalı boyunca yürüyün. Anne Frank Evi için önceden online bilet almanız zorunludur.

**Gün 2: Dünya Müzeleri**

Rijksmuseum (Vermeer ve Rembrandt eserleri), Van Gogh Müzesi ve Stedelijk Modern Sanat Müzesi tek bir rotada ziyaret edilebilir. Üç müze için en az 1.5 gün ayırın.

**Gün 3: Tarih Müzesi ve Canal Tour**

Amsterdam Şehir Arşivi, yerel tarih için ilgi çekicidir. Öğleden sonra 1 saatlik tekne turu ile tüm kanalları görebilirsiniz. Albert Cuypmarkt'ta taze Hollanda ringa balığı ve stroopwafel deneyin.

**Gün 4: Haarlem Günübirlik**

Sadece 20 dakika trenle Haarlem şehrine gidin. Grote Kerk, Frans Hals Müzesi ve orta çağdan kalma sokaklarla Amsterdam'dan çok daha sakin bir Hollanda deneyimi sunar.

**Gün 5: Keukenhof veya Delft**

İlkbaharda (Mart-Mayıs) Keukenhof laleler bahçesi olağanüstüdür. Yaz veya sonbaharda Delft porselenlerinin anavatanı olan Delft şehrine gidin.

**Ulaşım İpuçları:**

OV-chipkaart (toplu taşıma kartı) alın — tram, metro ve otobüste kullanılır. Bisiklet kiralayabilirsiniz; şehir buna göre tasarlanmıştır. Ancak bisiklet yollarına dikkat edin, Amsterdam'da bisikletliler önceliklidir.
    `,
  },
  {
    id: "prag-seyahat-rehberi",
    category: "Destinasyon",
    catClass: "text-sky-300/70 bg-sky-900/30 border-sky-700/20",
    title: "Prag'da 4 Gün: Orta Çağ Büyüsünde Çekya Seyahat Planı",
    excerpt: "Vltava kıyısındaki masalsı şehir, Charles Köprüsü, Prag Kalesi ve bohem kafeleri — Prag'ı nasıl gezersiniz?",
    featured: false,
    content: `
**Neden Prag?**

Prag, İkinci Dünya Savaşı'ndan en az hasar gören Orta Avrupa başkentlerinden biridir. Bu sayede gotik, barok ve art nouveau mimarisini bir arada görebileceğiniz neredeyse bozulmamış bir tarihi kent sunmaktadır. Üstelik Batı Avrupa şehirlerine kıyasla önemli ölçüde daha ekonomiktir.

**Gün 1: Eski Şehir (Staré Město)**

Pazar yerine doğrudan giden tram ile başlayın. Saat başı çalışan Astronomik Saat'i (Orloj) izleyin. Eski Şehir Meydanı'nı gezdikten sonra Týn Kilisesi ve Jan Hus Anıtı'nı görün. Öğleden sonra Josefov (Yahudi Mahallesi) olağanüstü bir tarihi tur sunar.

**Gün 2: Prag Kalesi (Hradčany)**

Tram veya yürüyerek Hradčany tepesine çıkın. St. Vitus Katedrali, Altın Çıkmaz Sokak (Golden Lane), Eski Kral Sarayı ve Sv. Jiří Bazilikası'nı ziyaret edin. Şehrin panoramik manzarası için Hradčany'den aşağı bakın.

**Gün 3: Charles Köprüsü ve Malá Strana**

Gün doğumunda Charles Köprüsü'nde olun — turist olmadan fotoğraf çekme fırsatı nadir gelir. Köprü boyunca heykelleri inceleyin. Malá Strana semtinde Prag'ın en güzel kafelerini ve küçük kütüphanelerini keşfedin.

**Gün 4: Vyšehrad ve Nové Město**

Vyšehrad Kalesi, daha az bilinen ama manzarası Prag Kalesi'yle yarışan alternatif bir tepedir. Buradaki Ulusal Mezarlık'ta Dvořák ve Smetana gibi Çek kültür devlerini ziyaret edebilirsiniz. Václavské náměstí (Wenceslas Meydanı) ve Art Nouveau binalarıyla Nové Město'yu gezerek günü tamamlayın.

**Pratik Bilgiler:**

Çekya'nın para birimi Koruna'dır (CZK) — euro kabul etmez. ATM'den yerel para çekin. Mülkiyet değişiklikleri sebebiyle turistik mahalledeki restoran fiyatları Prag ortalamasının üzerindedir; araştırmanızı yapın. Ulaşım için günlük metro/tram kartı almanız yeterlidir.
    `,
  },
  {
    id: "vize-hatalari",
    category: "Vize Rehberi",
    catClass: "text-sky-400/80 bg-sky-900/30 border-sky-700/25",
    title: "Schengen Başvurusunda Yapılan 10 Kritik Hata ve Çözümleri",
    excerpt: "Başvurucuların tekrarlayan hatalarını bilmek, sizin için büyük avantaj sağlar. İşte en sık yapılan 10 hata ve her birinin çözümü.",
    featured: false,
    content: `
**1. Başvurudan Hemen Önce Büyük Nakit Yatırma**

Konsolosluklar, bankadaki paranın gerçekten size ait olup olmadığını ve bu tutarı seyahati karşılamak için uzun süredir bulundurduğunuzu doğrular. Başvurudan 1-2 hafta önce yapılan büyük para girişleri şüphe uyandırır.

**Çözüm:** En az 3 ay önce hesabınızı aktif ve dengeli tutun. Ani girişler yerine düzenli maaş yatışlarını gösterin.

**2. Eksik veya Yanlış Tarihli Sigorta**

Sigorta başlangıcının seyahat tarihiyle aynı olması şarttır. Seyahat tarihinden önce başlayan veya giriş-çıkış tarihlerini kapsamayan poliçeler anında reddedilir.

**Çözüm:** Seyahat günü dahil tüm Schengen günlerini kapsayan, 30.000€+ teminatlı poliçe alın.

**3. Çok Uzun veya Belirsiz Seyahat Planı**

"10 ülke 12 günde" tarzı programlar, hem planın gerçekçi olmadığını hem de en uzun konaklamanın nerede olduğunu belirsizleştirir.

**Çözüm:** Gerçekçi bir rota planlayın. Başvurduğunuz ülkede en az 3-4 gece konaklamayı belgeleyin.

**4. Konaklama Belgesinin Eksik Olması**

"Arkadaşımda kalacağım" yanıtı yeterli değildir. Onaylı otel rezervasyonu veya davet mektubu zorunludur.

**Çözüm:** İade edilebilir otel rezervasyonu yaptırın. Randevu tarihinizde elinizde olsun.

**5. Türkiye'ye Geri Dönüş Bağını İspatlayamamak**

Bu, en sık ret gerekçesidir. Konsolosluk, sizi Türkiye'ye çeken bağın ne olduğunu görmek ister.

**Çözüm:** İş sözleşmesi, tapu/kira, araç ruhsatı, öğrenci belgesi gibi belgeler hazırlayın.

**6. Mesleki Durumun Belirsizliği**

İşsizlik veya serbest çalışma, yanlış sunulunca şüphe uyandırır.

**Çözüm:** Serbest çalışanlar; vergi levhası, fatura/sözleşme örnekleri ve gelir özeti hazırlamalıdır.

**7. Çok Eski Pasaport Fotoğrafı Kullanımı**

Fotoğrafın 6 aydan eski olmaması gerekmektedir. Eski fotoğraf doğrudan ret sebebidir.

**Çözüm:** Başvurudan 1-2 hafta önce biyometrik standartlara uygun yeni fotoğraf çektirin.

**8. Yanlış Ülkeye Başvurma**

En uzun konaklamayı yapacağınız ülkeye başvurmak zorundasınız. "Fransa'dan giriyorum ama 7 günüm İtalya'da" senaryosunda İtalya'ya başvurmanız gerekir.

**Çözüm:** Tüm konaklama günlerinizi tek tek listeleyin ve en fazlasını belirleyin.

**9. Vize Formu Hataları**

Pasaport numarası, tarihler veya seyahat amacında yapılan hatalar gecikmeye veya rete yol açar.

**Çözüm:** Formu 2 kez kontrol edin. Türkiye'nin İngilizce adı Turkey değil Türkiye'dir — bazı formlar bunu soruyor.

**10. Randevuya Eksik Belgeyle Gitme**

Vize merkezleri, eksik belgeli dosyaları geri çevirir ya da ek ücretle belge göndermenizi ister.

**Çözüm:** VFS, iDATA veya Kosmos'un web sitesindeki güncel kontrol listesini başvuru öncesi gün gün takip edin.
    `,
  },
  {
    id: "almanya-vize-rehberi",
    category: "Vize Rehberi",
    catClass: "text-sky-400/80 bg-sky-900/30 border-sky-700/25",
    title: "Almanya Schengen Vizesi: iDATA ile Başvuru Rehberi 2026",
    excerpt: "Almanya titiz incelemesiyle bilinir ama CASCADE kuralını en tutarlı uygulayan ülkedir. İşte eksiksiz başvuru kılavuzu.",
    featured: false,
    content: `
**Almanya Başvuru Merkezi: iDATA**

Türkiye'deki Almanya Schengen vize başvuruları iDATA Vize Merkezi üzerinden yürütülmektedir. İstanbul, Ankara, İzmir ve Bursa'da merkezler bulunmaktadır. İstanbul merkezi genellikle yoğundur; alternatif şehirleri tercih edin.

**Bekleme Süresi ve Randevu**

Almanya başvuruları ortalama 25-45 iş gününde sonuçlanır. Randevu bulmak Yunanistan veya Malta'ya kıyasla daha zordur. Seyahat tarihinden en az 3 ay öncesinden başvurun.

**Almanya Neden Titizdir?**

Almanya, Schengen bölgesine en yüksek göç girişlerinden birini alan ülkedir. Bu nedenle vize incelemesi diğer ülkelere kıyasla daha kapsamlıdır. Ancak belgeleri güçlü başvurularda onay oranı %80 civarındadır.

**Zorunlu Belgeler:**

• Banka özeti: Son 6 ay (Almanya, 6 ay ister — diğer ülkeler 3 ay)
• Gelir belgesi: Net aylık gelir ve iş sözleşmesi
• Türkiye bağı: İş sözleşmesi + tapu/kira + SGK belgesi
• Seyahat planı: Almanya'da kalacağınız günlerin detaylı listesi
• Almanya içi ulaşım: Tren rezervasyonları veya araç kiralama belgesi

**CASCADE Avantajı**

Almanya, CASCADE kuralını Türkiye'den yapılan başvurularda en tutarlı uygulayan ülkedir. İlk Almanya vizenizi kurallara uygun kullandıktan sonra ikinci başvuruda 1 yıllık çok girişli vize alabilirsiniz. Üçüncü başvuruda 2 yıl, dördüncüde 5 yıl mümkündür.

**Almanya'da Gezilecek Yerler:**

Berlin: Brandenburger Tor, Holocaust Anıtı, Checkpoint Charlie. Münih: Marienplatz, Nymphenburg Sarayı, Englischer Garten. Hamburg: Speicherstadt, Reeperbahn, Miniatur Wunderland. Köln: Köln Katedrali ve Ren kıyısı. Nürnberg: Tarihi şehir merkezi ve Nazi belgeleme merkezi.

**İpucu:**

Almanya vizesi için özellikle güçlü ve ayrıntılı belge dosyası oluşturun. Niyet mektubu yazın ve gezmeyi planladığınız yerlerin listesini ekleyin. Konsolosluk personeli için her şeyin açık ve organize olması çok kritiktir.
    `,
  },
  {
    id: "portekiz-vize-rehberi",
    category: "Vize Rehberi",
    catClass: "text-sky-400/80 bg-sky-900/30 border-sky-700/25",
    title: "Portekiz Schengen Vizesi: Avrupa'nın En Esnek Ülkesi",
    excerpt: "Lizbon, Porto, Algarve — Portekiz'in hem düşük red oranı hem de CASCADE uyumu onu ideal bir Schengen başlangıcı yapıyor.",
    featured: false,
    content: `
**Neden Portekiz?**

Portekiz, Schengen ülkeleri arasında en esnek belge politikasına ve en yüksek onay oranlarından birine sahip ülkelerdendir. Düzenli seyahat geçmişi olmayan başvuru sahipleri için ideal bir başlangıç noktasıdır.

**Başvuru Merkezi: VFS Global**

Türkiye'deki Portekiz başvuruları VFS Global üzerinden yapılmaktadır. İstanbul merkezi ağırlıklı olarak kullanılır; randevu süresi 10-20 iş günü arasındadır.

**Avantajları:**

• Belge incelemesinde esneklik — eksik belge durumunda doğrudan red yerine açıklama talep edilebilir
• Düzenli seyahat eden başvurucular için çok girişli vize pratiği oldukça yaygındır
• CASCADE basamağını iyi yönetmesiyle bilinir

**Portekiz'de Gezilecek Yerler:**

Lizbon: Alfama semti ve 28 numaralı tram, Belém Kulesi ve Jerónimos Manastırı, Fado müziği dinlemek için Tasca do Chico. Porto: Ribeira (UNESCO kıyı mahallesi), Ponte Dom Luís, doğrudan Porto üreticilerinde port şarabı tatmak. Algarve: Ponta da Piedade'nin kayalık koyları, Sagres Burnu ve Avrupa kıtasının en batı noktası Cabo da Roca. Sintra: 40 dakika uzaklıktaki masal sarayları — Pena Sarayı mutlaka görülmeli.

**Bütçe ve Pratik:**

Portekiz, Batı Avrupa ülkeleri arasında yaşam maliyeti en düşük ülkelerden biridir. Lizbon ve Porto'da Airbnb seçenekleri zengindir. Ulaşım için metro ve tram oldukça kullanışlıdır.

**Başvuru Önerisi:**

İlk Schengen vizeniz için Portekiz güvenli bir seçim olabilir. Seyahat planınızı Lizbon veya Porto odaklı yapın, 5-7 gece konaklama planı tutarlılık sağlar.
    `,
  },
  {
    id: "freelancer-vize",
    category: "Vize Rehberi",
    catClass: "text-sky-400/80 bg-sky-900/30 border-sky-700/25",
    title: "Freelancer ve Serbest Meslek Sahipleri İçin Schengen Vizesi",
    excerpt: "Sabit bir işverenin olmadığı durumlarda vize almak zor görünebilir. Ama doğru belgelerle oldukça mümkün — işte yol haritası.",
    featured: false,
    content: `
**Neden Zor Görünür?**

Schengen konsoloslukları, başvurucunun seyahat sonunda ülkesine döneceğine dair güvence ister. Sabit bir işveren ve maaş bordrosu bunu çok kolay kanıtlar. Freelancer'lar ve serbest meslek sahipleri için bu kanıtı farklı yollarla sunmak gerekir.

**Temel Belgeler:**

• Vergi levhası / serbest meslek makbuzu — hâlâ aktif çalıştığınızı gösterir
• Son 12 aylık gelir beyanı / SGK bildirimi
• Müşteri sözleşme örnekleri (isim gizlenebilir)
• Ödeme geçmişini gösteren banka özetleri — ayda düzenli gelir girişi görünmeli
• Fatura ve sözleşme belgeleri — aktif proje yürüttüğünüzü kanıtlar
• Türkiye'de iş yerinizin adresi veya ev ofis belgesi

**Banka Özetinde Dikkat:**

Banka özetinizde aylık düzenli nakit girişleri görünmelidir. "Müşteri ödemesi", "fatura" veya "transfer" notları pozitif algılanır. Tek seferlik büyük girişler yerine düzenli küçük ödemeler tercih edilir.

**Niyet Mektubu Önemlidir:**

Serbest çalışanlara niyet mektubu neredeyse zorunludur. Mektupta şunları belirtin: hangi sektörde çalıştığınız, aktif müşteri sayınız, seyahat amacınızın tamamen turistik olduğu ve Türkiye'ye dönme nedeniniz (devam eden projeler, müşteriler, aile).

**Önerilen Ülkeler:**

İlk Schengen başvurusu için Yunanistan, Malta, Estonya veya Portekiz önerilir. Bu ülkeler serbest çalışanların belgelerine daha esnek yaklaşmaktadır.

**Dikkat Edilmesi Gerekenler:**

Banka özetinizde düzensiz gelir varsa bunu destekleyici belgelerle açıklayın. "Dijital göçebe" vizesi ile Schengen vize ziyaretini karıştırmayın — Schengen kısa süreli turist vizesidir, uzun süreli çalışma izni değildir.
    `,
  },
  {
    id: "ikinci-vize-cok-girisli",
    category: "Vize Rehberi",
    catClass: "text-sky-400/80 bg-sky-900/30 border-sky-700/25",
    title: "İkinci Schengen Vizesi: Çok Girişli Vize Nasıl Alınır?",
    excerpt: "CASCADE kuralı sayesinde ikinci başvurunuzda 1 yıllık çok girişli vize mümkün. Bunun için neye ihtiyacınız var?",
    featured: false,
    content: `
**İkinci Başvuruda Ne Değişir?**

İlk Schengen vizenizi hiçbir ihlal olmadan kullandıysanız, ikinci başvuruda çok girişli vize talep edebilirsiniz. AB Vize Kodu Madde 24/2 (CASCADE kuralı) bunu hukuken zorunlu kılar.

**İlk Vizeden Sonra Yapmanız Gerekenler:**

Birinci vizenizi kullandıktan hemen sonra şunları arşivleyin:
• Her giriş ve çıkıştaki pasaport damgaları
• Uçuş boarding pass'leri
• Otel faturaları ve check-in/check-out belgeleri
• Dönüş uçuş biletleri

Bu belgeleri ikinci başvuruya eklemeniz gerekecektir.

**İkinci Başvuruda Nasıl Talep Edilir?**

Vize başvuru formunda "İstenen Vize Türü" kısmına "Çok Girişli" yazın. Ek bir sayfaya veya niyet mektubuna: "AB Vize Kodu Madde 24/2 kapsamında önceki vizemi kurallara uygun kullandığım için çok girişli vize talep ediyorum" ifadesini ekleyin.

**Hangi Belgeler Eklenmeli?**

• Önceki Schengen vizesinin kopyası (tüm sayfalar)
• Tüm boarding pass'ler (gidiş + dönüş)
• Otel konaklamalarının belgeleri
• 90/180 gün hesabınızı gösteren çizelge (opsiyonel ama faydalı)

**Hangi Ülkeye Başvurmak Daha Kolay?**

İkinci başvuru için Almanya, Hollanda, Fransa ve İtalya CASCADE'i en tutarlı uygulayan ülkelerdir. Özellikle Almanya iDATA üzerinden yapılan ikinci başvurularda çok girişli vize oranı yüksektir.

**Ret Durumunda Ne Olur?**

CASCADE talebi reddedilirse ret formunda gerekçe yazmalıdır. Bu gerekçeye itiraz edebilirsiniz. Ancak pratikte doğru belgelerle yapılan ikinci başvurularda olumsuz yanıt nadir görülür.

**Altın Kural:**

İkinci başvuruda "neden çok girişli istiyorum" sorusuna somut bir yanıt verin: aile bağları, iş seyahatleri veya düzenli seyahat planları. Somut gerekçe olmadan talep zayıf kalır.
    `,
  },
  {
    id: "cocuklu-aile-vize",
    category: "Vize Rehberi",
    catClass: "text-sky-400/80 bg-sky-900/30 border-sky-700/25",
    title: "Çocuklu Aileler İçin Schengen Vizesi: Eksiksiz Belge Listesi",
    excerpt: "Çocuklarla Avrupa seyahati planlarken ek belgeler, velayet belgesi ve çocuk ücretleri konusunda bilmeniz gerekenler.",
    featured: false,
    content: `
**Çocuklar İçin Özel Gereksinimler**

Her çocuk için ayrı vize başvurusu yapılmalıdır. 18 yaş altı çocukların başvurularında standart belgeler dışında ek evraklar gerekir.

**Zorunlu Ek Belgeler:**

• Çocuğun nüfus cüzdanı veya pasaportu
• Doğum belgesi (Türkçe + apostilli resmi tercüme)
• Aile cüzdanı veya evlilik belgesi (apostilli)
• Okul belgesi (tatil döneminin dışındaki seyahatlerde)

**Tek Ebeveyn ile Seyahatte:**

Bu durum özellikle dikkatli yönetilmelidir. Diğer ebeveynin noterde onaylı muvafakatnamesi (apostilli, çevirisi ile) zorunludur. Muvafakatnamede: gidilecek ülke, tarihler ve eşlik edecek kişinin adı açıkça belirtilmelidir.

**Ayrılmış veya Boşanmış Ebeveynler:**

Mahkeme onaylı boşanma kararı ve velayet hakkını gösteren belge gereklidir. Velayet ortak ise her iki ebeveynin yazılı izni istenir.

**Çocuk için Vize Ücreti:**

6 yaş altı çocuklar için vize ücreti alınmaz. 6-12 yaş arası 45€, 12 yaş üstü 90€ vize ücreti uygulanır.

**Pratik Seyahat Önerileri:**

Ailelerin tercih ettiği destinasyonlar için şunlar önerilebilir:

• Yunanistan (Atina + Santorini): Kültür ve plaj kombinasyonu, Schengen'e kolay giriş
• Avusturya (Viyana): Çocuklara özel müzeler, güvenli metro ağı
• Hollanda (Amsterdam): Bisiklet kültürü, çocuk dostu müzeler
• Çekya (Prag): Tarihi kaleler ve saraylar, uygun maliyetli tatil

**Bebek ve Küçük Çocukla:**

Biyometrik fotoğraf en başta sorun yaratabilir — bebeğin beyaz arka plana karşı gözleri açık fotoğrafı çekmek zor olabilir. VFS Global bazı merkezlerde bu fotoğrafı merkez içinde çekmektedir; önceden sormakta fayda var.
    `,
  },
  {
    id: "schengen-gorulecek-yerler",
    category: "Seyahat",
    catClass: "text-emerald-400/80 bg-emerald-900/25 border-emerald-700/20",
    title: "Schengen Bölgesinde Mutlaka Görülmesi Gereken 15 Yer",
    excerpt: "Paris'ten Dubrovnik'e, Santorini'den Prag'a — Schengen vizesiyle erişebileceğiniz Avrupa'nın en büyülü destinasyonları.",
    featured: false,
    content: `
**1. Atina, Yunanistan 🇬🇷**
Akropolis, Parthenon ve tarihi Plaka semtiyle insanlık tarihinin en önemli yapılarına ev sahipliği yapan Atina. Yunanistan randevu kolaylığıyla ilk Schengen için ideal.

**2. Paris, Fransa 🇫🇷**
Eyfel Kulesi, Louvre Müzesi, Notre-Dame Katedrali ve Montmartre. Dünyanın en çok ziyaret edilen şehri her mevsimde kendine özgü bir renk sunar.

**3. Roma, İtalya 🇮🇹**
Kolezyum, Vatikan Müzeleri, Trevi Çeşmesi ve Pantheon. "Ebedi Şehir"de her köşe başı tarihtir.

**4. Barselona, İspanya 🇪🇸**
Gaudí'nin Sagrada Família'sı, Park Güell ve Las Ramblas. Akdeniz iklimi ve kozmopolit atmosferiyle Avrupa'nın en canlı şehirlerinden biri.

**5. Amsterdam, Hollanda 🇳🇱**
Kanal evleri, Van Gogh Müzesi ve Rijksmuseum. Dünyanın en iyi planlanmış şehirlerinden biri.

**6. Prag, Çekya 🇨🇿**
Orta Çağ'dan kalma Eski Şehir ve büyüleyici Kale semti. İkinci Dünya Savaşı'ndan en az hasar gören Orta Avrupa başkenti.

**7. Viyana, Avusturya 🇦🇹**
Schönbrunn Sarayı, Opera Binası ve Belvedere Müzesi. Klasik müzik ve imparatorluk mirasının başkenti.

**8. Budapeşte, Macaristan 🇭🇺**
Tuna Nehri'ni ikiye bölen başkent, Buda Kalesi ve Parlamento Binası. Avrupa'nın en güzel bütçe destinasyonlarından biri.

**9. Lizbon, Portekiz 🇵🇹**
Yedi tepe üzerine kurulu, renkli tramvayları ve fado müziğiyle Avrupa'nın en otantik başkenti.

**10. Santorini, Yunanistan 🇬🇷**
Mavi kubbeli kiliseler, volkanik kayalıklar ve Oia'da gün batımı. Aklı durduran Ege manzarası.

**11. Floransa, İtalya 🇮🇹**
Uffizi Galerisi, Michelangelo'nun Davidi ve Ponte Vecchio. Rönesans'ın yaşayan kalbi.

**12. Tallinn, Estonya 🇪🇪**
Orta Çağ surlarıyla çevrili Eski Şehir — Baltık'ın sürpriz gizemi. İlk Schengen için hem kolay hem ödüllendirici.

**13. Brügge, Belçika 🇧🇪**
"Kuzey'in Venediki" olarak anılan bu küçük Ortaçağ kenti, film setinden çıkmış gibi durur.

**14. Oslo ve Fiyortlar, Norveç 🇳🇴**
Viking Müzesi, Vigeland Heykel Parkı ve kuzeyden fiyortlar. Norveç Schengen'in en pahalı ama en etkileyici destinasyonlarından biridir.

**15. Kopenhag, Danimarka 🇩🇰**
Nyhavn kanalı, Tivoli bahçeleri ve dünyanın en iyi restoranlarına ev sahipliği yapan Kuzey'in tasarım başkenti.
    `,
  },
  {
    id: "butce-tatil",
    category: "Seyahat",
    catClass: "text-emerald-400/80 bg-emerald-900/25 border-emerald-700/20",
    title: "Schengen'de Bütçe Tatil: En Ekonomik Avrupa Destinasyonları 2026",
    excerpt: "Polonya, Bulgaristan, Macaristan ve Çekya — Schengen vizesiyle en ekonomik Avrupa tatili seçenekleri.",
    featured: false,
    content: `
**Neden Doğu Avrupa?**

Doğu Avrupa Schengen ülkeleri, Batı komşularına kıyasla ortalama %40-60 daha uygun maliyetlidir. Üstelik bu ülkelerin tarihi, doğası ve gastronomi kültürü en az Paris veya Roma kadar zengindir.

**Budapeşte, Macaristan 🇭🇺**

UNESCO Dünya Mirası statüsündeki Buda Kalesi ve Parlamento Binası. Tuna kıyısında gün batımı Avrupa'nın en iyilerinden. Günlük yaşam maliyeti Viyana'nın yarısı. Ruin barlar ve termal banyolar benzersiz deneyimler sunar. Schengen başvurusu AS Visa Solutions üzerinden hızlıdır.

**Prag, Çekya 🇨🇿**

Vltava Nehri kıyısındaki Eski Şehir ve Charles Köprüsü. Çek mutfağı (svíčková, trdelník) ve yerel birası dünyaca ünlüdür. Prag, Avrupa'nın en fotojenik şehirlerinden biridir.

**Varşova ve Kraków, Polonya 🇵🇱**

Polonya, 2026'da Schengen'e tam üyelik için en yakın ülkelerden biri. Kraków'un Eski Şehri UNESCO listesindedir. Auschwitz-Birkenau Anıt Müzesi tarihi bir zorunluluktur. Varşova, savaştan yeniden doğmuş mimarisiyle ilgi çekicidir.

**Sofya ve Varna, Bulgaristan 🇧🇬**

Bulgaristan, Schengen alanındaki en düşük yaşam maliyetine sahip ülkedir. Sofya'da Alexander Nevski Katedrali ve Boyana Kilisesi görülmelidir. Varna ve Karadeniz kıyısı yaz aylarında alternatif bir plaj tatili sunar.

**Bratislava, Slovakya 🇸🇰**

Viyana'ya 60 dakika uzaklıktadır; iki şehir birlikte planlanabilir. Bratislava Kalesi ve Eski Şehir saatlerce dolaşılabilir. BLS International üzerinden başvurusu görece hızlıdır.

**Pratik İpuçları:**

Uçuş biletleri İstanbul'dan 3.000-8.000 TL arası gidiş-dönüş. Airbnb ve hostel seçenekleri Batı Avrupa'ya göre %40-60 daha ucuz. Yemek için yerel marketler ve halk restoranları bütçeyi ciddi düşürür.
    `,
  },
  {
    id: "banka-hazirlik",
    category: "Vize Rehberi",
    catClass: "text-sky-400/80 bg-sky-900/30 border-sky-700/25",
    title: "Schengen Vizesi İçin Banka Hesabı Nasıl Hazırlanır?",
    excerpt: "Yeterli bakiye ne demektir, kaç aylık özet istenecek, ani büyük para girişi neden red sebebidir? Her şey burada.",
    featured: false,
    content: `
**Hesapta Ne Kadar Para Olmalı?**

Yaygın kullanılan hesaplama formülü: (Kalınacak gün sayısı × 50-100€) + toplam konaklama ücreti + bilet fiyatı = minimum bakiye.

Örnek: 10 günlük Paris turu için → 10 × 80€ = 800€ + 1.200€ otel + 600€ bilet = 2.600€ (yaklaşık 90.000-95.000 TL)

**Ülkeye Göre Beklenen Asgari Bakiyeler:**

• Almanya: Günlük minimum 45€ × gün
• Fransa: Günlük 60-80€ × gün
• Yunanistan, Malta, Estonya: Günlük 40-60€ × gün

**Kaç Aylık Özet İstenir?**

Çoğu ülke son 3 aylık hesap özeti ister. Almanya ve Litvanya son 6 ay ister. Özetin başvurudan en fazla 1 ay öncesine ait olması gerekir.

**Yapılmaması Gerekenler:**

Başvurudan 2 hafta veya daha az önce hesabınıza büyük nakit yatırmayın. Bu, "başvuru için geçici güçlendirilmiş hesap" izlenimi uyandırır ve doğrudan ret sebebidir.

Birden fazla hesaptan küçük tutarları birikmiş gibi sunmayın. Tek bir aktif hesabın geçmişi çok daha güçlüdür.

**Yapılması Gerekenler:**

En az 3 ay öncesinden hesabınızı aktif tutun ve aylık düzenli gelir görünür olsun. Hesap özetinizi başvurudan en fazla 1 ay önce, tercihen 1-2 hafta önce alın. Özetin üst bilgisinde IBAN ve adınız açıkça görünmeli.

**Birden Fazla Hesabınız Varsa:**

En yüksek bakiyeli ve en düzenli gelir gösteren hesabı kullanın. Başka bir hesaptan büyük para transfer etmeyin — bu da şüphe yaratır.

**Döviz Hesabı Kullanabilir misiniz?**

Evet, döviz hesabındaki euro veya dolar bakiyesi kabul edilir. Bakiyenin türk lirasına yaklaşık karşılığını da belgeyle ekleyin.
    `,
  },
  {
    id: "yunanistan-adalari",
    category: "Destinasyon",
    catClass: "text-sky-300/70 bg-sky-900/30 border-sky-700/20",
    title: "Yunanistan Adaları: Schengen Vizesiyle Akdeniz'de Rüya Tatili",
    excerpt: "Santorini'nin mavi kubbeleri, Mykonos'un beyaz sokakları, Girit'in antik tarihi — hangi ada neyi sunar?",
    featured: false,
    content: `
**Neden Yunanistan İlk Seçim Olmalı?**

Yunanistan, Türkiye'den en kolay ulaşılan Schengen ülkesidir. 1.5 saatlik uçuş süresi, Kosmos Vize üzerinden 3-7 günlük hızlı işlem ve %86 onay oranı ile ilk Schengen başvurusu için ideal bir kombinasyon sunar.

**Santorini — Dünyanın En Ünlü Adası**

Kaldera'ya hakim konumuyla Santorini, Ege'nin en ikonik adalarından biridir. Oia köyündeki gün batımı, tüm seyahat listelerinde birinci sırada yer alır. Akrotiri Arkeoloji Müzesi, Bronz Çağı'ndan kalma olağanüstü bulgular sunar.

**Mykonos — Şıklık ve Eğlence**

Beyaz Cyclades mimarisi, renkli yel değirmenleri ve Little Venice mahallesiyle Mykonos hem gündüz hem gece canlıdır. Haziran-Ağustos fiyatları çok yüksektir; Mayıs veya Eylül daha ekonomiktir.

**Girit — Antik Tarih ve Doğa**

Knossos Sarayı, Minos Uygarlığı'nın merkezi olması nedeniyle arkeoloji tutkunları için bir zorunluluktur. Samaria Gorge trekking rotası Avrupa'nın en iyi yürüyüş güzergahlarından biridir. Hania ve Rethymno küçük Venedik etkileri taşıyan limanlarıyla keyiflidir.

**Rodos — Orta Çağ'ın Akdeniz Kalesi**

UNESCO Dünya Mirası statüsündeki Rodos Eski Şehri, Şövalyeler'in döneminden kalma surlarla çevrilidir. Lindos Akropolü, harikulade bir panorama sunar.

**Atina Baz Alarak Ada Gezisi:**

Atina + Santorini + Mykonos: Uçak veya feribot (4-6 saat) kombini mümkün. Atina + Girit: Girit daha büyük ve çeşitli, uçak ile 45 dakika.

**Pratik Bilgiler:**

İstanbul'dan Atina 1.5 saatlik uçuş, direk seferler mevcut. Haziran-Eylül yoğun sezon; Mayıs ve Ekim çok daha sakin ve ekonomik. Ferbot rezervasyonlarını önceden yapın — yaz aylarında dolup taşar.
    `,
  },
  {
    id: "italya-rotasi",
    category: "Destinasyon",
    catClass: "text-orange-400/70 bg-orange-900/20 border-orange-700/18",
    title: "İtalya'da 10 Günlük Schengen Rotası: Roma'dan Venedik'e",
    excerpt: "Kolezyum, Uffizi, kanallar ve Amalfi kıyısı — İtalya'nın en iyi destinasyonlarını kapsayan 10 günlük ideal rota planı.",
    featured: false,
    content: `
**Neden İtalya?**

İtalya, Schengen bölgesinin hem sanatsal hem gastronomik olarak en yoğun ülkesidir. Roma, Floransa, Venedik üçlüsü birlikte planlandığında birbirini tamamlayan olağanüstü bir seyahat sunar. Vize başvurusu iDATA üzerinden yapılmakta, ortalama 25-45 gün bekleme gerekebilmektedir.

**Gün 1-3: Roma — Ebedi Şehir**

Kolezyum ve Roma Forumu için giriş biletini önceden alın. Vatikan Müzeleri ve Sistine Şapeli zorunlu; kapasitesi sınırlı, sabah erken gitmeyi tercih edin. Trevi Çeşmesi'ne gece gidin — daha az kalabalık olur. Pantheon ücretsizdir.

**Gün 4-5: Floransa — Rönesans'ın Kalbi**

Roma'dan trenle 1.5 saat (Frecciarossa). Uffizi Galerisi, Botticelli'nin Venüs'ü ve Primavera için mutlaka gidin. Accademia Galerisi'nde Michelangelo'nun Davidi, Ponte Vecchio üzerinden yürüyüş.

**Gün 6: Cinque Terre — Renkli Kıyı Köyleri**

Floransa'dan günübirlik veya konaklama. Riomaggiore, Manarola, Corniglia, Vernazza, Monterosso — köyler arası yürüyüş rotası liman gömülü manzaralar sunar.

**Gün 7-8: Venedik — Kanalların Şehri**

Roma'dan veya Floransa'dan tren. Grand Canal boyunca vaporetto (su otobüsü), Piazza San Marco, Doge's Palace ve Murano Adası cam atölyeleri. Erken sabah şehir neredeyse boştur — saat 07:00'da çıkın.

**Gün 9-10: Milano veya Amalfi**

Milano: Katedralin çatısına çıkın, Leonardo'nun Son Akşam Yemeği için aylarca önceden rezervasyon şart. Galeria Vittorio Emanuele II. Amalfi alternatifi: Ravello ve Positano manzara şiiri.

**Pratik Notlar:**

Tren biletleri için Trenitalia veya Italo kullanın; erken alındığında çok daha ucuzdur. Müze biletleri için gezip.it veya resmi site yeterlidir — aracılar daha pahalıya satar.
    `,
  },
];

function renderContent(content: string) {
  return content.trim().split("\n\n").map((para, i) => {
    if (para.startsWith("**") && para.endsWith("**")) {
      return (
        <h4 key={i} className="text-[#F0EBE0]/70 font-semibold text-[15px] mt-5 mb-2 leading-snug">
          {para.replace(/\*\*/g, "")}
        </h4>
      );
    }
    return (
      <p key={i} className="text-[#F0EBE0]/45 font-light text-[14px] leading-[1.8] mb-3">
        {para.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
          part.startsWith("**") && part.endsWith("**")
            ? <strong key={j} className="text-[#F0EBE0]/65 font-medium">{part.replace(/\*\*/g, "")}</strong>
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
      viewport={{ once: true }} transition={{ delay: Math.min(index * 0.06, 0.4) }}
      className="card overflow-hidden hover:border-[#D4A843]/20 transition-all"
    >
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-6 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <span className={`inline-flex text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${article.catClass}`}>
            {article.category}
          </span>
          <ChevronDown size={14} className={`text-[#F0EBE0]/20 transition-transform duration-300 shrink-0 mt-0.5 ${expanded ? "rotate-180" : ""}`} />
        </div>
        <h3 className="serif text-[16px] font-semibold text-[#F0EBE0]/80 leading-snug tracking-tight text-left">
          {article.title}
        </h3>
        <p className="text-[14px] text-[#F0EBE0]/38 font-light leading-relaxed text-left line-clamp-2">
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
          <ChevronDown size={16} className={`text-[#F0EBE0]/22 transition-transform duration-300 shrink-0 ${expanded ? "rotate-180" : ""}`} />
        </div>
        <h3 className="serif text-2xl md:text-3xl font-semibold text-[#F0EBE0]/85 leading-snug tracking-tight mb-4">
          {article.title}
        </h3>
        <p className="text-[16px] text-[#F0EBE0]/42 font-light leading-relaxed max-w-3xl">
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
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? rest : rest.slice(0, 6);

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
              <p className="text-[#F0EBE0]/40 font-light text-[16px] mt-4 max-w-xl leading-relaxed">
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
          {displayed.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}
        </div>

        {rest.length > 6 && (
          <div className="flex justify-center mt-8">
            {!showAll ? (
              <button onClick={() => setShowAll(true)}
                className="flex items-center gap-2 border border-white/10 hover:border-[#D4A843]/30 text-[#F0EBE0]/40 hover:text-[#F0EBE0]/70 text-sm font-light px-8 py-3 rounded-full transition-all">
                Daha Fazla Göster
                <span className="text-xs text-[#D4A843]/50 font-medium">+{rest.length - 6} makale</span>
              </button>
            ) : (
              <button onClick={() => setShowAll(false)}
                className="text-sm text-[#F0EBE0]/25 hover:text-[#F0EBE0]/50 font-light transition-colors">
                Daha Az Göster ↑
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
