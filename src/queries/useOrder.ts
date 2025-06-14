import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import orderService from '@/services/order/orderServices';

export const useGetAllOrdersQuery = (queryString: string = '') => {
  return useQuery({
    queryKey: ['orders', queryString],
    queryFn: () => orderService.getOrders(queryString),
  });
};

export const useGetOrderByIdQuery = (id: string | number) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrderByOrderId(id),
    enabled: !!id,
  });
};

export const useGetMyOrdersQuery = () => {
  return useQuery({
    queryKey: ['orders', 'me'],
    queryFn: () => orderService.getMyOrders(),
  });
};

export const useGetOrdersByHotelIdQuery = (queryString: string = '') => {
  return useQuery({
    queryKey: ['orders-hotel', queryString],
    queryFn: () => orderService.getOrderByHotelId(queryString),
  });
};

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
    },
    retry: 2,
  });
};
