import { NextResponse } from "next/server";
import { detectCheapFlights } from "@/lib/flightAnalysis";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.TRAVELPAYOUTS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "TRAVELPAYOUTS_TOKEN env var not set", deals: [] },
      { status: 200 }
    );
  }

  try {
    const deals = await detectCheapFlights(token);
    return NextResponse.json({ deals, updatedAt: new Date().toISOString() });
  } catch (err) {
    console.error("Flight analysis failed:", err);
    return NextResponse.json({ error: "Analysis failed", deals: [] }, { status: 200 });
  }
}
