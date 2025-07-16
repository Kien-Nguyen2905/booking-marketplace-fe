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
  ROOM_NOT_AVAILABLE: 'Room is not available',
  COUPON_NOT_FOUND: 'Coupon not found',
  POINT_NOT_ENOUGH: 'Point not enough',
  POLICY_NOT_ALLOW_BOOKING: 'Policy not allow booking more than 5 rooms',
  BANK_INFO: 'Please update profile bank information',
  USER_BANK_INFO_INCOMPLETE: 'User bank information is not complete',
  SELECT_ROOM_TYPE: 'Please select at least one bedroom',
};

export const ERROR_AUTH_MESSAGES = {
  email: {
    required: 'Email is required',
    invalid: 'Email is invalid',
    maxLength: 'Email must not exceed 255 characters',
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 6 characters long',
    maxLength: 'Password must not exceed 50 characters',
  },
  fullName: {
    required: 'Full name is required',
    minLength: 'Full name must be at least 2 characters long',
    maxLength: 'Full name must not exceed 255 characters',
    invalidCharacters: 'Full name must only contain letters',
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
    invalidCharacters: 'Phone number must only contain numbers',
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
    invalidCharacters: 'Bank name must only contain letters',
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
    invalidNumber: 'Invalid province code',
  },
  districtCode: {
    required: 'District code is required',
    invalidNumber: 'Invalid district code',
  },
  wardCode: {
    required: 'Ward code is required',
    invalidNumber: 'Invalid ward code',
  },
  companyName: {
    maxLength: 'Company name must not exceed 255 characters',
  },
  bankName: {
    invalidCharacters: 'Bank name must only contain letters',
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
  lat: {
    required: 'Latitude is required',
  },
  lon: {
    required: 'Longitude is required',
  },
};

export const ERROR_ROOM_TYPE_MESSAGES = {
  type: {
    required: 'Type is required',
    maxLength: 'Type must not exceed 100 characters',
  },
  adults: {
    required: 'Adults is required',
    min: 'Adults must be a than 0 number',
  },
  child: {
    required: 'Child is required',
    min: 'Child must be a than 0 number',
  },
  area: {
    required: 'Area is required',
    min: 'Area must be a than 10',
  },
  description: {
    required: 'Description is required',
    maxLength: 'Description must not exceed 255 characters',
  },
  serviceFeeRate: {
    required: 'Service fee rate is required',
    min: 'Service fee rate must be a than 0 number',
    max: 'Service fee rate must not exceed 100 percent',
  },
};

export const ERROR_ROOM_MESSAGES = {
  price: {
    min: 'Price must be a than 0',
    invalidNumber: 'Invalid price',
  },
  quantity: {
    min: 'Quantity must be a than or equal 0',
    invalidNumber: 'Invalid quantity',
  },
  rangeLimitDate: {
    invalidNumber: 'Invalid range limit date',
    max: 'Range limit date must not exceed 100 days',
    min: 'Range limit date must be a than 0',
  },
};

export const ERROR_PROMOTION_MESSAGES = {
  title: {
    required: 'Title is required',
    maxLength: 'Title must not exceed 100 characters',
  },
  percentage: {
    required: 'Percentage is required',
    min: 'Percentage must be a than 0',
    max: 'Percentage must not exceed 100 percent',
  },
  sharePercentage: {
    required: 'Share percentage is required',
    min: 'Share percentage must be from 0',
    max: 'Share percentage must not exceed 100 percent',
  },
  validFrom: {
    required: 'Valid from is required',
    min: 'Valid from must be from tomorrow',
  },
  validUntil: {
    required: 'Valid until is required',
  },
};

export const ERROR_COUPON_MESSAGES = {
  title: {
    required: 'Title is required',
    maxLength: 'Title must not exceed 100 characters',
  },
  description: {
    required: 'Description is required',
    maxLength: 'Description must not exceed 255 characters',
  },
  code: {
    invalid: 'Invalid code',
  },
  amount: {
    required: 'Amount is required',
    min: 'Amount must be a than 0',
    invalidNumber: 'Invalid amount',
  },
  percentage: {
    required: 'Percentage is required',
    min: 'Percentage must be a than 0',
    max: 'Percentage must not exceed 100 percent',
    invalidNumber: 'Invalid percentage',
  },
};

export const ERROR_ORDER_MESSAGES = {
  reason: {
    required: 'Reason is required',
  },
  cancel: {
    pastOrder: 'Cannot cancel past orders',
  },
  refund: {},
};

export const ERROR_REVIEW_MESSAGES = {
  title: {
    required: 'Title is required',
    maxLength: 'Title must not exceed 100 characters',
  },
  content: {
    required: 'Content is required',
    maxLength: 'Content must not exceed 255 characters',
  },
  rating: {
    required: 'Rating is required',
    min: 'Rating must be a than 0',
    max: 'Rating must not exceed 5',
  },
};
