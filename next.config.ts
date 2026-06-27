import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // Next.js inline scripts + Turnstile + GTM + Travelpayouts + Vercel Analytics
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.googletagmanager.com https://emrld.ltd https://va.vercel-scripts.com",
  // Tailwind/Framer Motion inline styles + Google Fonts
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  // GTM pixel tracking
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
  // API fetch + Turnstile + GTM + Vercel Analytics
  "connect-src 'self' https://challenges.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com https://*.vercel.live wss://*.vercel.live",
  // Turnstile challenge iframe + GTM noscript iframe
  "frame-src https://challenges.cloudflare.com https://www.googletagmanager.com",
  // Clickjacking önlemi (X-Frame-Options ile çift güvence)
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  // Tüm görseller lokal (/public) — dış hostname gerekmez
  images: {},

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // HSTS — HTTPS zorunluluğu (2 yıl, preload listesi)
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Clickjacking
          { key: "X-Frame-Options",           value: "SAMEORIGIN" },
          // MIME sniffing
          { key: "X-Content-Type-Options",    value: "nosniff" },
          // DNS prefetch
          { key: "X-DNS-Prefetch-Control",    value: "on" },
          // Referrer
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          // Gereksiz browser API erişimlerini kapat
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=(), payment=()" },
          // XSS / injection
          { key: "Content-Security-Policy",   value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
