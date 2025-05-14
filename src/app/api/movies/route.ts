import { NextResponse, NextRequest } from "next/server";
import { movie } from "@/models/movies";
import connectDB from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const movieTag = req.nextUrl.searchParams.get("tags");
    const movies = await movie.find({ tags: movieTag });
    return NextResponse.json(movies);
  } catch (error) {
    console.error("Kunde inte hämta filmer:", error);
    return new NextResponse("Internt serverfel", { status: 500 });
  }
}
