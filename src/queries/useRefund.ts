import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import refundServices from '@/services/refund/refundServices';
import { CreateRefundBodyType } from '@/models/refund.model';

export const useGetAllRefundsQuery = (queryString: string = '') => {
  return useQuery({
    queryKey: ['refunds', queryString],
    queryFn: () => refundServices.getAllRefunds(queryString),
  });
};

export const useGetAllMyRefundsQuery = (queryString: string = '') => {
  return useQuery({
    queryKey: ['refunds-me', queryString],
    queryFn: () => refundServices.getAllMyRefunds(queryString),
  });
};

export const useGetRefundByIdQuery = (id: number | string) => {
  return useQuery({
    queryKey: ['refunds', id],
    queryFn: () => refundServices.getRefundById(id),
    enabled: !!id,
  });
};

export const useCreateRefundMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateRefundBodyType) =>
      refundServices.createRefund(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['refunds', 'refunds-me'],
      });
    },
  });
};
