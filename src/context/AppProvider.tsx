'use client';
import { MANAGEMENT_NAV_LINKS, ROLE_NAME, ROUTES } from '@/constants';
import { useLogout } from '@/hooks';
import {
  getAccessTokenLocalStorage,
  getEmailLocalStorage,
  getPartnerLocalStorage,
  getRoleLocalStorage,
  removeEmailLocalStorage,
  removePartnerLocalStorage,
} from '@/lib/utils';
import {
  GetPartnerByUserIdResType,
  GetUserProfileResType,
  LoginBodyType,
} from '@/models';
import { useGetPartnerByUserIdQuery, useGetProfileQuery } from '@/queries';
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
  isPendingPartner: boolean;
  setIsPendingPartner: (value: boolean) => void;
  partnerProfile: GetPartnerByUserIdResType | null;
  setPartnerProfile: (partnerProfile: GetPartnerByUserIdResType | null) => void;
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
  isPendingPartner: false,
  setIsPendingPartner: () => null,
  partnerProfile: null,
  setPartnerProfile: () => null,
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
  const [partnerProfile, setPartnerProfile] =
    useState<GetPartnerByUserIdResType | null>(null);
  const [isPendingPartner, setIsPendingPartner] = useState(false);
  const { data, error } = useGetProfileQuery(isAuthenticated);
  const profileData = data?.data?.data;

  // The useGetPartnerByIdQuery will only run when id is truthy due to its internal 'enabled: !!id' config
  const { data: partnerData } = useGetPartnerByUserIdQuery(
    profileData?.role.name === ROLE_NAME.PARTNER,
  );

  // Update partner profile data when available
  useEffect(() => {
    if (partnerData?.data?.data) {
      setPartnerProfile(partnerData.data.data);
    }
  }, [partnerData]);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure client-side execution

    const storedRole = getRoleLocalStorage();
    const storedAccessToken = getAccessTokenLocalStorage();
    const storedEmail = getEmailLocalStorage();
    const storedIsPendingPartner = getPartnerLocalStorage();
    setEmail(storedEmail || '');
    setRole(storedRole || '');
    setIsAuthenticated(!!storedAccessToken);
    setIsPendingPartner(!!storedIsPendingPartner);
  }, []);

  // Update profile when query data changes
  useEffect(() => {
    if (isAuthenticated && profileData) {
      setProfile(profileData);
      if (profileData) {
        if (
          profileData.partnerStatus === null ||
          role !== profileData.role.name
        ) {
          setIsPendingPartner(false);
          removePartnerLocalStorage();
        }
        if (role !== data.data.data.role.name) {
          handleLogout();
          removeEmailLocalStorage();
          window.location.reload();
        }
      }
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
      isPendingPartner,
      setIsPendingPartner,
      partnerProfile,
      setPartnerProfile,
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
      isPendingPartner,
      partnerProfile,
    ],
  );
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
