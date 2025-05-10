import { NextResponse } from "next/server";
import { movie } from "@/models/movies";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    const movies = await movie.find();
    return NextResponse.json(movies);
  } catch (error) {
    console.error("Kunde inte hämta filmer:", error);
    return new NextResponse("Internt serverfel", { status: 500 });
  }
}
