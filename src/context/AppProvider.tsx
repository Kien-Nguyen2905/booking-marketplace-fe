'use client';
import { MANAGEMENT_NAV_LINKS, ROLE_NAME, ROUTES } from '@/constants';
import { useLogout } from '@/hooks';
import {
  getAccessTokenLocalStorage,
  getEmailLocalStorage,
  getRoleLocalStorage,
} from '@/lib/utils';
import { GetUserProfileResType, LoginBodyType } from '@/models';
import { useGetProfileQuery } from '@/queries';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface AppContextProps {
  isOpenModal: boolean;
  toggleModal: () => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  role: string;
  setRole: (role: string) => void;
  payloadLogin: LoginBodyType | null;
  setPayloadLogin: (payloadLogin: LoginBodyType | null) => void;
  email: string;
  setEmail: (value: string) => void;
  profile: GetUserProfileResType | null;
  setProfile: (profile: GetUserProfileResType | null) => void;
}

const defaultContext: AppContextProps = {
  isOpenModal: false,
  toggleModal: () => null,
  isCollapsed: false,
  toggleSidebar: () => null,
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  role: '',
  setRole: () => null,
  payloadLogin: null,
  setPayloadLogin: () => null,
  email: '',
  setEmail: () => null,
  profile: null,
  setProfile: () => null,
};

const AppContext = createContext<AppContextProps>(defaultContext);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { handleLogout } = useLogout();
  const pathname = usePathname();

  const [email, setEmail] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [payloadLogin, setPayloadLogin] = useState<LoginBodyType | null>(null);
  const [profile, setProfile] = useState<GetUserProfileResType | null>(null);

  // Get profile
  const { data, error } = useGetProfileQuery(isAuthenticated);
  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure client-side execution

    const storedRole = getRoleLocalStorage();
    const storedAccessToken = getAccessTokenLocalStorage();
    const storedEmail = getEmailLocalStorage();
    setEmail(storedEmail || '');
    setRole(storedRole || '');
    setIsAuthenticated(!!storedAccessToken);
  }, []);

  // Update profile when query data changes
  useEffect(() => {
    if (isAuthenticated && data?.data?.data) {
      setProfile(data.data.data);
    }
  }, [data, isAuthenticated]);

  // Handle navigation based on role
  useEffect(() => {
    if (!role || role === ROLE_NAME.CUSTOMER) return;
    if (!role || role === ROLE_NAME.PARTNER) return;

    const targetRoute = MANAGEMENT_NAV_LINKS[role]?.ROOT?.href || ROUTES.HOME;
    if (targetRoute && !pathname.includes(targetRoute)) {
      router.push(targetRoute);
    }
  }, [role, router, pathname]);

  const toggleModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  // Handle profile query errors
  useEffect(() => {
    // Log out if profile fetch fails
    if (error) {
      handleLogout();
    }
  }, [error, handleLogout]);

  const contextValue = useMemo(
    () => ({
      isOpenModal,
      toggleModal,
      isCollapsed,
      toggleSidebar,
      isAuthenticated,
      setIsAuthenticated,
      role,
      setRole,
      payloadLogin,
      setPayloadLogin,
      email,
      setEmail,
      profile,
      setProfile,
    }),
    [
      isOpenModal,
      isCollapsed,
      isAuthenticated,
      role,
      toggleModal,
      toggleSidebar,
      payloadLogin,
      email,
      profile,
    ],
  );
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
