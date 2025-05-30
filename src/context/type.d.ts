import {
  GetPartnerByUserIdResType,
  GetUserProfileResType,
  LoginBodyType,
} from '@/models';
import { SetStateAction } from 'react';

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
  setPartnerProfile: SetStateAction<GetPartnerByUserIdResType | null>;
};
