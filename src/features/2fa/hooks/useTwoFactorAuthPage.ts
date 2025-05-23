import { useAppContext } from '@/context/AppProvider';
import { useTimeCountdown } from '@/hooks';
import { handleErrorApi, navigateWithLogin } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import {
  decodeToken,
  setRoleNameCookies,
  setTokensLocalStorage,
} from '@/lib/utils';
import {
  useForgotTwoFactorAuthMutation,
  useVerify2FAMutation,
} from '@/queries';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useTwoFactorAuthPage = () => {
  const { payloadLogin, setPayloadLogin, setIsAuthenticated, setRole } =
    useAppContext();
  const { mutateAsync: verify2FA, isPending: isVerifying } =
    useVerify2FAMutation();
  const { mutateAsync: send2FA, isPending: isSending } =
    useForgotTwoFactorAuthMutation();
  const router = useRouter();

  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState('');
  const { time, startTimer, resetTimer } = useTimeCountdown();

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!payloadLogin) {
        return;
      }
      const { data } = await verify2FA({ ...payloadLogin, totpCode: otpValue });
      navigateWithLogin({
        data: {
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        },
        setIsAuthenticated,
        setTokensLocalStorage,
        setRoleNameCookies,
        decodeToken,
        setRole,
        router,
      });
      resetTimer();
      setPayloadLogin(null);
    } catch (error: any) {
      handleErrorApi({ error, setErrorText: setOtpError });
    }
  };

  const handleGoBack = () => {
    router.back();
    setPayloadLogin(null);
    resetTimer();
  };

  const handleForgot2FA = async () => {
    try {
      if (payloadLogin?.email) {
        const { data } = await send2FA({
          email: payloadLogin?.email,
        });
        if (data.data) {
          showToast({
            type: 'success',
            message: data.message,
          });
          startTimer();
        }
      }
    } catch (error: any) {
      handleErrorApi({ error });
    }
  };

  useEffect(() => {
    if (!payloadLogin) {
      router.back();
      resetTimer();
    }
  }, [payloadLogin, router]);

  return {
    otpValue,
    error: otpError,
    handleOtpChange,
    handleSubmit,
    handleGoBack,
    handleForgot2FA,
    isVerifying,
    isSending,
    time,
  };
};
