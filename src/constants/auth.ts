export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;
export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus];
export const TypeOfVerificationCode = {
  REGISTER: 'REGISTER',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  VERIFY: 'VERIFY',
};

export const ROLE_NAME = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
  PARTNER: 'PARTNER',
};

export const PRIVATE_MANAGEMENT = Object.values(ROLE_NAME);

export const MODAL_MODES = {
  LOGIN: 'login',
  REGISTER: 'register',
  PASSWORD: 'password',
} as const;

export type ModalModeType = (typeof MODAL_MODES)[keyof typeof MODAL_MODES];

export const modeTitles: Record<string, string> = {
  login: 'Login',
  register: 'Register',
  password: 'Forgot Password',
} as const;
