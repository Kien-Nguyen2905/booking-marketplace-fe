'use client';
import { MANAGEMENT_NAV_LINKS, ROLE_NAME, ROUTES } from '@/constants';
import {
  getAccessTokenLocalStorage,
  getEmailLocalStorage,
  getRoleLocalStorage,
} from '@/lib/utils';
import { LoginBodyType } from '@/models';
import { useRouter } from 'next/navigation';
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
};

const AppContext = createContext<AppContextProps>(defaultContext);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [payloadLogin, setPayloadLogin] = useState<LoginBodyType | null>(null);
  // Get profile

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure client-side execution

    const storedRole = getRoleLocalStorage();
    const storedAccessToken = getAccessTokenLocalStorage();
    const storedEmail = getEmailLocalStorage();
    setEmail(storedEmail || '');
    setRole(storedRole || '');
    setIsAuthenticated(!!storedAccessToken);
  }, []);

  // Handle navigation based on role
  useEffect(() => {
    if (!role || role === ROLE_NAME.CUSTOMER) return;
    if (!role || role === ROLE_NAME.PARTNER) return;

    const targetRoute = MANAGEMENT_NAV_LINKS[role]?.ROOT?.href || ROUTES.HOME;
    if (targetRoute) {
      router.push(targetRoute);
    }
  }, [role, router]);

  const toggleModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

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
    ],
  );
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
