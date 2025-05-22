import {
  ChangePasswordBodyType,
  GetUserProfileResType,
  UpdateMeBodyType,
} from '@/models';
import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';

const profileServices = {
  getProfile: () => {
    return instance.get<SuccessResponse<GetUserProfileResType>>(`/profile`);
  },

  updateProfile: (body: UpdateMeBodyType) => {
    return instance.put<SuccessResponse<GetUserProfileResType>>(
      `/profile`,
      body,
    );
  },

  changePassword: (body: ChangePasswordBodyType) => {
    return instance.put<SuccessResponse<GetUserProfileResType>>(
      `/profile/change-password`,
      body,
    );
  },
};

export default profileServices;
