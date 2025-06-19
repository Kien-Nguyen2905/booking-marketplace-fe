import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';
import { GetTransactionsResType } from '@/models/transaction.model';

const transactionServices = {
  getAllTransactions: (queryString: string = '') => {
    return instance.get<SuccessResponse<GetTransactionsResType>>(
      `/transactions${queryString ? `?${queryString}` : ''}`,
    );
  },
};
export default transactionServices;
