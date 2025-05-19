import { authServices } from '@/services/auth';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useSendOTPMutation = () => {
  return useMutation({
    mutationFn: authServices.sendOTP,
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authServices.register,
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authServices.login,
  });
};

export const useUrlOauthQuery = () => {
  return useQuery({
    queryKey: ['google'],
    queryFn: authServices.getUrlOauth,
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: authServices.forgotPassword,
  });
};

export const useEnableTwoFactorMutation = () => {
  return useMutation({
    mutationFn: authServices.enableTwoFactor,
  });
};

export const useDisableTwoFactorMutation = () => {
  return useMutation({
    mutationFn: authServices.disableTwoFactor,
  });
};

export const useForgotTwoFactorAuthMutation = () => {
  return useMutation({
    mutationFn: authServices.forgotTwoFactorAuth,
  });
};

export const useGetAllDevicesQuery = () => {
  return useQuery({
    queryKey: ['all-devices'],
    queryFn: authServices.getAllDevices,
  });
};
