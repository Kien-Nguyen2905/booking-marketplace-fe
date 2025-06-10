import {
  CreateCustomerBodyType,
  CreateCustomerResType,
  GetCustomersResType,
} from '@/models/customer.model';
import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';

const customerServices = {
  getCustomers: (queryString = '') => {
    return instance.get<SuccessResponse<GetCustomersResType>>(
      `/customers${queryString ? `?${queryString}` : ''}`,
    );
  },
  createCustomer: (body: CreateCustomerBodyType) => {
    return instance.post<SuccessResponse<CreateCustomerResType>>(
      `/customers`,
      body,
    );
  },
};
export default customerServices;
