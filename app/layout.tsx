import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SchengenPass — Vize Randevunuzu Otomatik Takip Edin",
  description:
    "VFS Global Türkiye merkezlerindeki 20 Schengen ülkesi randevularını 7/24 otomatik izler. Boşluk bulunduğu saniyede Telegram ile uyarır. Aracı firmalara binlerce lira vermeden vizeni al.",
  keywords: "schengen vize randevu, vfs global türkiye, fransa vize randevu, hollanda vize, schengen otomasyonu",
  openGraph: {
    title: "SchengenPass — Schengen Vize Randevusu Bulucu",
    description: "Aracı firmalara gerek yok. Otomatik sistem, boş randevuyu saniyeler içinde bulur.",
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
      <body className="min-h-full bg-black">{children}</body>
    </html>
  );
}
