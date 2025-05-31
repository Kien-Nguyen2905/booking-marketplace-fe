export const ERROR_MESSAGES = {
  FILE: {
    SIZE_EXCEEDS_LIMIT: 'File size must be less than 1MB',
    NO_2D_CONTEXT: 'No 2d context',
    CANVAS_EMPTY: 'Canvas is empty',
    MAX_NUMBER_EXCEEDED: 'Maximum number of files exceeded',
    INVALID_TYPE: 'Invalid file type',
  },
  SOMETHING_WRONG: 'Something went wrong',
  NEED_VERIFY_2FA: 'You need to verify two-factor authentication',
  UPLOAD_ERROR: 'Upload error',
  NOT_FOUND_REFRESH_TOKEN: 'Not found refresh token',
};

export const ERROR_AUTH_MESSAGES = {
  email: {
    required: 'Email is required',
    invalid: 'Email is invalid',
    maxLength: 'Email must not exceed 100 characters',
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 6 characters long',
    maxLength: 'Password must not exceed 50 characters',
  },
  fullName: {
    required: 'Full name is required',
    minLength: 'Full name must be at least 2 characters long',
    maxLength: 'Full name must not exceed 100 characters',
    invalidCharacters:
      'Full name must only contain letters, without numbers or special characters.',
  },
  confirmPassword: {
    required: 'Confirm password is required',
    minLength: 'Confirm password must be at least 6 characters long',
    maxLength: 'Confirm password must not exceed 50 characters',
    mismatch: 'Password and confirm password must match',
  },
  code: {
    required: 'OTP code is required',
    length: 'OTP code must be exactly 6 characters',
  },
  newPassword: {
    required: 'New password is required',
    minLength: 'New password must be at least 6 characters long',
    maxLength: 'New password must not exceed 50 characters',
  },
  confirmNewPassword: {
    required: 'Confirm new password is required',
    minLength: 'Confirm new password must be at least 6 characters long',
    maxLength: 'Confirm new password must not exceed 50 characters',
    mismatch: 'New password and confirm new password must match',
  },
  totpCode: {
    length: '2FA code must be exactly 6 characters',
    invalid: 'Invalid OTP 2FA code',
  },
  phoneNumber: {
    required: 'Phone number is required',
    minLength: 'Phone number must be at least 9 characters long',
    maxLength: 'Phone number must not exceed 20 characters',
  },
  accountNumber: {
    required: 'Account number is required',
    maxLength: 'Account number must not exceed 100 characters',
  },
  bankAccount: {
    required: 'Bank account is required',
    maxLength: 'Bank account must not exceed 100 characters',
  },
  bankName: {
    required: 'Bank name is required',
    maxLength: 'Bank name must not exceed 255 characters',
  },
};

export const ERROR_PARTNER_MESSAGES = {
  idCard: {
    required: 'ID card is required',
    maxLength: 'ID card must not exceed 50 characters',
    invalid: 'ID card must only contain  character numbers',
  },
  gender: {
    required: 'Gender is required',
    maxLength: 'Gender must not exceed 10 characters',
  },
  address: {
    required: 'Address is required',
  },
  provinceCode: {
    required: 'Province code is required',
  },
  districtCode: {
    required: 'District code is required',
  },
  wardCode: {
    required: 'Ward code is required',
  },
  companyName: {
    maxLength: 'Company name must not exceed 255 characters',
  },
  bankName: {
    invalidCharacters:
      'Bank name must only contain letters, without numbers or special characters.',
  },
};

export const ERROR_HOTEL_MESSAGES = {
  name: {
    required: 'Hotel name is required',
    maxLength: 'Hotel name must not exceed 255 characters',
  },
  hotelPhoneNumber: {
    required: 'Hotel phone number is required',
    maxLength: 'Hotel phone number must not exceed 20 characters',
  },
  address: {
    required: 'Address is required',
  },
  description: {
    required: 'Description is required',
  },
  images: {
    required: 'Images is required',
    min: 'Images must have at least 5 images',
  },
  vat: {
    invalidNumber: 'Invalid VAT',
    required: 'VAT is required',
    min: 'VAT must be at least 0 percent',
    max: 'VAT must not exceed 100 percent',
  },
  type: {
    required: 'Type is required',
  },
};
