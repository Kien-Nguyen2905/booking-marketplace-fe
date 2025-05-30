import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';

import {
  GetUserResType,
  GetUsersResType,
  UpdateUserBodyType,
} from '@/models/user.model';

const userServices = {
  getUsers: (queryString: string = '') => {
    return instance.get<SuccessResponse<GetUsersResType>>(
      `/users${queryString ? `?${queryString}` : ''}`,
    );
  },

  getUserById: (userId: string) => {
    return instance.get<SuccessResponse<GetUserResType>>(`/users/${userId}`);
  },

  updateUser: (userId: string, body: UpdateUserBodyType) => {
    return instance.put<SuccessResponse<GetUserResType>>(
      `/users/${userId}`,
      body,
    );
  },
};

export default userServices;
