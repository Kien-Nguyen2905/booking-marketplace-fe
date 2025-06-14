import { useGetMyOrdersQuery } from '@/queries/useOrder';

export const useAccountOrderPage = () => {
  const { data } = useGetMyOrdersQuery();
  const orders = data?.data.data;
  return {
    orders,
  };
};
