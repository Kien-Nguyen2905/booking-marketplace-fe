import { useModalAuth } from '@/components/ModalAuth/useModalAuth';
import { ERROR_AUTH_MESSAGES, MANAGEMENT_NAV_LINKS, ROUTES } from '@/constants';
import { ROLE_NAME, TypeOfVerificationCode } from '@/constants/auth';
import { useAppContext } from '@/context/AppProvider';
import { useTimeCountdown } from '@/hooks';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import {
  decodeToken,
  setRoleNameCookies,
  setTokensLocalStorage,
} from '@/lib/utils';
import { RegisterBodySchema, RegisterBodyType } from '@/models';
import { useRegisterMutation, useSendOTPMutation } from '@/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const useRegister = () => {
  const { setIsAuthenticated, setRole } = useAppContext();

  const { closeModal } = useModalAuth();

  const { mutateAsync: sendOTP, isPending: isLoadingOTP } =
    useSendOTPMutation();
  const { mutateAsync: register, isPending: isLoadingRegister } =
    useRegisterMutation();

  const router = useRouter();

  const { time, startTimer, resetTimer } = useTimeCountdown();
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBodySchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      code: '',
    },
  });

  const handleSendOTP = async () => {
    try {
      if (form.getValues('email')) {
        const { data } = await sendOTP({
          email: form.getValues('email'),
          type: TypeOfVerificationCode.REGISTER,
        });
        if (data.data) {
          showToast({
            type: 'success',
            message: data.message,
          });
          startTimer();
        }
      } else {
        form.setError('email', {
          type: 'server',
          message: ERROR_AUTH_MESSAGES.email.required,
        });
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleRegister = async (value: RegisterBodyType) => {
    try {
      const { data } = await register(value);
      const accessToken = data.data.accessToken;
      const refreshToken = data.data.refreshToken;
      if (accessToken && refreshToken) {
        setTokensLocalStorage({ accessToken, refreshToken });
        setRoleNameCookies({ accessToken, refreshToken });
        resetTimer();

        const decodedAccessToken = decodeToken(accessToken);

        // Navigate based on user role
        const redirectPath =
          decodedAccessToken.roleName === ROLE_NAME.CUSTOMER
            ? ROUTES.HOME
            : MANAGEMENT_NAV_LINKS[decodedAccessToken.roleName].ROOT.href;
        setIsAuthenticated(true);
        setRole(decodedAccessToken.roleName);
        router.push(redirectPath || ROUTES.HOME);
        closeModal();
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  return {
    form,
    time,
    handleSendOTP,
    isLoadingOTP,
    isLoadingRegister,
    handleRegister,
  };
};
