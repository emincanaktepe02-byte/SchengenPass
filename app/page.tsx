import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CountryShowcase from "@/components/CountryShowcase";
import AppointmentsSection from "@/components/AppointmentsSection";
import FlightsSection from "@/components/FlightsSection";
import CountryGuide from "@/components/CountryGuide";
import BlogSection from "@/components/BlogSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Schengen vizesi ne kadar sürede çıkar?", "acceptedAnswer": { "@type": "Answer", "text": "Schengen vizesi standart süre 15 iş günüdür (yaklaşık 3 hafta). Yunanistan ve Malta gibi ülkelerde 3-7 iş gününde sonuçlanabilir. Almanya ve Belçika süreçleri daha uzun sürebilir." } },
    { "@type": "Question", "name": "Hesabımda ne kadar para olmalı? Minimum bakiye nedir?", "acceptedAnswer": { "@type": "Answer", "text": "Genel beklenti: kalınacak gün × 50-100€ + konaklama tutarı + uçuş bedeli. Örnek: 10 günlük İtalya turu için yaklaşık 1.700€ (60.000-70.000 TL). Başvurudan kısa süre önce büyük nakit yatırmayın." } },
    { "@type": "Question", "name": "Schengen vizesi reddedilirse ne olur? Tekrar başvurabilir miyim?", "acceptedAnswer": { "@type": "Answer", "text": "Ret kararı pasaportunuza yapıştırılan bir etiketle bildirilir. Hemen tekrar başvurabilirsiniz — bekleme süresi yoktur. Ancak ret gerekçesini dikkate alarak eksik belgeleri tamamlamanız gerekir." } },
    { "@type": "Question", "name": "90/180 günlük kural nedir?", "acceptedAnswer": { "@type": "Answer", "text": "Herhangi bir 180 günlük zaman diliminde toplamda en fazla 90 gün Schengen bölgesinde kalabilirsiniz. Giriş ve çıkış günleri de bu 90 güne dahildir." } },
    { "@type": "Question", "name": "Hangi ülkeye başvurmalıyım?", "acceptedAnswer": { "@type": "Answer", "text": "En uzun konaklama yapacağınız ülkenin konsolosluğuna başvurun. Süre eşitse ilk giriş yaptığınız ülke belirleyicidir. İlk Schengen başvurusu için Yunanistan, Malta, Estonya veya Slovakya önerilir." } },
    { "@type": "Question", "name": "CASCADE kuralı nedir?", "acceptedAnswer": { "@type": "Answer", "text": "AB Vize Kodu Madde 24/2 kapsamında vizelerini kurallara uygun kullanan başvuru sahiplerine bir sonraki başvuruda daha uzun süreli vize verilmesi zorunludur. İlk vize → kısa süreli; 2. başvuru → 1 yıl çok girişli; 3. başvuru → 2 yıl; 4. başvuru → 5 yıl." } },
    { "@type": "Question", "name": "Schengen vizesi için hangi sigorta zorunlu?", "acceptedAnswer": { "@type": "Answer", "text": "Tüm Schengen ülkelerinde geçerli, minimum 30.000€ teminatlı seyahat sağlık sigortası zorunludur. Poliçe tüm Schengen bölgesini kapsamalı ve seyahat süresini eksiksiz kapsamalıdır." } },
    { "@type": "Question", "name": "Vize ücreti ne kadar?", "acceptedAnswer": { "@type": "Answer", "text": "2026 itibarıyla standart Schengen vize ücreti 90€ + vize merkezi hizmet bedeli 25-35€ = kişi başı yaklaşık 115-130€. Vize reddedilse dahi vize ücreti iade edilmez." } },
  ],
};

const HOWTO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Schengen Vizesi Nasıl Alınır? 2026 Eksiksiz Rehber",
  "description": "Türkiye'den Schengen bölgesine seyahat için vize başvurusu adım adım nasıl yapılır.",
  "inLanguage": "tr",
  "step": [
    { "@type": "HowToStep", "name": "Seyahat planını netleştir", "text": "Hangi ülke, hangi tarihler, kaç gece? Buna göre hangi konsolosluğa başvuracağınızı belirleyin." },
    { "@type": "HowToStep", "name": "Doğru vize merkezini seç", "text": "VFS Global, iDATA, Kosmos Vize, BLS International veya AS Visa Solutions arasından ülkenize göre doğru merkezi seçin." },
    { "@type": "HowToStep", "name": "Online randevu al", "text": "Yoğun ülkeler için 2-3 ay öncesinden randevu alın." },
    { "@type": "HowToStep", "name": "Belgeleri hazırla", "text": "Pasaport, biyometrik fotoğraf, seyahat sigortası (min. 30.000€), uçuş ve otel rezervasyonu, banka hesap özeti, gelir belgesi." },
    { "@type": "HowToStep", "name": "Randevu günü merkeze git", "text": "Parmak izi ve fotoğraf verin, dosyanızı teslim edin." },
    { "@type": "HowToStep", "name": "Sonucu bekle ve vizeyi al", "text": "Ortalama 10-15 iş günü. Vize onaylanırsa pasaportunuza yapıştırılır." },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(HOWTO_SCHEMA) }} />
      <Navbar />
      <Hero />
      <CountryShowcase />
      <AppointmentsSection />
      <FlightsSection />
      <CountryGuide />
      <BlogSection />
      <FAQ />
      <Footer />
    </main>
  );
}
