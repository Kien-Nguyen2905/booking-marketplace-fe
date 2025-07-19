import { OptionType } from '@/components/PeopleSelector/type';

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

export type HotelTypeType = (typeof HOTEL_TYPE)[keyof typeof HOTEL_TYPE];

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

export const COUNT_DESTINATION_LIST = [79, 77, 48, 1, 56, 68, 49];

export const DESTINATIONS = [
  {
    provinceCode: 79,
    name: 'Hồ Chí Minh',
    accommodations: 0,
    imageUrl:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=500&h=500&auto=format&fit=crop',
  },
  {
    provinceCode: 77,
    name: 'Vũng Tàu',
    accommodations: 0,
    imageUrl:
      'https://images.unsplash.com/photo-1676438859721-5508a3ca00db?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
];

export const RATING_LIST = [1, 2, 3, 4, 5];

export const SORT_OPTIONS_HOTEL = [
  {
    value: 'price-asc',
    label: 'Price: Low to High',
    orderBy: 'price',
    order: 'asc',
  },
  {
    value: 'price-desc',
    label: 'Price: High to Low',
    orderBy: 'price',
    order: 'desc',
  },
  {
    value: 'rating-desc',
    label: 'Highest Rated',
    orderBy: 'rating',
    order: 'desc',
  },
  {
    value: 'rating-asc',
    label: 'Lowest Rated',
    orderBy: 'rating',
    order: 'asc',
  },
];

export const PEOPLE_SELECTOR_OPTIONS: Readonly<Omit<OptionType, 'count'>[]> = [
  {
    id: 'adults',
    label: 'Adult',
    min: 1,
    max: 30,
    description: 'Ages 18+',
  },
  {
    id: 'children',
    label: 'Child',
    min: 0,
    max: 30,
    description: 'Ages 1-12',
  },
  {
    id: 'rooms',
    label: 'Room',
    min: 1,
    max: 30,
  },
] as const;

export const DEFAULT_PEOPLE_COUNT = {
  adults: 1,
  children: 0,
  rooms: 1,
} as const;

export const HOTEL_PARAMS = [
  'province',
  'start',
  'end',
  'adult',
  'child',
  'available',
  'type',
  'orderBy',
  'order',
  'rating',
];

export const AMENITY_CATEGORY_FILTER = [
  { value: 'ALL', label: 'All' },
  { value: 'PUBLIC', label: 'Public' },
  { value: 'SERVICE', label: 'Service' },
];

export const MOCK_HOTELS = [
  {
    id: 1,
    name: 'Riverside Hotel Saigon',
    description:
      'Khách sạn nằm bên sông Sài Gòn, trung tâm Quận 1, có nhà hàng và phòng hội nghị.',
    type: 'HOTEL',
    status: 'ACTIVE',
    partnerId: 101,
    provinceCode: 79,
    districtCode: 760,
    wardCode: 26734,
    address: '18-20 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, Hồ Chí Minh',
    hotelPhoneNumber: '02838229999',
    vat: 0.1,
    rating: 5.0,
    reputationScore: 83,
    images: [
      'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10027533-744c61916bbbabe20311732077ff9689.jpeg?_src=imagekit&tr=dpr-2,c-at_max,f-jpg,h-360,pr-true,q-80,w-640',
    ],
    room: [
      {
        price: 130000,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Bay Hotel Ho Chi Minh',
    description:
      'Khách sạn cao cấp gần Nhà hát Lớn, có hồ bơi trên tầng thượng.',
    type: 'APARTMENT',
    status: 'ACTIVE',
    partnerId: 102,
    provinceCode: 79,
    districtCode: 760,
    wardCode: 26734,
    address: '360 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, Hồ Chí Minh',
    hotelPhoneNumber: '02838271234',
    vat: 0.1,
    rating: 4.7,
    reputationScore: 89,
    room: [
      {
        price: 230000,
        roomType: { type: 'HOTEL' },
      },
    ],
    images: [
      'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10027533-a6f838f4747c88b2bf5fce5ff8dd199a.jpeg?_src=imagekit&tr=dpr-2,c-at_max,f-jpg,h-360,pr-true,q-80,w-640',
    ], // ví dụ từ Bay Hotel :contentReference[oaicite:2]{index=2}
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Rex Villa Saigon',
    description:
      'Khách sạn lịch sử nằm trên phố Nguyễn Huệ, có hồ bơi và sân tennis.',
    type: 'VILLA',
    status: 'ACTIVE',
    partnerId: 103,
    provinceCode: 79,
    districtCode: 760,
    wardCode: 26734,
    address: '141 Nguyễn Huệ, Phường Bến Nghé, Quận 1, Hồ Chí Minh',
    hotelPhoneNumber: '02838230888',
    vat: 0.1,
    rating: 4.4,
    reputationScore: 90,
    images: [
      'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10027533-67fdde3a3a6627c57cc1a56313c75bee.jpeg?_src=imagekit&tr=dpr-2,c-at_max,f-jpg,h-360,pr-true,q-80,w-640',
    ], // từ Rex Hotel :contentReference[oaicite:3]{index=3}
    room: [
      {
        price: 310000,
        roomType: { type: 'HOTEL' },
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'M Resort Saigon',
    description: 'Khách sạn hiện đại, gần Takashimaya & chợ Bến Thành.',
    type: 'RESORT',
    status: 'ACTIVE',
    partnerId: 104,
    provinceCode: 79,
    districtCode: 760,
    wardCode: 26734,
    address: '28-30 Nguyễn Huệ, Phường Bến Nghé, Quận 1, Hồ Chí Minh',
    hotelPhoneNumber: '02838273333',
    vat: 0.1,
    rating: 4.5,
    reputationScore: 88,
    images: [
      'https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20068282-a7be23d8293161915c5e690cb2691570.png?_src=imagekit&tr=dpr-2,c-at_max,f-jpg,h-360,pr-true,q-80,w-640',
    ], // từ M Hotel :contentReference[oaicite:4]{index=4}
    room: [
      {
        price: 100000,
        roomType: { type: 'HOTEL' },
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'GK Central Hotel',
    description: 'Khách sạn 4* sang trọng, view phố, trung tâm Quận 1.',
    type: 'HOTEL',
    status: 'ACTIVE',
    partnerId: 105,
    provinceCode: 79,
    districtCode: 760,
    wardCode: 26734,
    address: '92-94 Lý Tự Trọng, Phường Bến Nghé, Quận 1, Hồ Chí Minh',
    hotelPhoneNumber: '02839231111',
    vat: 0.1,
    rating: 4.2,
    reputationScore: 84,
    images: [
      'https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/10024089-fcb83430fb65d4bb339fdddc3d7d1741.jpeg?_src=imagekit&tr=dpr-2,c-at_max,f-jpg,h-360,pr-true,q-80,w-640',
    ], // từ GK Central :contentReference[oaicite:5]{index=5}
    room: [
      {
        price: 500000,
        roomType: { type: 'HOTEL' },
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: 'Beautiful Saigon Hotel',
    description: 'Khách sạn boutique 3*, nằm ở trung tâm Quận 1.',
    type: 'HOTEL',
    status: 'ACTIVE',
    partnerId: 106,
    provinceCode: 79,
    districtCode: 760,
    wardCode: 26734,
    address: 'XX Phạm Ngọc Thạch, Phường Bến Nghé, Quận 1, Hồ Chí Minh',
    hotelPhoneNumber: '02838279999',
    vat: 0.1,
    rating: 4.3,
    reputationScore: 86,
    images: ['https://cf.bstatic.com/image_hosting/beautifulsaigon.jpg'], // traveloka :contentReference[oaicite:6]{index=6}
    room: [{}],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 7,
    name: 'Old Saigon Hotel',
    description: 'Khách sạn nhỏ tại Quận 7, giá rẻ, phù hợp lưu trú ngắn ngày.',
    type: 'HOTEL',
    status: 'ACTIVE',
    partnerId: 107,
    provinceCode: 79,
    districtCode: 770,
    wardCode: 27404,
    address: '31 Cao Triều Phát, Phường Tân Phong, Quận 7, Hồ Chí Minh',
    hotelPhoneNumber: '02854123456',
    vat: 0.08,
    rating: 4.0,
    reputationScore: 80,
    images: ['https://cf.bstatic.com/image_hosting/oldsaigon.jpg'], // từ Booking.com :contentReference[oaicite:7]{index=7}
    room: [{}],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 8,
    name: 'FUN HOTEL',
    description:
      'Khách sạn gia đình với phòng rộng, ban công, có hồ bơi và bar.',
    type: 'HOTEL',
    status: 'ACTIVE',
    partnerId: 108,
    provinceCode: 79,
    districtCode: 770,
    wardCode: 27405,
    address: 'Phường Phú Mỹ, Quận 7, Hồ Chí Minh',
    hotelPhoneNumber: '02854567890',
    vat: 0.1,
    rating: 4.6,
    reputationScore: 92,
    images: ['https://cf.bstatic.com/image_hosting/funhotel.jpg'], // từ FUN HOTEL :contentReference[oaicite:8]{index=8}
    room: [{}],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 9,
    name: 'VND Hotel',
    description:
      'Khách sạn nhỏ 2*, có xe đạp miễn phí, phù hợp du lịch tiết kiệm.',
    type: 'HOSTEL',
    status: 'ACTIVE',
    partnerId: 109,
    provinceCode: 79,
    districtCode: 760,
    wardCode: 26734,
    address: 'XXX Nguyễn Huệ, Phường Bến Nghé, Quận 1, Hồ Chí Minh',
    hotelPhoneNumber: '02838275555',
    vat: 0.05,
    rating: 4.1,
    reputationScore: 82,
    images: ['https://cf.bstatic.com/image_hosting/vndhotel.jpg'], // từ VND Hotel :contentReference[oaicite:9]{index=9}
    room: [{}],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 10,
    name: 'Saigon Hotel Corporation',
    description:
      'Khách sạn tiện nghi đối diện Nhà thờ Đức Bà, có phòng sauna & spa.',
    type: 'HOTEL',
    status: 'ACTIVE',
    partnerId: 110,
    provinceCode: 79,
    districtCode: 760,
    wardCode: 26734,
    address: '19 Công xã Paris, Phường Bến Nghé, Quận 1, Hồ Chí Minh',
    hotelPhoneNumber: '02838274444',
    vat: 0.1,
    rating: 4.5,
    reputationScore: 88,
    images: ['https://cf.bstatic.com/image_hosting/saigonhotel.jpg'], // từ Booking.com :contentReference[oaicite:10]{index=10}
    room: [{}],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
