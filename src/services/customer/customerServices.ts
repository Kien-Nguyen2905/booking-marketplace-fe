import { GetCustomersResType } from '@/models/customer.model';
import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';

const customerServices = {
  getCustomers: (queryString = '') => {
    return instance.get<SuccessResponse<GetCustomersResType>>(
      `/customers${queryString ? `?${queryString}` : ''}`,
    );
  },
};
export default customerServices;
