/**
 * Prebuild/predev script — sonraki 40 gün içindeki ucuz Schengen uçuşlarını
 * Travelpayouts (Skyscanner affiliate) API'den çeker ve content/flights.json'a yazar.
 * Her ülkenin en çok turist çeken 2 şehri için en ucuz uçuşu bulur.
 * npm run dev / npm run build sırasında otomatik çalışır.
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../content/flights.json");

const token = process.env.TRAVELPAYOUTS_TOKEN;

if (!token) {
  console.log("⚠  TRAVELPAYOUTS_TOKEN not set — writing []");
  writeFileSync(OUT, "[]", "utf-8");
  process.exit(0);
}

const ORIGINS = [
  { code: "IST", city: "İstanbul" },
  { code: "SAW", city: "Sabiha Gökçen" },
  { code: "ESB", city: "Ankara" },
  { code: "ADB", city: "İzmir" },
];

// En çok turist çeken 2 şehir per takip edilen ülke
const COUNTRY_DESTINATIONS = [
  { country: "Yunanistan", flag: "🇬🇷", gradient: ["#0D5EAF", "#FFFFFF"],
    cities: [{ code: "ATH", name: "Atina" }, { code: "SKG", name: "Selanik" }] },
  { country: "Fransa", flag: "🇫🇷", gradient: ["#002395", "#ED2939"],
    cities: [{ code: "CDG", name: "Paris" }, { code: "NCE", name: "Nice" }] },
  { country: "İtalya", flag: "🇮🇹", gradient: ["#009246", "#CE2B37"],
    cities: [{ code: "FCO", name: "Roma" }, { code: "MXP", name: "Milano" }] },
  { country: "İspanya", flag: "🇪🇸", gradient: ["#AA151B", "#F1BF00"],
    cities: [{ code: "MAD", name: "Madrid" }, { code: "BCN", name: "Barselona" }] },
  { country: "Almanya", flag: "🇩🇪", gradient: ["#000000", "#DD0000"],
    cities: [{ code: "BER", name: "Berlin" }, { code: "MUC", name: "Münih" }] },
  { country: "Hollanda", flag: "🇳🇱", gradient: ["#AE1C28", "#21468B"],
    cities: [{ code: "AMS", name: "Amsterdam" }] },
  { country: "Avusturya", flag: "🇦🇹", gradient: ["#ED2939", "#FFFFFF"],
    cities: [{ code: "VIE", name: "Viyana" }] },
  { country: "Portekiz", flag: "🇵🇹", gradient: ["#006600", "#FF0000"],
    cities: [{ code: "LIS", name: "Lizbon" }, { code: "OPO", name: "Porto" }] },
  { country: "Hırvatistan", flag: "🇭🇷", gradient: ["#FF0000", "#0055A4"],
    cities: [{ code: "DBV", name: "Dubrovnik" }, { code: "ZAG", name: "Zagreb" }] },
  { country: "Çekya", flag: "🇨🇿", gradient: ["#D7141A", "#11457E"],
    cities: [{ code: "PRG", name: "Prag" }] },
  { country: "Macaristan", flag: "🇭🇺", gradient: ["#CE2939", "#436F4D"],
    cities: [{ code: "BUD", name: "Budapeşte" }] },
  { country: "Polonya", flag: "🇵🇱", gradient: ["#DC143C", "#FFFFFF"],
    cities: [{ code: "WAW", name: "Varşova" }, { code: "KRK", name: "Kraków" }] },
  { country: "İsviçre", flag: "🇨🇭", gradient: ["#CC0000", "#FFFFFF"],
    cities: [{ code: "ZRH", name: "Zürih" }, { code: "GVA", name: "Cenevre" }] },
  { country: "Belçika", flag: "🇧🇪", gradient: ["#000000", "#F9CC12"],
    cities: [{ code: "BRU", name: "Brüksel" }] },
  { country: "Malta", flag: "🇲🇹", gradient: ["#CF142B", "#FFFFFF"],
    cities: [{ code: "MLA", name: "Malta" }] },
  { country: "Bulgaristan", flag: "🇧🇬", gradient: ["#00966E", "#D62612"],
    cities: [{ code: "SOF", name: "Sofya" }, { code: "VAR", name: "Varna" }] },
  { country: "Romanya", flag: "🇷🇴", gradient: ["#002B7F", "#CE1126"],
    cities: [{ code: "OTP", name: "Bükreş" }] },
  { country: "Norveç", flag: "🇳🇴", gradient: ["#EF2B2D", "#003680"],
    cities: [{ code: "OSL", name: "Oslo" }, { code: "BGO", name: "Bergen" }] },
  { country: "İsveç", flag: "🇸🇪", gradient: ["#006AA7", "#FECC02"],
    cities: [{ code: "ARN", name: "Stockholm" }, { code: "GOT", name: "Göteborg" }] },
  { country: "Danimarka", flag: "🇩🇰", gradient: ["#C60C30", "#FFFFFF"],
    cities: [{ code: "CPH", name: "Kopenhag" }] },
  { country: "Finlandiya", flag: "🇫🇮", gradient: ["#003580", "#FFFFFF"],
    cities: [{ code: "HEL", name: "Helsinki" }] },
  { country: "Slovakya", flag: "🇸🇰", gradient: ["#FFFFFF", "#0B4EA2"],
    cities: [{ code: "BTS", name: "Bratislava" }] },
  { country: "Estonya", flag: "🇪🇪", gradient: ["#0072CE", "#1B4F91"],
    cities: [{ code: "TLL", name: "Tallinn" }] },
  { country: "Letonya", flag: "🇱🇻", gradient: ["#9E3039", "#FFFFFF"],
    cities: [{ code: "RIX", name: "Riga" }] },
  { country: "Litvanya", flag: "🇱🇹", gradient: ["#FDB913", "#006A44"],
    cities: [{ code: "VNO", name: "Vilnius" }] },
  { country: "Slovenya", flag: "🇸🇮", gradient: ["#003DA5", "#00A651"],
    cities: [{ code: "LJU", name: "Ljubljana" }] },
  { country: "Lüksemburg", flag: "🇱🇺", gradient: ["#EF3340", "#00A3E0"],
    cities: [{ code: "LUX", name: "Lüksemburg" }] },
];

// Sonraki 40 günün tarihlerini üret
function next40Days() {
  const dates = [];
  const now = new Date();
  for (let i = 1; i <= 40; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

// Ay bazında tarih grupla (API month-matrix için)
function monthsFromDates(dates) {
  const set = new Set(dates.map((d) => d.slice(0, 7)));
  return [...set];
}

async function fetchMonthPrices(origin, destination, month) {
  const url =
    `https://api.travelpayouts.com/v2/prices/month-matrix` +
    `?origin=${origin}&destination=${destination}&month=${month}` +
    `&currency=try&show_to_affiliates=true&token=${token}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const json = await res.json();
    if (!json.success || !json.data) return [];
    return Object.entries(json.data)
      .map(([date, info]) => ({ date, price: info.price ?? 0, airline: info.airline }))
      .filter((d) => d.price > 0);
  } catch { return []; }
}

console.log("✈  Fetching cheapest Schengen flights for next 40 days...");

const targetDates = new Set(next40Days());
const months = monthsFromDates([...targetDates]);
const deals = [];

for (const countryDest of COUNTRY_DESTINATIONS) {
  for (const city of countryDest.cities) {
    let best = null; // { price, origin, originCity, departDate, airline }

    for (const origin of ORIGINS) {
      const allPrices = [];
      for (const month of months) {
        const prices = await fetchMonthPrices(origin.code, city.code, month);
        allPrices.push(...prices);
      }
      // Only keep prices within next 40 days
      const filtered = allPrices.filter((p) => targetDates.has(p.date));
      if (filtered.length === 0) continue;

      const cheapest = filtered.reduce((a, b) => (a.price < b.price ? a : b));
      if (!best || cheapest.price < best.price) {
        best = {
          price: cheapest.price,
          originCode: origin.code,
          originCity: origin.city,
          departDate: cheapest.date,
          airline: cheapest.airline ?? null,
        };
      }
    }

    if (best) {
      deals.push({
        country: countryDest.country,
        flag: countryDest.flag,
        coverGradient: countryDest.gradient,
        city: city.name,
        destinationCode: city.code,
        originCity: best.originCity,
        originCode: best.originCode,
        price: best.price,
        departDate: best.departDate,
        airline: best.airline,
        bookingLink: `https://www.skyscanner.com.tr/transport/flights/${best.originCode.toLowerCase()}/${city.code.toLowerCase()}/${best.departDate.replace(/-/g, "")}/`,
      });
    }
  }
}

// Fiyata göre sırala
const sorted = deals.sort((a, b) => a.price - b.price);
writeFileSync(OUT, JSON.stringify(sorted, null, 2), "utf-8");
console.log(`✅  Wrote ${sorted.length} country deals to content/flights.json`);
