import { UpdatePromotionBodyType } from '@/models/promotion.model';
import { promotionServices } from '@/services/promotion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAllPromotionsQuery = (queryString = '') => {
  return useQuery({
    queryKey: ['promotions', queryString],
    queryFn: () => promotionServices.getPromotions(queryString),
  });
};

export const useGetPromotionByIdQuery = (id: string | number) => {
  return useQuery({
    queryKey: ['promotion', id],
    queryFn: () => promotionServices.getPromotionById(id),
    enabled: !!id,
  });
};

export const useCreatePromotionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: promotionServices.createPromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['promotions'],
      });
    },
  });
};

export const useUpdatePromotionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string | number;
      body: UpdatePromotionBodyType;
    }) => promotionServices.updatePromotion(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['promotions'],
      });
    },
  });
};

export const useDeletePromotionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: promotionServices.deletePromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['promotions'],
      });
    },
  });
};

export const useGetPromotionsByValidFromQuery = (queryString = '') => {
  return useQuery({
    queryKey: ['promotions', queryString],
    queryFn: () => promotionServices.getPromotionsByValidFrom(queryString),
  });
};

export const useCreateNotifyPromotionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: promotionServices.createNotifyPromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['promotions'],
      });
    },
  });
};
