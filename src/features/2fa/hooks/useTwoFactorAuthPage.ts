import { useLogin } from '@/components/LoginModal/useLogin';
import { useAppContext } from '@/context/AppProvider';
import { useTimeCountdown } from '@/hooks';
import { showToast } from '@/lib/toast';
import { useForgotTwoFactorAuthMutation } from '@/queries';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useTwoFactorAuthPage = () => {
  const { payloadLogin, setPayloadLogin } = useAppContext();
  const { handleLogin, form } = useLogin();
  const { mutateAsync: send2FA } = useForgotTwoFactorAuthMutation();
  const router = useRouter();

  const [otpValue, setOtpValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgot2FA, setIsForgot2FA] = useState(false);
  const [otpError, setOtpError] = useState('');
  const { time, startTimer, resetTimer } = useTimeCountdown();

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!payloadLogin) {
        return;
      }
      await handleLogin({ ...payloadLogin, totpCode: otpValue });
      resetTimer();
    } catch {
      setOtpError('Invalid OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    router.back();
    setPayloadLogin(null);
    resetTimer();
  };

  const handleForgot2FA = async () => {
    setIsForgot2FA(true);
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
    } catch {
      showToast({
        type: 'error',
        message: 'Failed to send 2FA code',
      });
    } finally {
      setIsForgot2FA(false);
    }
  };

  useEffect(() => {
    if (!payloadLogin) {
      router.push('/');
    }
  }, [payloadLogin, router]);

  return {
    otpValue,
    error: otpError || form.formState.errors['totpCode']?.message,
    handleOtpChange,
    handleSubmit,
    handleGoBack,
    handleForgot2FA,
    isSubmitting,
    isForgot2FA,
    time,
  };
};
