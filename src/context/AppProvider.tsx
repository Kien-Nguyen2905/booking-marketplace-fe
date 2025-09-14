'use client';
import {
  MANAGEMENT_NAV_LINKS,
  MODAL_MODES,
  ModalModeType,
  ROLE_NAME,
  ROUTES,
} from '@/constants';
import { TAppContextProps } from '@/context/type';
import { useLogout } from '@/hooks';
import { generateSocketInstance } from '@/lib/socket';
import {
  clearAllLocalStorage,
  getAccessTokenLocalStorage,
  getEmailLocalStorage,
  getPartnerLocalStorage,
  getRoleLocalStorage,
  removePartnerLocalStorage,
  removeRoleNameCookies,
} from '@/lib/utils';
import {
  GetPartnerByUserIdResType,
  GetUserProfileResType,
  LoginBodyType,
} from '@/models';
import {
  useGetPartnerByUserIdQuery,
  useGetProfileQuery,
  useGetProvincesQuery,
} from '@/queries';
import { TProvincesResponse } from '@/services/address/addressServices';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Socket } from 'socket.io-client';

const defaultContext: TAppContextProps = {
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
  socket: undefined,
  setSocket: () => null,
  mode: 'login',
  setMode: () => null,
  provinces: [],
  setProvinces: () => null,
  isProvincesLoading: false,
  clearAllLogout: () => null,
};

const AppContext = createContext<TAppContextProps>(defaultContext);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleLogout } = useLogout();
  const pathname = usePathname();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mode, setMode] = useState<ModalModeType>(MODAL_MODES.LOGIN);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [payloadLogin, setPayloadLogin] = useState<LoginBodyType | null>(null);
  const [profile, setProfile] = useState<GetUserProfileResType | null>(null);

  const [partnerProfile, setPartnerProfile] =
    useState<GetPartnerByUserIdResType | null>(null);
  const [isPendingPartner, setIsPendingPartner] = useState(false);
  const [socket, setSocket] = useState<Socket | undefined>();
  const [provinces, setProvinces] = useState<TProvincesResponse[]>([]);
  const { data: profileData, error } = useGetProfileQuery(isAuthenticated);
  const { data: provincesData, isLoading: isProvincesLoading } =
    useGetProvincesQuery();
  const { data: partnerData } = useGetPartnerByUserIdQuery(
    profileData?.data?.data?.role.name === ROLE_NAME.PARTNER,
  );

  const toggleModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  useEffect(() => {
    if (partnerData?.data?.data) {
      setPartnerProfile(partnerData.data.data);
    }
  }, [partnerData]);

  useEffect(() => {
    if (provincesData?.data?.data) {
      setProvinces(provincesData?.data?.data);
    }
  }, [provincesData]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setEmail(getEmailLocalStorage() || '');
    setRole(getRoleLocalStorage() || '');
    setIsAuthenticated(!!getAccessTokenLocalStorage());
    setIsPendingPartner(!!getPartnerLocalStorage());
  }, []);

  // Update profile when query data changes
  useEffect(() => {
    if (isAuthenticated && profileData) {
      setProfile(profileData.data.data);
      if (profileData) {
        if (
          profileData.data.data.partnerStatus === null ||
          role !== profileData.data.data.role.name
        ) {
          setIsPendingPartner(false);
          removePartnerLocalStorage();
        }
      }
      setSocket(generateSocketInstance());
    }
  }, [profileData, isAuthenticated, role]);

  // Handle navigation based on role
  useEffect(() => {
    if (!role || role === ROLE_NAME.CUSTOMER) return;
    if (!role || role === ROLE_NAME.PARTNER) return;

    const targetRoute = MANAGEMENT_NAV_LINKS[role]?.ROOT?.href || ROUTES.HOME;

    if (targetRoute && !pathname.includes(targetRoute)) {
      router.push(targetRoute);
    }
  }, [role, router, pathname]);

  // Log out if profile fetch fails
  useEffect(() => {
    if (error) {
      handleLogout();
    }
  }, [error, handleLogout]);

  const clearAllLogout = () => {
    setIsAuthenticated(false);
    setProfile(null);
    setRole('');
    clearAllLocalStorage();
    removeRoleNameCookies();
    router.push(ROUTES.HOME);
  };

  const contextValue = {
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
    socket,
    setSocket,
    mode,
    setMode,
    provinces,
    setProvinces,
    isProvincesLoading,
    clearAllLogout,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
