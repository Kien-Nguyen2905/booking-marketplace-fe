import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';
import {
  CreateRefundBodyType,
  CreateRefundResType,
  GetRefundResType,
  GetRefundsResType,
} from '@/models/refund.model';

const refundServices = {
  getAllRefunds: (queryString: string = '') => {
    return instance.get<SuccessResponse<GetRefundsResType>>(
      `/refunds${queryString ? `?${queryString}` : ''}`,
    );
  },

  getRefundById: (id: number | string) => {
    return instance.get<SuccessResponse<GetRefundResType>>(`/refunds/${id}`);
  },

  createRefund: (body: CreateRefundBodyType) => {
    return instance.post<SuccessResponse<CreateRefundResType>>(
      `/refunds`,
      body,
    );
  },
};
export default refundServices;
