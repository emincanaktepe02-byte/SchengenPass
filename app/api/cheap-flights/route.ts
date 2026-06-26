import { NextResponse } from "next/server";

// 24 saatte bir arka planda yenilenir (ISR).
// Vercel Edge bu süre boyunca tam yanıtı cache'ler — her istekte API çağrısı yapılmaz.
export const revalidate = 86400;

const TOKEN = process.env.TRAVELPAYOUTS_TOKEN;

const ORIGINS = [
  { code: "IST", city: "İstanbul" },
  { code: "SAW", city: "İstanbul (SAW)" },
  { code: "ESB", city: "Ankara" },
  { code: "ADB", city: "İzmir" },
];

const SCHENGEN: Record<string, { city: string; country: string; flag: string }> = {
  ATH: { city: "Atina",      country: "Yunanistan",  flag: "🇬🇷" },
  CDG: { city: "Paris",      country: "Fransa",       flag: "🇫🇷" },
  FCO: { city: "Roma",       country: "İtalya",       flag: "🇮🇹" },
  MAD: { city: "Madrid",     country: "İspanya",      flag: "🇪🇸" },
  BCN: { city: "Barselona",  country: "İspanya",      flag: "🇪🇸" },
  AMS: { city: "Amsterdam",  country: "Hollanda",     flag: "🇳🇱" },
  BER: { city: "Berlin",     country: "Almanya",      flag: "🇩🇪" },
  FRA: { city: "Frankfurt",  country: "Almanya",      flag: "🇩🇪" },
  MUC: { city: "Münih",      country: "Almanya",      flag: "🇩🇪" },
  VIE: { city: "Viyana",     country: "Avusturya",    flag: "🇦🇹" },
  PRG: { city: "Prag",       country: "Çekya",        flag: "🇨🇿" },
  BUD: { city: "Budapeşte",  country: "Macaristan",   flag: "🇭🇺" },
  LIS: { city: "Lizbon",     country: "Portekiz",     flag: "🇵🇹" },
  OPO: { city: "Porto",      country: "Portekiz",     flag: "🇵🇹" },
  ZRH: { city: "Zürih",      country: "İsviçre",      flag: "🇨🇭" },
  GVA: { city: "Cenevre",    country: "İsviçre",      flag: "🇨🇭" },
  CPH: { city: "Kopenhag",   country: "Danimarka",    flag: "🇩🇰" },
  ARN: { city: "Stockholm",  country: "İsveç",        flag: "🇸🇪" },
  HEL: { city: "Helsinki",   country: "Finlandiya",   flag: "🇫🇮" },
  BTS: { city: "Bratislava", country: "Slovakya",     flag: "🇸🇰" },
  TLL: { city: "Tallinn",    country: "Estonya",      flag: "🇪🇪" },
  RIX: { city: "Riga",       country: "Letonya",      flag: "🇱🇻" },
  VNO: { city: "Vilnius",    country: "Litvanya",     flag: "🇱🇹" },
  WAW: { city: "Varşova",    country: "Polonya",      flag: "🇵🇱" },
  KRK: { city: "Kraków",     country: "Polonya",      flag: "🇵🇱" },
  MLA: { city: "Malta",      country: "Malta",        flag: "🇲🇹" },
  SOF: { city: "Sofya",      country: "Bulgaristan",  flag: "🇧🇬" },
  OSL: { city: "Oslo",       country: "Norveç",       flag: "🇳🇴" },
  BRU: { city: "Brüksel",    country: "Belçika",      flag: "🇧🇪" },
  LJU: { city: "Ljubljana",  country: "Slovenya",     flag: "🇸🇮" },
  DBV: { city: "Dubrovnik",  country: "Hırvatistan",  flag: "🇭🇷" },
  SKG: { city: "Selanik",    country: "Yunanistan",   flag: "🇬🇷" },
  NCE: { city: "Nice",       country: "Fransa",       flag: "🇫🇷" },
  MXP: { city: "Milano",     country: "İtalya",       flag: "🇮🇹" },
  LUX: { city: "Lüksemburg", country: "Lüksemburg",   flag: "🇱🇺" },
};

// Ay+from'dan ay+to'ya kadar YYYY-MM listesi (bugünden itibaren)
function getMonthRange(from: number, to: number): string[] {
  const months: string[] = [];
  const now = new Date();
  for (let i = from; i <= to; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return months;
}

interface TpEntry {
  price?: number;
  airline?: string;
  departure_at?: string;
}

export interface FlightDeal {
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  destinationCountry: string;
  destinationFlag: string;
  price: number;
  departDate: string;
  airline: string | null;
  bookingUrl: string;
}

async function fetchCheapForMonth(
  originCode: string,
  month: string,
): Promise<Record<string, TpEntry>> {
  const url =
    `https://api.travelpayouts.com/v1/prices/cheap` +
    `?origin=${originCode}&depart_date=${month}&currency=try&show_to_affiliates=true&token=${TOKEN}`;
  try {
    const res = await fetch(url, {
      headers: { "Accept-Encoding": "gzip, deflate" },
      next: { revalidate: 86400 }, // 24h cache
    });
    if (!res.ok) return {};
    const json = (await res.json()) as {
      success: boolean;
      data?: Record<string, Record<string, TpEntry>>;
    };
    if (!json.success || !json.data) return {};

    // entry["0"] = en ucuz direkt uçuş per destinasyon
    const result: Record<string, TpEntry> = {};
    for (const [destCode, entries] of Object.entries(json.data)) {
      const entry = entries["0"];
      if (entry?.price && entry.price > 0) result[destCode] = entry;
    }
    return result;
  } catch {
    return {};
  }
}

export async function GET() {
  if (!TOKEN) {
    return NextResponse.json({ deals: [], error: "token_missing" });
  }

  const months = getMonthRange(1, 6); // ay+1 → ay+6

  // origin başına: 6 aylık verileri paralel çek, ardından en ucuzunu sakla
  const bestPerKey = new Map<string, FlightDeal>();

  await Promise.all(
    ORIGINS.map(async (origin) => {
      const monthResults = await Promise.all(
        months.map((m) => fetchCheapForMonth(origin.code, m)),
      );

      for (const monthData of monthResults) {
        for (const [destCode, entry] of Object.entries(monthData)) {
          const dest = SCHENGEN[destCode];
          if (!dest || !entry.price || !entry.departure_at) continue;

          const key = `${origin.code}-${destCode}`;
          const existing = bestPerKey.get(key);
          if (!existing || entry.price < existing.price) {
            bestPerKey.set(key, {
              originCode:          origin.code,
              originCity:          origin.city,
              destinationCode:     destCode,
              destinationCity:     dest.city,
              destinationCountry:  dest.country,
              destinationFlag:     dest.flag,
              price:               entry.price,
              departDate:          entry.departure_at,
              airline:             entry.airline ?? null,
              bookingUrl:
                `https://www.skyscanner.com.tr/transport/flights/` +
                `${origin.code.toLowerCase()}/${destCode.toLowerCase()}/`,
            });
          }
        }
      }
    }),
  );

  const allDeals = [...bestPerKey.values()].sort((a, b) => a.price - b.price);

  return NextResponse.json({
    deals:      allDeals.slice(0, 60),
    updatedAt:  new Date().toISOString(),
    dateRange:  { from: months[0], to: months[months.length - 1] },
  });
}
