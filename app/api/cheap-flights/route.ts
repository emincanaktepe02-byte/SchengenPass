import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TOKEN = process.env.TRAVELPAYOUTS_TOKEN;

const ORIGINS = [
  { code: "IST", city: "İstanbul" },
  { code: "SAW", city: "İstanbul (SAW)" },
  { code: "ESB", city: "Ankara" },
  { code: "ADB", city: "İzmir" },
];

const SCHENGEN: Record<string, { city: string; country: string; flag: string }> = {
  ATH: { city: "Atina", country: "Yunanistan", flag: "🇬🇷" },
  CDG: { city: "Paris", country: "Fransa", flag: "🇫🇷" },
  FCO: { city: "Roma", country: "İtalya", flag: "🇮🇹" },
  MAD: { city: "Madrid", country: "İspanya", flag: "🇪🇸" },
  BCN: { city: "Barselona", country: "İspanya", flag: "🇪🇸" },
  AMS: { city: "Amsterdam", country: "Hollanda", flag: "🇳🇱" },
  BER: { city: "Berlin", country: "Almanya", flag: "🇩🇪" },
  FRA: { city: "Frankfurt", country: "Almanya", flag: "🇩🇪" },
  MUC: { city: "Münih", country: "Almanya", flag: "🇩🇪" },
  VIE: { city: "Viyana", country: "Avusturya", flag: "🇦🇹" },
  PRG: { city: "Prag", country: "Çekya", flag: "🇨🇿" },
  BUD: { city: "Budapeşte", country: "Macaristan", flag: "🇭🇺" },
  LIS: { city: "Lizbon", country: "Portekiz", flag: "🇵🇹" },
  ZRH: { city: "Zürih", country: "İsviçre", flag: "🇨🇭" },
  CPH: { city: "Kopenhag", country: "Danimarka", flag: "🇩🇰" },
  ARN: { city: "Stockholm", country: "İsveç", flag: "🇸🇪" },
  HEL: { city: "Helsinki", country: "Finlandiya", flag: "🇫🇮" },
  BTS: { city: "Bratislava", country: "Slovakya", flag: "🇸🇰" },
  TLL: { city: "Tallinn", country: "Estonya", flag: "🇪🇪" },
  RIX: { city: "Riga", country: "Letonya", flag: "🇱🇻" },
  VNO: { city: "Vilnius", country: "Litvanya", flag: "🇱🇹" },
  WAW: { city: "Varşova", country: "Polonya", flag: "🇵🇱" },
  MLA: { city: "Malta", country: "Malta", flag: "🇲🇹" },
  SOF: { city: "Sofya", country: "Bulgaristan", flag: "🇧🇬" },
  OSL: { city: "Oslo", country: "Norveç", flag: "🇳🇴" },
  BRU: { city: "Brüksel", country: "Belçika", flag: "🇧🇪" },
  LJU: { city: "Ljubljana", country: "Slovenya", flag: "🇸🇮" },
  DBV: { city: "Dubrovnik", country: "Hırvatistan", flag: "🇭🇷" },
};

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

export async function GET() {
  if (!TOKEN) {
    return NextResponse.json({ deals: [], error: "token_missing" });
  }

  const allDeals: FlightDeal[] = [];

  await Promise.all(
    ORIGINS.map(async (origin) => {
      try {
        const url =
          `https://api.travelpayouts.com/v1/prices/cheap` +
          `?origin=${origin.code}&currency=try&show_to_affiliates=true&token=${TOKEN}`;

        const res = await fetch(url, {
          headers: { "Accept-Encoding": "gzip, deflate" },
          next: { revalidate: 3600 },
        });

        if (!res.ok) return;

        const json = (await res.json()) as {
          success: boolean;
          data?: Record<string, Record<string, TpEntry>>;
        };

        if (!json.success || !json.data) return;

        for (const [destCode, entries] of Object.entries(json.data)) {
          const dest = SCHENGEN[destCode];
          if (!dest) continue;

          const entry = entries["0"];
          if (!entry?.price || entry.price <= 0 || !entry.departure_at) continue;

          allDeals.push({
            originCode: origin.code,
            originCity: origin.city,
            destinationCode: destCode,
            destinationCity: dest.city,
            destinationCountry: dest.country,
            destinationFlag: dest.flag,
            price: entry.price,
            departDate: entry.departure_at,
            airline: entry.airline ?? null,
            bookingUrl:
              `https://www.skyscanner.com.tr/transport/flights/` +
              `${origin.code.toLowerCase()}/${destCode.toLowerCase()}/`,
          });
        }
      } catch {
        // silently ignore per-origin errors
      }
    })
  );

  allDeals.sort((a, b) => a.price - b.price);

  return NextResponse.json({
    deals: allDeals.slice(0, 40),
    updatedAt: new Date().toISOString(),
  });
}
