import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Reservation from "@/models/reservation";

export async function DELETE(_req: Request, { params }: { params: unknown }) {
  const { id } = await (params as Promise<{ id: string }>);

  await connectDB();
  const deleted = await Reservation.findByIdAndDelete(id);

  if (!deleted) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
