import { NextResponse } from "next/server";
import { openHour } from "@/models/openhours";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    const open = await openHour.find();
    return NextResponse.json(open);
  } catch (error) {
    console.error("Kunde inte hämta öppettider:", error);
    return new NextResponse("Internt serverfel", { status: 500 });
  }
}
