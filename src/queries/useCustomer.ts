import { customerServices } from '@/services/customer';
import { useQuery } from '@tanstack/react-query';

export const useGetCustomersQuery = (queryString: string = '') => {
  return useQuery({
    queryKey: ['customers', queryString],
    queryFn: () => customerServices.getCustomers(queryString),
  });
};
