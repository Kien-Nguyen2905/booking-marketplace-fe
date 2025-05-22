import { authServices } from '@/services/auth';
import { ROUTES } from '@/constants';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import {
  getRefreshTokenLocalStorage,
  removeRoleNameCookies,
  removeTokensLocalStorage,
} from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppProvider';

/**
 * A hook for logout
 */

export const useLogout = () => {
  const { setIsAuthenticated, setProfile, setRole } = useAppContext();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const refreshToken = getRefreshTokenLocalStorage();
      if (refreshToken) {
        const { data } = await authServices.logout({ refreshToken });
        if (data.statusCode === 200) {
          setIsAuthenticated(false);
          setProfile(null);
          setRole('');
          removeTokensLocalStorage();
          removeRoleNameCookies();
          router.push(ROUTES.HOME);
        }
      } else {
        showToast({
          type: 'error',
          message: 'Not found refresh token',
        });
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };
  return {
    handleLogout,
  };
};
