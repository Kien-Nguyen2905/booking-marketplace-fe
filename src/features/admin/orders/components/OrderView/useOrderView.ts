import { useGetOrderByIdQuery } from '@/queries/useOrder';

export const useOrderView = (id?: string | number) => {
  const { data: orderData } = useGetOrderByIdQuery(id as number);
  const order = orderData?.data.data;
  return {
    order,
  };
};
