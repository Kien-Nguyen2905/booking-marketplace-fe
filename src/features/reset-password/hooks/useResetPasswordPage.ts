'use client';
import { ROUTES, TypeOfVerificationCode } from '@/constants';
import { useAppContext } from '@/context/AppProvider';
import { useTimeCountdown } from '@/hooks';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { getEmailLocalStorage, removeEmailLocalStorage } from '@/lib/utils';
import { ForgotPasswordBodySchema, ForgotPasswordBodyType } from '@/models';
import { useChangePasswordMutation, useSendOTPMutation } from '@/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const useResetPasswordPage = () => {
  const { toggleModal } = useAppContext();
  const [email, setEmail] = useState<string | null>('');
  const { mutateAsync: sendOTP, isPending: isLoadingOTP } =
    useSendOTPMutation();
  const { mutateAsync: changePassword, isPending: isLoadingPassword } =
    useChangePasswordMutation();
  const router = useRouter();
  const { time, startTimer, resetTimer } = useTimeCountdown();
  const form = useForm<ForgotPasswordBodyType>({
    resolver: zodResolver(ForgotPasswordBodySchema),
    defaultValues: {
      email: '',
      newPassword: '',
      confirmNewPassword: '',
      code: '',
    },
  });

  const handleSendOTP = async () => {
    try {
      if (email) {
        const { data } = await sendOTP({
          email,
          type: TypeOfVerificationCode.FORGOT_PASSWORD,
        });
        if (data.data) {
          showToast({
            type: 'success',
            message: data.message,
          });
          startTimer();
        }
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleChangePassword = async (value: ForgotPasswordBodyType) => {
    try {
      const { data } = await changePassword(value);
      if (data) {
        showToast({
          type: 'success',
          message: data.message,
        });
        toggleModal();
        resetTimer();
        removeEmailLocalStorage();
        router.push(ROUTES.HOME);
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleGoBack = () => {
    router.push(ROUTES.HOME);
    removeEmailLocalStorage();
    resetTimer();
    toggleModal();
  };

  // Handle email initialization and redirect if needed
  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const storedEmail = getEmailLocalStorage();
      if (storedEmail) {
        setEmail(storedEmail);
        form.reset({
          email: storedEmail,
          newPassword: '',
          confirmNewPassword: '',
          code: '',
        });
      } else {
        router.push(ROUTES.HOME);
      }
    }
  }, [form, router]);

  return {
    form,
    time,
    handleSendOTP,
    isLoadingOTP,
    isLoadingPassword,
    handleChangePassword,
    handleGoBack,
    email,
  };
};
