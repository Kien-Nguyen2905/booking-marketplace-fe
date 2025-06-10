import { customerServices } from '@/services/customer';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetCustomersQuery = (queryString: string = '') => {
  return useQuery({
    queryKey: ['customers', queryString],
    queryFn: () => customerServices.getCustomers(queryString),
  });
};

export const useCreateCustomerMutation = () => {
  return useMutation({
    mutationFn: customerServices.createCustomer,
  });
};
