import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { SuccessResponse } from '../type';
import envConfig from '../../../config';
import { LOCAL_STORAGE } from '@/constants';
import { RefreshTokenResType } from '@/models';

const instance: AxiosInstance = axios.create({
  baseURL: envConfig.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'x-api-key': envConfig.NEXT_PUBLIC_SECRET_API_KEY,
  },
});
instance.interceptors.response.use(
  (response: AxiosResponse<SuccessResponse<any>>) => {
    return response;
  },
  async (error: AxiosError<SuccessResponse>) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === 'Invalid AccessToken'
    ) {
      try {
        const res = await instance.post<SuccessResponse<RefreshTokenResType>>(
          '/auth/refresh-token',
          {
            refreshToken: localStorage.getItem('refreshToken'),
          },
        );
        localStorage.setItem(
          LOCAL_STORAGE.ACCESS_TOKEN,
          res.data.data.accessToken,
        );
        localStorage.setItem(
          LOCAL_STORAGE.REFRESH_TOKEN,
          res.data.data.refreshToken,
        );
        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
          return instance(originalRequest);
        }
      } catch (error) {
        console.log(error);
      }
    }
    // if (error.response?.status === 401) {
    //   removeTokensLocalStorage();
    //   removeRoleNameCookies();
    // }
    return Promise.reject(error);
  },
);
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] =
        config?.headers?.['Content-Type'] ?? 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default instance;
