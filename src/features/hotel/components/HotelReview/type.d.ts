/**
 * Types for ReviewHotel component
 */

export type TReviewData = {
  id: string;
  hotelId?: number;
  user: {
    id: number;
    fullName: string;
    avatar: string;
  };
  orderId?: number;
  rating: number;
  title: string;
  content: string;
  image: string;
  createdAt?: Date;
};

export type THotelReviewProps = {
  reviewData?: TReviewData[];
};
