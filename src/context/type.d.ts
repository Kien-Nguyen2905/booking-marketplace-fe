export type TMainContextProviderProps = {
  isOpenModal: boolean;
  setIsOpenModal: SetStateAction;
  toggleModal: () => void;
  isCollapsed: boolean;
  setIsCollapsed: SetStateAction;
  toggleSidebar: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: SetStateAction;
  role: string;
  setRole: SetStateAction;
  payloadLogin: LoginBodyType | null;
  setPayloadLogin: SetStateAction;
  email: string;
  setEmail: SetStateAction;
};
