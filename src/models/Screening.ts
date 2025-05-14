import mongoose from "mongoose";

const screeningSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Movie" },
  screeningTime: { type: Date, required: true },
  auditorium: { type: String, required: true },
  status: { type: String, default: "available" },
});

const Screening =
  mongoose.models.Screening || mongoose.model("Screening", screeningSchema);

export { Screening };