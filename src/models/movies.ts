import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  genre: [String],
  durationMinutes: Number,
  posterUrl: String,
  premiereDate: Date,
  tags: [String],
  ageLimit: Number,
  ageRatingText: String,
  slug: String,
});

const movie = mongoose.models?.movie || mongoose.model("movie", movieSchema);

export { movie };
