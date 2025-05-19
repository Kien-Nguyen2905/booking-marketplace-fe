export const REQUEST_USER_KEY = 'user';
export const REQUEST_ROLE_PERMISSIONS = 'role_permissions';

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
export const GENDER_VALUE = [
  {
    value: 'MALE',
    label: 'Male',
  },
  {
    value: 'FEMALE',
    label: 'Female',
  },
];
export const PRIVATE_MANAGEMENT = Object.values(ROLE_NAME);
