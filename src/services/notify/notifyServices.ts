import {
  CreateNotifyBodyType,
  CreateNotifyResType,
  GetNotifiesByRecipientIdResType,
  UpdateNotifyReadAtResType,
} from '@/models/notify.model';
import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';

const notifyServices = {
  getNotifiesByRecipientId: (queryString: string = '') => {
    return instance.get<SuccessResponse<GetNotifiesByRecipientIdResType>>(
      `/notifications${queryString ? `?${queryString}` : ''}`,
    );
  },

  createNotify: (body: CreateNotifyBodyType) => {
    return instance.post<SuccessResponse<CreateNotifyResType>>(
      `/notifications`,
      body,
    );
  },

  readNotify: (id: string | number) => {
    return instance.put<SuccessResponse<UpdateNotifyReadAtResType>>(
      `/notifications/read/${id}`,
    );
  },
};
export default notifyServices;
