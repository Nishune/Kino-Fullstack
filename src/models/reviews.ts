import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      required: true,
      maxLength: 500,
    },
  },
  { timestamps: true }
);

// Add protection against XSS attacks
reviewSchema.pre("save", function (next) {
  if (this.comment) {
    this.comment = this.comment.replace(/<[^>]*>?/gm, ""); 
  }
  next();
});


const review = mongoose.models.review || mongoose.model("review", reviewSchema);

export { review };
