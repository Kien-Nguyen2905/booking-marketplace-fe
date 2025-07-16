import { GetReviewsResType } from '@/models';

/**
 * Custom hook for ReviewHotel component
 * Handles business logic for the hotel reviews section
 */
export default function useReviewHotel(
  reviews: GetReviewsResType['data'] = [],
) {
  /**
   * Calculate average rating from reviews
   */
  const calculateAverageRating = (): number => {
    if (reviews.length === 0) return 0;
    const sum =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    return Math.round(sum * 2) / 2;
  };

  const averageRating = calculateAverageRating();
  const totalReviews = reviews.length;

  /**
   * Get displayed reviews based on current display count
   */
  const displayedReviews = reviews.slice(0, reviews.length);

  return {
    displayedReviews,
    averageRating,
    totalReviews,
  };
}
