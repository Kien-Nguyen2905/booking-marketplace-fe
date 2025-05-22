export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export const TypeOfVerificationCode = {
  REGISTER: 'REGISTER',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  VERIFY: 'VERIFY',
};

export const ROLE_NAME = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
  PARTNER: 'PARTNER',
  EMPLOYEE: 'EMPLOYEE',
};

export const PRIVATE_MANAGEMENT = Object.values(ROLE_NAME);
