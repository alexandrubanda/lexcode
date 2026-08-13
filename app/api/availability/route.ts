import { type NextRequest, NextResponse } from "next/server";
import { getAvailableSlots, isWeekday } from "@/lib/google-calendar";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  if (!isWeekday(date)) {
    return NextResponse.json({ slots: [] });
  }

  try {
    const slots = await getAvailableSlots(date);
    return NextResponse.json({ slots: slots.map((s) => s.toISOString()) });
  } catch (err) {
    console.error("availability error:", err);
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 });
  }
}
