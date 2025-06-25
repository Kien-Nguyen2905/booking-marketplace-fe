import {
  GetPartnerByUserIdResType,
  GetUserProfileResType,
  LoginBodyType,
} from '@/models';
import { SetStateAction } from 'react';
import { Socket } from 'socket.io-client';

export type TMainContextProviderProps = {
  isOpenModal: boolean;
  setIsOpenModal: SetStateAction;
  toggleModal: () => void;
  isCollapsed: boolean;
  setIsCollapsed: SetStateAction;
  toggleSidebar: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: SetStateAction<boolean>;
  role: string;
  setRole: SetStateAction<string>;
  payloadLogin: LoginBodyType | null;
  setPayloadLogin: SetStateAction<LoginBodyType | null>;
  email: string;
  setEmail: SetStateAction<string>;
  profile: GetUserProfileResType | null;
  setProfile: SetStateAction<GetUserProfileResType | null>;
  isPendingPartner: boolean;
  setIsPendingPartner: SetStateAction<boolean>;
  partnerProfile: GetPartnerByUserIdResType | null;
  socket: Socket | undefined;
  setSocket: SetStateAction<Socket | undefined>;
  mode: 'login' | 'register' | 'password';
  setMode: SetStateAction<'login' | 'register' | 'password'>;
};
