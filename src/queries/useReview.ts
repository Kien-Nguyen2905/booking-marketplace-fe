import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import reviewService from '@/services/review/reviewServices';

export const useGetReviewsQuery = (
  hotelId: string | number,
  queryString?: string,
) => {
  return useQuery({
    queryKey: ['reviews', hotelId, queryString],
    queryFn: () => reviewService.getReviews(hotelId, queryString),
    enabled: !!hotelId,
  });
};
export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reviewService.createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-orders'],
      });
    },
  });
};
