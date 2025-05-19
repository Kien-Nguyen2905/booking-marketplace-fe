import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';

import {
  DisableTwoFactorBodyType,
  ForgotPasswordBodyType,
  ForgotTwoFactorAuthBodyType,
  GetAllDevicesResType,
  GetAuthorizationUrlResType,
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  RegisterBodyType,
  RegisterResType,
  SendOTPBodyType,
  TwoFactorSetupResType,
} from '@/models/auth.model';
import { EmptyDataResponse } from '@/models/response.model';

const authServices = {
  sendOTP: (body: SendOTPBodyType) => {
    return instance.post<SuccessResponse<EmptyDataResponse>>(`/auth/otp`, body);
  },

  register: (body: RegisterBodyType) => {
    return instance.post<SuccessResponse<RegisterResType>>(
      `/auth/register`,
      body,
    );
  },

  login: (body: LoginBodyType) => {
    return instance.post<SuccessResponse<LoginResType>>(`/auth/login`, body);
  },

  logout: (body: LogoutBodyType) => {
    return instance.post<SuccessResponse<EmptyDataResponse>>(
      `/auth/logout`,
      body,
    );
  },

  getUrlOauth: () => {
    return instance.get<SuccessResponse<GetAuthorizationUrlResType>>(
      `/auth/google-link`,
    );
  },

  forgotPassword: (body: ForgotPasswordBodyType) => {
    return instance.post<SuccessResponse<EmptyDataResponse>>(
      `/auth/forgot-password`,
      body,
    );
  },

  enableTwoFactor: () => {
    return instance.post<SuccessResponse<TwoFactorSetupResType>>(
      `/auth/2fa/setup`,
      {},
    );
  },

  disableTwoFactor: (body: DisableTwoFactorBodyType) => {
    return instance.post<SuccessResponse<EmptyDataResponse>>(
      `/auth/2fa/disable`,
      body,
    );
  },

  forgotTwoFactorAuth: (body: ForgotTwoFactorAuthBodyType) => {
    return instance.post<SuccessResponse<EmptyDataResponse>>(
      `/auth/forgot-2fa`,
      body,
    );
  },

  getAllDevices: () => {
    return instance.get<SuccessResponse<GetAllDevicesResType>>(
      `/auth/all-devices`,
    );
  },
};

export default authServices;
