import { wishlistServices } from '@/services/wishlist';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetWishlistsByUserIdQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['wishlists'],
    queryFn: wishlistServices.getWishlistsByUserId,
    enabled,
  });
};

export const useCreateWishlistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wishlistServices.createWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wishlists'],
      });
    },
  });
};

export const useDeleteWishlistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wishlistServices.deleteWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wishlists'],
      });
    },
  });
};
