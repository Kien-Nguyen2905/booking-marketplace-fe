import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/queries';
import { LoginBodySchema, LoginBodyType } from '@/models';
import { handleErrorApi, navigateWithLogin } from '@/lib/helper';
import {
  decodeToken,
  setRoleNameCookies,
  setTokensLocalStorage,
} from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  ERROR_MESSAGES,
  MANAGEMENT_NAV_LINKS,
  ROLE_NAME,
  ROUTES,
} from '@/constants';
import { useModalAuth } from '@/components/ModalAuth/useModalAuth';
import { useAppContext } from '@/context/AppProvider';
import { useState } from 'react';

export const useLogin = () => {
  const { setIsAuthenticated, setPayloadLogin, setRole } = useAppContext();
  const { closeModal } = useModalAuth();
  const router = useRouter();
  const { mutateAsync: login } = useLoginMutation();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBodySchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (value: LoginBodyType) => {
    setIsLoading(true);
    try {
      const { data } = await login(value);
      if (
        data.statusCode === 307 &&
        data.message === ERROR_MESSAGES.NEED_VERIFY_2FA
      ) {
        router.push(ROUTES.TWO_FA_PAGE);
        setPayloadLogin(value);
        closeModal();
        return;
      }
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
      closeModal();
    } catch (error: any) {
      handleErrorApi({ error, setError: form.setError });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    handleLogin,
  };
};
