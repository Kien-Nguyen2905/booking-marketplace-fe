import { useModalAuth } from '@/components/ModalAuth/useModalAuth';
import { ERROR_AUTH_MESSAGES, ROUTES } from '@/constants';
import { TypeOfVerificationCode } from '@/constants/auth';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { setEmailLocalStorage } from '@/lib/utils';
import { useSendOTPMutation } from '@/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useForgotPassword = () => {
  const { closeModal } = useModalAuth();
  const { mutateAsync: sendOTP, isPending: isLoadingOTP } =
    useSendOTPMutation();

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

  const handleSendOTP = async (value: { email: string }) => {
    try {
      if (value.email) {
        const { data } = await sendOTP({
          email: value.email,
          type: TypeOfVerificationCode.FORGOT_PASSWORD,
        });
        if (data.data) {
          router.push(ROUTES.RESET_PASSWORD_PAGE);
          showToast({
            type: 'success',
            message: data.message,
          });
          setEmailLocalStorage(value.email);
          closeModal();
        }
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  return {
    form,
    handleSendOTP,
    isLoadingOTP,
  };
};
