import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/queries';
import { LoginBodySchema, LoginBodyType } from '@/models';
import { handleErrorApi } from '@/lib/helper';
import {
  decodeToken,
  setRoleNameCookies,
  setTokensLocalStorage,
} from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { MANAGEMENT_NAV_LINKS, ROLE_NAME, ROUTES } from '@/constants';
import { useModalAuth } from '@/components/ModalAuth/useModalAuth';
import { useAppContext } from '@/context/AppProvider';
import { useState } from 'react';

export const useLogin = () => {
  const { setIsAuthenticated, setPayloadLogin, payloadLogin, setRole } =
    useAppContext();
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
      const accessToken = data.data.accessToken;
      const refreshToken = data.data.refreshToken;
      if (accessToken && refreshToken) {
        setIsAuthenticated(true);
        setTokensLocalStorage({ accessToken, refreshToken });
        setRoleNameCookies({ accessToken, refreshToken });

        const decodedAccessToken = decodeToken(accessToken);
        setRole(decodedAccessToken.roleName);

        // Navigate based on user role
        const redirectPath =
          decodedAccessToken.roleName === ROLE_NAME.CUSTOMER ||
          decodedAccessToken.roleName === ROLE_NAME.PARTNER
            ? ROUTES.HOME
            : MANAGEMENT_NAV_LINKS[decodedAccessToken.roleName].ROOT.href;
        router.push(redirectPath || ROUTES.HOME);
        closeModal();
        if (payloadLogin) {
          setPayloadLogin(null);
        }
      }
    } catch (error: any) {
      if (error.response.data.message[0].message === 'TOTP code is required') {
        router.push(ROUTES.TWO_FA_PAGE);
        setPayloadLogin(value);
      } else {
        handleErrorApi({ error, setError: form.setError });
      }
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
