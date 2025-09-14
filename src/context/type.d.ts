import {
  GetPartnerByUserIdResType,
  GetUserProfileResType,
  LoginBodyType,
} from '@/models';
import { TProvincesResponse } from '@/services/address/addressServices';
import { Socket } from 'socket.io-client';

export type TAppContextProps = {
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
  socket: Socket | undefined;
  setSocket: (socket: Socket | undefined) => void;
  mode: 'login' | 'register' | 'password';
  setMode: (mode: 'login' | 'register' | 'password') => void;
  provinces: TProvincesResponse[];
  setProvinces: (provinces: TProvincesResponse[]) => void;
  isProvincesLoading: boolean;
};
