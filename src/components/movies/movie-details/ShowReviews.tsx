"use client";
import { useState, useEffect } from "react";

interface ReviewProps {
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ShowReviews = ({ movie }: { movie: { slug: string } }) => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  useEffect(() => {
    if (!movie?.slug) return;

    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/movies/${movie.slug}/reviews`);
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [movie?.slug]);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderStars = (rating: number) => {
    return [...Array(rating)].map((_, index) => (
      <span key={index} className="text-kino-darkred text-lg">
        ★
      </span>
    ));
  };

  return (
    <div className="bg-kino-darkgrey p-4 rounded-lg w-full">
      <h3 className="text-lg font-bold text-center">Reviews</h3>
      {currentReviews.length > 0 ? (
        currentReviews.map((review, index) => (
          <div key={index} className="mb-4 pb-4 border-b border-gray-600">
            <div className="flex justify-end items-end space-x-0.5">
              {renderStars(review.rating)}
            </div>
            <p className="font-bold text-sm text-kino-grey">
              {review.userName}
            </p>
            <p className="mt-1 text-sm text-kino-grey">{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      {reviews.length > reviewsPerPage && (
        <div className="flex justify-between items-center mt-6">
          <button
            aria-label="Previous three reviews"
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-3xl w-29 ${
              currentPage === 1
                ? "bg-kino-darkgrey border-2 border-kino-red cursor-not-allowed"
                : "bg-kino-red hover:bg-kino-darkred"
            }`}
          >
            Previous
          </button>

          <button
          aria-label="next three reviews"
            onClick={() =>
              paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-3xl w-29  ${
              currentPage === totalPages
                ? "bg-kino-dark-grey border-2 border-kino-red cursor-not-allowed"
                : "bg-kino-red hover:bg-red-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
      <p className="ml-1 mt-3 text-xs text-kino-grey">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default ShowReviews;
