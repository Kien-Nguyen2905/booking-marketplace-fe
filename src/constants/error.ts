export const ERROR_MESSAGES = {
  FILE: {
    SIZE_EXCEEDS_LIMIT: 'File size exceeds the limit of 3MB',
    NO_2D_CONTEXT: 'No 2d context',
    CANVAS_EMPTY: 'Canvas is empty',
  },
  SOMETHING_WRONG: 'Something went wrong',
  SEND_MAIL: 'Failed to send mail',
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
    minLength: 'Phone number must be at least 9 characters long',
    maxLength: 'Phone number must not exceed 20 characters',
  },
};
