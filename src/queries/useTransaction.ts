import { useQuery } from '@tanstack/react-query';
import transactionServices from '@/services/transaction/transactionServices';

export const useGetAllTransactionsQuery = (queryString: string = '') => {
  return useQuery({
    queryKey: ['transactions', queryString],
    queryFn: () => transactionServices.getAllTransactions(queryString),
  });
};
