import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // Next.js inline scripts + Turnstile + Travelpayouts affiliate + Vercel Analytics
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://emrld.ltd https://va.vercel-scripts.com",
  // Tailwind/Framer Motion inline styles + Google Fonts
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  // API fetch + Turnstile + Vercel Analytics
  "connect-src 'self' https://challenges.cloudflare.com https://va.vercel-scripts.com https://*.vercel.live wss://*.vercel.live",
  // Turnstile challenge iframe
  "frame-src https://challenges.cloudflare.com",
  // Clickjacking önlemi (X-Frame-Options ile çift güvence)
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
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
