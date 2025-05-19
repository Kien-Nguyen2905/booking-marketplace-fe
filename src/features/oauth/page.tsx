'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/lib/toast';
import {
  decodeToken,
  setRoleNameCookies,
  setTokensLocalStorage,
} from '@/lib/utils';
import { MANAGEMENT_NAV_LINKS, ROLE_NAME, ROUTES } from '@/constants';
import { useAppContext } from '@/context/AppProvider';

const OauthPage = () => {
  const { setIsAuthenticated, setRole } = useAppContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const errorMessage = searchParams.get('errorMessage');

    if (accessToken && refreshToken) {
      setIsAuthenticated(true);
      setTokensLocalStorage({ accessToken, refreshToken });
      setRoleNameCookies({ accessToken, refreshToken });

      const decodedAccessToken = decodeToken(accessToken);
      setRole(decodedAccessToken.roleName);

      const redirectPath =
        decodedAccessToken.roleName === ROLE_NAME.CUSTOMER ||
        decodedAccessToken.roleName === ROLE_NAME.PARTNER
          ? ROUTES.HOME
          : MANAGEMENT_NAV_LINKS[decodedAccessToken.roleName]?.ROOT?.href ||
            ROUTES.HOME;
      router.push(redirectPath);
    } else {
      showToast({
        type: 'error',
        message: errorMessage || 'Failed',
      });
      router.push('/');
    }
  }, [searchParams, router, setIsAuthenticated, setRole]);

  return null;
};

export default OauthPage;
