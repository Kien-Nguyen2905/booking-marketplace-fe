export const HOTEL_STATUS = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export type HotelStatusType = (typeof HOTEL_STATUS)[keyof typeof HOTEL_STATUS];

export const HOTEL_TYPE = {
  HOTEL: 'HOTEL',
  HOSTEL: 'HOSTEL',
  APARTMENT: 'APARTMENT',
  GUESTHOUSE: 'GUESTHOUSE',
  HOMESTAY: 'HOMESTAY',
  VILLA: 'VILLA',
  RESORT: 'RESORT',
} as const;

export const HOTEL_TYPE_LIST = Object.values(HOTEL_TYPE).map((value) => ({
  value,
  label: value,
}));

export const HOTEL_STATUS_LIST = Object.values(HOTEL_STATUS).map((value) => ({
  value: value.toLowerCase(),
  label: value,
}));
