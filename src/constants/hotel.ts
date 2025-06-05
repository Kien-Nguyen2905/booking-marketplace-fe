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
  HOME_STAY: 'HOME_STAY',
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

export const MAP_HOTEL_TYPE = {
  HOTEL: 'Hotel',
  HOSTEL: 'Hostel',
  APARTMENT: 'Apartment',
  GUESTHOUSE: 'Guesthouse',
  HOME_STAY: 'Homestay',
  VILLA: 'Villa',
  RESORT: 'Resort',
};

export const COUNT_DESTINATION_LIST = [79, 48, 1, 56, 68, 49, 91];

export const DESTINATIONS = [
  {
    provinceCode: 79,
    name: 'Hồ Chí Minh',
    accommodations: 0,
    imageUrl:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=500&h=500&auto=format&fit=crop',
  },
  {
    provinceCode: 48,
    name: 'Đà Nẵng',
    accommodations: 0,
    imageUrl:
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=500&h=500&auto=format&fit=crop',
  },
  {
    provinceCode: 1,
    name: 'Hà Nội',
    accommodations: 0,
    imageUrl:
      'https://images.unsplash.com/photo-1616486410185-81af2d32a2af?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    provinceCode: 56,
    name: 'Khánh Hòa',
    accommodations: 0,
    imageUrl:
      'https://images.unsplash.com/photo-1565357227346-6984575df207?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    provinceCode: 68,
    name: 'Đà Lạt',
    accommodations: 0,
    imageUrl:
      'https://images.unsplash.com/photo-1706498628432-35dbe82bee7b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    provinceCode: 49,
    name: 'Quảng Nam',
    accommodations: 0,
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1690960644375-6f2399a08ebc?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    provinceCode: 91,
    name: 'Kiên Giang',
    accommodations: 0,
    imageUrl:
      'https://images.unsplash.com/photo-1676438859721-5508a3ca00db?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];
