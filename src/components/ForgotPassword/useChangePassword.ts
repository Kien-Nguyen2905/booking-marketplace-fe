import { ERROR_AUTH_MESSAGES, ROUTES } from '@/constants';
import { TypeOfVerificationCode } from '@/constants/auth';
import { handleErrorApi } from '@/lib/helper';
import { setEmailLocalStorage } from '@/lib/utils';
import { useSendOTPMutation } from '@/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useForgotPassword = () => {
  const { mutateAsync: sendOTP } = useSendOTPMutation();

  const router = useRouter();
  const form = useForm<{ email: string }>({
    resolver: zodResolver(
      z.object({
        email: z.string().email(ERROR_AUTH_MESSAGES.email.invalid),
      }),
    ),
    defaultValues: {
      email: '',
    },
  });

  const [isLoadingOTP, setIsLoadingOTP] = useState(false);
  const handleSendOTP = async (value: { email: string }) => {
    setIsLoadingOTP(true);

    try {
      if (value.email) {
        const { data } = await sendOTP({
          email: value.email,
          type: TypeOfVerificationCode.FORGOT_PASSWORD,
        });
        if (data.data) {
          router.push(ROUTES.RESET_PASSWORD_PAGE);
          setEmailLocalStorage(value.email);
        }
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
      setIsLoadingOTP(false);
    }
  };

  return {
    form,
    handleSendOTP,
    isLoadingOTP,
  };
};
