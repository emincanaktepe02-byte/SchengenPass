"use client";

import { AnimatedMarqueeHero } from "@/components/ui/hero-3";

// Önemli Schengen turistik yerleri — portre formatlı Unsplash görselleri
const TRAVEL_IMAGES = [
  // Paris - Eyfel Kulesi
  "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&h=800&fit=crop&q=80",
  // Santorini mavi kubbeler
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=800&fit=crop&q=80",
  // Roma - Kolezyum
  "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=800&fit=crop&q=80",
  // Amsterdam - kanallar
  "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&h=800&fit=crop&q=80",
  // Atina - Akropolis
  "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&h=800&fit=crop&q=80",
  // Prag - Eski Şehir
  "https://images.unsplash.com/photo-1517777766-17a46e6bb8cb?w=600&h=800&fit=crop&q=80",
  // Viyana - Schönbrunn Sarayı
  "https://images.unsplash.com/photo-1549813069-f95e44d7f498?w=600&h=800&fit=crop&q=80",
  // Barselona - Sagrada Família
  "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=800&fit=crop&q=80",
  // Dubrovnik - Adriyatik surları
  "https://images.unsplash.com/photo-1555990793-da11153b9a71?w=600&h=800&fit=crop&q=80",
  // Lizbon - renkli tramvay
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&q=80",
  // Budapeşte - Parlamento
  "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=800&fit=crop&q=80",
  // Brugge - ortaçağ kanalları
  "https://images.unsplash.com/photo-1559060017-5df9e0a33e5d?w=600&h=800&fit=crop&q=80",
  // Floransa - Duomo
  "https://images.unsplash.com/photo-1543429257-3eb0b65d9c58?w=600&h=800&fit=crop&q=80",
  // Tallinn - ortaçağ surları
  "https://images.unsplash.com/photo-1558449907-5f0a0ffb4c58?w=600&h=800&fit=crop&q=80",
  // İsviçre Alpleri
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&q=80",
  // Mykonos - beyaz evler
  "https://images.unsplash.com/photo-1564518226462-fc5a36ea5b5a?w=600&h=800&fit=crop&q=80",
];

export default function Hero() {
  return (
    <AnimatedMarqueeHero
      tagline="Türkiye'nin Schengen Vize Rehberi · 2026"
      title={
        <>
          Schengen Vizesi
          <br />
          <span className="font-medium italic gradient-text">İçin Rehberiniz</span>
        </>
      }
      description="Onay oranları, CASCADE kademeleme, anlık uçuş fiyatları ve 26 ülke için detaylı başvuru rehberleri — tamamen ücretsiz, bot yok."
      ctaPrimary={{ label: "Ülke Rehberini Gör →", href: "#guide" }}
      ctaSecondary={{ label: "✈ Ucuz Uçuşlar", href: "#flights" }}
      images={TRAVEL_IMAGES}
      className="aurora-bg"
    />
  );
}
