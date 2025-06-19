import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import orderService from '@/services/order/orderServices';
import { UpdateOrderBodyType } from '@/models/order.model';

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

export const useGetMyOrdersQuery = (queryString: string = '') => {
  return useQuery({
    queryKey: ['my-orders', queryString],
    queryFn: () => orderService.getMyOrders(queryString),
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

export const useUpdateOrderMutation = (orderId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateOrderBodyType) =>
      orderService.updateStatusOrder(orderId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['order', orderId],
      });
    },
  });
};

export const useUpdateMyOrderMutation = (orderId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateOrderBodyType) =>
      orderService.updateStatusMyOrder(orderId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['order', orderId],
      });
    },
  });
};
