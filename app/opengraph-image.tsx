import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt     = "schengenim.com — Schengen Vize Rehberi";
export const size    = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #111111 0%, #1A1A1A 50%, #0D0D0D 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Altın üst çizgi */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #D4A843, #F0CC6A, #C89A35)",
        }} />

        {/* Büyük başlık */}
        <div style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#F0EBE0",
          lineHeight: 1.1,
          marginBottom: 20,
        }}>
          Artık Schengen&apos;im Var.
        </div>

        {/* Alt açıklama */}
        <div style={{
          fontSize: 26,
          color: "rgba(240,235,224,0.50)",
          fontWeight: 300,
          marginBottom: 48,
          maxWidth: 800,
          lineHeight: 1.4,
        }}>
          26 ülke rehberi · Randevu paylaşımları · Uygun uçuş fırsatları
        </div>

        {/* Alt logo bandı */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          <div style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#D4A843",
            letterSpacing: "-0.5px",
          }}>
            schengenim.com
          </div>
          <div style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "rgba(240,235,224,0.20)",
          }} />
          <div style={{
            fontSize: 20,
            color: "rgba(240,235,224,0.30)",
            fontWeight: 300,
          }}>
            Tamamen ücretsiz
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
