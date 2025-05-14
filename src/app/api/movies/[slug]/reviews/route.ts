import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { movie } from "@/models/movies";
import { review } from "@/models/reviews";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  await connectDB();

  const foundMovie = (await movie
    .findOne({ slug: resolvedParams.slug })
    .lean()) as { _id: string };

  if (!foundMovie) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
  }

  const reviews = await review.find({ movieId: foundMovie._id }).lean();

  return NextResponse.json({ reviews }, { status: 200 });
}

export async function POST(request: Request) {
  await connectDB();

  const body = await request.json();

  if (!body.movieId || !body.userName || !body.rating || !body.comment) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const newReview = await review.create({
      movieId: body.movieId,
      userName: body.userName,
      rating: body.rating,
      comment: body.comment,
    });

    return NextResponse.json({
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
