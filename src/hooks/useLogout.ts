import { authServices } from '@/services/auth';
import { getRefreshTokenLocalStorage } from '@/lib/utils';
import { useAppContext } from '@/context/AppProvider';

export const useLogout = () => {
  const { clearAllLogout } = useAppContext();
  const handleLogout = async () => {
    try {
      const refreshToken = getRefreshTokenLocalStorage();
      if (refreshToken) {
        await authServices.logout({ refreshToken });
        clearAllLogout();
      }
    } catch {
      clearAllLogout();
    }
  };
  return {
    handleLogout,
  };
};
