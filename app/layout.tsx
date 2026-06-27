import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const SITE_URL = "https://schengenim.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "schengenim.com — Artık Schengen'im var.",
  description:
    "Schengen vize başvurusu için ücretsiz rehber. Randevu paylaşımları, uygun uçuş fırsatları ve 26 ülke için detaylı başvuru bilgileri. Bot yok, scraping yok.",
  keywords: "schengen vize, schengen vize rehberi, schengenim, vfs global türkiye, fransa vize, yunanistan vize randevu, uygun uçuş",
  openGraph: {
    title: "schengenim.com — Artık Schengen'im var.",
    description: "Randevu paylaşımları, ucuz uçuşlar ve 26 ülke başvuru rehberi. Tamamen ücretsiz.",
    type: "website",
    url: SITE_URL,
    siteName: "schengenim.com",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "schengenim.com — Schengen Vize Rehberi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "schengenim.com — Artık Schengen'im var.",
    description: "Randevu paylaşımları, ucuz uçuşlar ve 26 ülke başvuru rehberi. Tamamen ücretsiz.",
    images: ["/opengraph-image"],
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NVRTK66Z');`,
          }}
        />
      </head>
      <body className="min-h-full bg-black">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NVRTK66Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://schengenim.com/#website",
                  "url": "https://schengenim.com",
                  "name": "schengenim.com",
                  "description": "Schengen vize başvurusu için ücretsiz rehber. Randevu paylaşımları, uygun uçuşlar ve 26 ülke başvuru bilgileri.",
                  "inLanguage": "tr",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://schengenim.com/#guide",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  "@id": "https://schengenim.com/#organization",
                  "name": "schengenim.com",
                  "url": "https://schengenim.com",
                  "description": "Türkiye'den Schengen ülkelerine vize başvurusu için bağımsız, ücretsiz rehber.",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "emincanaktepe02@gmail.com",
                    "contactType": "customer support",
                    "availableLanguage": "Turkish",
                  },
                },
              ],
            }),
          }}
        />
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
