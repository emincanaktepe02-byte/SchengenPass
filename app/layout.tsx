import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "schengenim.com — Artık Schengen'im var.",
  description:
    "Schengen vize başvurusu için ücretsiz rehber. Artık Schengen'im var. Randevu paylaşımları, uygun uçuş fırsatları ve 26 ülke için detaylı başvuru bilgileri. Bot yok, scraping yok.",
  keywords: "schengen vize, schengen vize rehberi, schengenim, vfs global türkiye, fransa vize, yunanistan vize randevu, uygun uçuş",
  openGraph: {
    title: "schengenim.com — Artık Schengen'im var.",
    description: "Randevu paylaşımları, ucuz uçuşlar ve 26 ülke başvuru rehberi. Tamamen ücretsiz.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full bg-black">
        {children}
        {/* Travelpayouts Drive — domain doğrulaması ve affiliate attribution */}
        <Script
          src="https://emrld.ltd/NTQxMjk0.js?t=541294"
          strategy="afterInteractive"
        />
        <Analytics />
      </body>
    </html>
  );
}
