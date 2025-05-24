import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';

import {
  GetUserResType,
  GetAllUsersResType,
  UpdateUserBodyType,
} from '@/models/user.model';

const userServices = {
  getAllUsers: (queryString: string = '') => {
    return instance.get<SuccessResponse<GetAllUsersResType>>(
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
