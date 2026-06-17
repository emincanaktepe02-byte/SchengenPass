import { NextRequest, NextResponse } from "next/server";
import { MOCK_SIGNALS } from "@/lib/data";
import type { Signal } from "@/lib/types";

// In-memory store (would be a DB in production)
let signals: Signal[] = [...MOCK_SIGNALS];

export async function GET() {
  return NextResponse.json({ signals, updatedAt: new Date().toISOString() });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { secret, signal } = body;

    // Basic auth check
    if (secret !== process.env.SIGNAL_SECRET && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mark existing signal as inactive if it's the same country+center
    signals = signals.map((s) => {
      if (s.countryCode === signal.countryCode && s.center === signal.center && s.isActive && signal.isActive === false) {
        return { ...s, isActive: false, filledAt: new Date().toISOString() };
      }
      return s;
    });

    // Add new signal
    const newSignal: Signal = {
      id: `sig-${Date.now()}`,
      foundAt: new Date().toISOString(),
      ...signal,
    };

    signals = [newSignal, ...signals].slice(0, 50);

    // Send Telegram notification
    if (signal.isActive) {
      await sendTelegramNotification(newSignal);
    }

    return NextResponse.json({ ok: true, signal: newSignal });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

async function sendTelegramNotification(signal: Signal) {
  const token = process.env.TELEGRAM_BOT_TOKEN || "8897629079:AAFCt5qm18NBrhdbuoHPb3h16aE67_7NHYw";
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID || "1366850013";

  const message =
    `🚨 *YENİ VİZE RANDEVU SİNYALİ*\n\n` +
    `${signal.flag} *${signal.countryName}*\n` +
    `📍 Merkez: ${signal.center}\n` +
    `📋 Tür: ${signal.appointmentType}\n` +
    `🪑 Boş Slot: ${signal.slots}\n\n` +
    `⏰ Bulundu: ${new Date(signal.foundAt).toLocaleString("tr-TR")}\n\n` +
    `[VFS Global'e Git](https://visa.vfsglobal.com/tur/en/${signal.countryCode}/)`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
  } catch {
    console.error("Telegram notification failed");
  }
}
