import { NextRequest, NextResponse } from "next/server";

// Webhook for Telegram bot updates
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message?.text) return NextResponse.json({ ok: true });

    const chatId = message.chat.id;
    const text = message.text;

    const token = process.env.TELEGRAM_BOT_TOKEN || "8897629079:AAFCt5qm18NBrhdbuoHPb3h16aE67_7NHYw";

    let reply = "";

    if (text === "/start") {
      reply =
        `Merhaba! 👋\n\nSchengenPass Randevu Bildirim Botuna hoş geldiniz.\n\n` +
        `Aktif paketiniz olduğunda buradan anlık randevu bildirimleri alırsınız.\n\n` +
        `📌 Komutlar:\n` +
        `/sinyaller — Aktif randevu sinyalleri\n` +
        `/yardim — Yardım menüsü`;
    } else if (text === "/sinyaller") {
      reply = `🔍 Güncel randevu sinyalleri için web sitemizi ziyaret edin:\nschengenpass.vercel.app`;
    } else if (text === "/yardim") {
      reply =
        `❓ *Yardım Menüsü*\n\n` +
        `• Randevu bildirimleri aktif paket sahiplerine otomatik gönderilir\n` +
        `• Sorun için: info@schengenpass.com\n` +
        `• Web site: schengenpass.vercel.app`;
    } else {
      reply = `Anlaşılmadı. /yardim yazarak komutları görebilirsiniz.`;
    }

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply,
        parse_mode: "Markdown",
      }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
