import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';
import {
  GetReviewsResType,
  CreateReviewBodyType,
  CreateReviewResType,
} from '@/models/review.model';

const reviewService = {
  getReviews: (hotelId: string | number, queryString: string = '') => {
    return instance.get<SuccessResponse<GetReviewsResType>>(
      `/reviews/hotel/${hotelId}${queryString ? `?${queryString}` : ''}`,
    );
  },

  createReview: (body: CreateReviewBodyType) => {
    return instance.post<SuccessResponse<CreateReviewResType>>(
      `/reviews`,
      body,
    );
  },
};
export default reviewService;
