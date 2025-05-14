import { NextResponse } from 'next/server';
import connectDB from "@/lib/db";
import { movie } from "@/models/movies";
import { Screening } from "@/models/Screening";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  await connectDB();

  const foundMovie = await movie
    .findOne({ slug: resolvedParams.slug })
    .lean() as { _id: string };

  if (!foundMovie) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const screenings = await Screening.find({ movieId: foundMovie._id }).lean();

  return NextResponse.json({ movie: foundMovie, screenings });
}
