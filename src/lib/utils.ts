import { AccessTokenPayload } from '@/types/jwt.type';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import jwt from 'jsonwebtoken';
import {
  COOKIE_NAMES,
  LIMIT,
  LOCAL_STORAGE,
  ORDER_STATUS,
  PERCENTAGE,
  ROUTES,
} from '@/constants';
import Cookies from 'js-cookie';
import { addDays, format, parse } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { TBooking, TBookingInput, TProfitResult } from '@/types/booking.type';
import { CouponType } from '@/models/coupon.model';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const decodeToken = (token: string) => {
  return jwt.decode(token) as AccessTokenPayload;
};

export const getAccessTokenLocalStorage = () =>
  localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);

export const getRefreshTokenLocalStorage = () =>
  localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);

export const getRoleLocalStorage = () =>
  localStorage.getItem(LOCAL_STORAGE.ROLE);

export const setRoleLocalStorage = (role: string) =>
  localStorage.setItem(LOCAL_STORAGE.ROLE, role);

export const setTokensLocalStorage = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const decodeValue = decodeToken(accessToken);
  localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
  localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);
  localStorage.setItem(LOCAL_STORAGE.ROLE, decodeValue.roleName);
};

export const removeTokensLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE.ROLE);
};

export const setRoleNameCookies = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const decodedAccessToken = decodeToken(accessToken);
  const decodedRefreshToken = decodeToken(refreshToken);
  const expiresDate = new Date(decodedRefreshToken.exp * 1000);
  Cookies.set(COOKIE_NAMES.ROLE, decodedAccessToken.roleName, {
    path: '/',
    sameSite: 'lax',
    secure: true,
    expires: expiresDate,
  });
};

export const removeRoleNameCookies = () => {
  Cookies.remove(COOKIE_NAMES.ROLE);
};

export const setEmailLocalStorage = (value: string) =>
  localStorage.setItem(LOCAL_STORAGE.EMAIL, value);

export const removeEmailLocalStorage = () =>
  localStorage.removeItem(LOCAL_STORAGE.EMAIL);

export const getEmailLocalStorage = () =>
  localStorage.getItem(LOCAL_STORAGE.EMAIL);

export const getInitials = (name: string) => {
  const lengthArrayName = name.split(' ');
  return lengthArrayName[lengthArrayName.length - 1][0];
};

export const convertBirthdayToUTC = (birthday: Date) => {
  return `${birthday.getFullYear()}-${(birthday.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${birthday.getDate().toString().padStart(2, '0')}`;
};

export const setParamsDefault = (
  params: URLSearchParams,
  limit: string = LIMIT,
) => {
  params.set('limit', limit);
  params.set('page', '1');
  const newQueryString = params.toString();
  return newQueryString;
};

export const isOnlyDigits = (input: string): boolean => {
  return /^\d+$/.test(input);
};

export const isValidNumberString = (input: string): boolean => {
  return /^(0|[1-9]\d*)$/.test(input);
};

export const setPartnerLocalStorage = (value: boolean) => {
  localStorage.setItem(LOCAL_STORAGE.IS_PENDING_PARTNER, value.toString());
};

export const getPartnerLocalStorage = () =>
  localStorage.getItem(LOCAL_STORAGE.IS_PENDING_PARTNER);

export const removePartnerLocalStorage = () =>
  localStorage.removeItem(LOCAL_STORAGE.IS_PENDING_PARTNER);

export const formatCurrency = (
  value: number,
  currencyCode: string = 'VND',
): string => {
  if (!value && value !== 0) return '';

  // Handle different currency formatting cases
  switch (currencyCode) {
    case 'VND': {
      // Format VND without decimal places and with dot as thousands separator
      const formatted = new Intl.NumberFormat('vi-VN', {
        maximumFractionDigits: 0,
      }).format(value);
      return `${formatted} VND`;
    }
    case 'NOT_VND': {
      const formatted = new Intl.NumberFormat('vi-VN', {
        maximumFractionDigits: 0,
      }).format(value);
      return `${formatted}`;
    }

    case 'USD': {
      // Format USD with 2 decimal places
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    }
    default: {
      // Default formatting with the specified currency
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
      }).format(value);
    }
  }
};

export const formattedDateDisplay = (
  selectedDateRange: DateRange | undefined,
) => {
  if (!selectedDateRange?.from) return 'Select dates';

  if (!selectedDateRange.to) {
    return format(selectedDateRange.from, 'dd MMM yyyy');
  }

  return `${format(selectedDateRange.from, 'dd MMM yyyy')} - ${format(
    selectedDateRange.to,
    'dd MMM yyyy',
  )}`;
};

export const formattedPeopleDisplay = (
  selectedPeople: {
    id: string;
    count: number;
  }[],
) => {
  const adults = selectedPeople.find((p) => p.id === 'adults')?.count || 0;
  const children = selectedPeople.find((p) => p.id === 'children')?.count || 0;
  const rooms = selectedPeople.find((p) => p.id === 'rooms')?.count || 0;

  return `${adults} ${adults === 1 ? 'adult' : 'adults'}${
    children > 0 ? `, ${children} ${children === 1 ? 'child' : 'children'}` : ''
  }, ${rooms} ${rooms === 1 ? 'room' : 'rooms'}`;
};

export const getHotelUrl = ({
  hotelId,
  provinceCode,
  startDate = addDays(new Date(), 1),
  endDate = addDays(new Date(), 2),
  adult = 1,
  child = 0,
  available = 1,
}: {
  hotelId?: string | number;
  provinceCode?: string | number;
  startDate?: Date;
  endDate?: Date;
  adult?: number;
  child?: number;
  available?: number;
}) => {
  // Base URL - either hotel listing or specific hotel
  const baseUrl = hotelId ? `${ROUTES.HOTEL}/${hotelId}` : ROUTES.HOTEL;

  // Build query parameters
  const params = new URLSearchParams();

  // Add dates and guest info
  params.set('start', format(startDate, 'dd-MM-yyyy'));
  params.set('end', format(endDate, 'dd-MM-yyyy'));
  params.set('adult', adult.toString());
  if (child > 0) params.set('child', child.toString());
  params.set('available', available.toString());

  // Add province filter if provided
  if (provinceCode) {
    params.set('province', provinceCode.toString());
  }

  return `${baseUrl}?${params.toString()}`;
};

export const normalizeToUTC = (date: Date) => {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
};

export const saveBooking = (booking: TBooking): string => {
  const code = Math.random().toString(36).slice(2, 12); // mã 10 ký tự
  localStorage.setItem(`booking:${code}`, JSON.stringify(booking));
  return code;
};

export const getBooking = (code: string): TBooking | null => {
  const data = localStorage.getItem(`booking:${code}`);
  return data ? JSON.parse(data) : null;
};

export const clearBooking = (code: string) => {
  localStorage.removeItem(`booking:${code}`);
};
export const clearAllBookings = () => {
  if (typeof window === 'undefined') return;
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('booking:')) {
      localStorage.removeItem(key);
    }
  });
};

export const calculateCouponDiscount = (
  coupon: CouponType,
  baseAmount: number,
): number => {
  if (!coupon) return 0;
  if (coupon.percentage) {
    return Math.round(baseAmount * coupon.percentage);
  }
  return 0;
};

export const calculateBaseAmount = (
  price: number,
  available: number,
  nights: number,
): number => {
  return Math.round((price || 0) * available * nights);
};

export const calculateServiceFee = (
  baseAmount: number,
  serviceFeeRate: number = 0,
): number => {
  return Math.round(baseAmount * serviceFeeRate);
};

export const calculateVAT = (baseAmount: number, vatRate: number = 0) => {
  return Math.round(baseAmount * vatRate);
};

export const isDayDiscounted = (promotion: any, dateString: string) => {
  if (!promotion) return false;

  // Check if the date is within promotion period
  const dateParsed = parse(dateString, 'dd-MM-yyyy', new Date());
  const date = new Date(
    Date.UTC(
      dateParsed.getFullYear(),
      dateParsed.getMonth(),
      dateParsed.getDate(),
    ),
  );

  const validFrom = promotion.validFrom && new Date(promotion.validFrom);
  const validUntil = promotion.validUntil && new Date(promotion.validUntil);
  // Áp dụng nếu:
  // - ngày >= validFrom (bao gồm ngày bắt đầu)
  // - ngày < validUntil (không bao gồm ngày kết thúc)
  if (validFrom && validUntil) {
    return date >= validFrom && date < validUntil;
  }
  return false;
};

export const calculateTotalPromotionDiscount = (
  checkIn: Date,
  checkOut: Date,
  promotion: any,
  room: any,
  booking: any,
  nights: number,
) => {
  let totalPromotionDiscount = 0;
  Array.from({ length: nights }).map((_, index) => {
    const currentDate = new Date(checkIn);
    currentDate.setDate(currentDate.getDate() + index);
    const dateString = format(currentDate, 'dd-MM-yyyy');
    const isDiscounted = isDayDiscounted(promotion, dateString);
    if (isDiscounted) {
      totalPromotionDiscount +=
        (room?.price || 0) * booking.available * promotion.percentage;
    }
  });
  return Math.round(totalPromotionDiscount);
};

export const countDateDiscountPromotion = (
  checkIn: Date,
  promotion: any,
  nights: number,
) => {
  let countDateDiscount = 0;
  Array.from({ length: nights }).map((_, index) => {
    const currentDate = new Date(checkIn);
    currentDate.setDate(currentDate.getDate() + index);
    const dateString = format(currentDate, 'dd-MM-yyyy');
    const isDiscounted = isDayDiscounted(promotion, dateString);
    if (isDiscounted) {
      countDateDiscount += 1;
    }
  });
  return countDateDiscount;
};

/**
 * Tính toán giá trị đơn hàng và lợi nhuận cho sàn và đối tác
 * @param input Thông tin đơn hàng
 * @returns Kết quả bao gồm lợi nhuận sàn, đối tác, và các giá trị khác
 */

export const calculateBookingProfit = (input: TBookingInput): TProfitResult => {
  const {
    basePrice: P, // giá cơ bản * số phòng * số đêm
    numberOfNights: N, // số đêm
    promotionNights: K, // số đêm giảm giá
    promotionPercentage: Pr, // % giảm giá
    promotionSharePercentage: Sp, // % chia sẻ giảm giá
    serviceFeeRate: S_rate, // % phí dịch vụ
    vatRate: V_rate, // % VAT
    couponPercentage: C, // % coupon
    pointsDiscount: D_points, // điểm * 1000 ra thành tiền
  } = input;

  // Tính giảm giá từ promotion (D_p)
  const promotionDiscount = (P * K * Pr) / N;

  // Tính subtotal sau promotion
  const subtotalAfterPromotion = P * (1 - (K * Pr) / N + S_rate + V_rate);

  // Tính giảm giá từ coupon (D_c)
  const couponDiscount = C * P * (1 + S_rate + V_rate);

  // Tính giá trị cuối cùng khách trả
  const finalAmount = Math.round(
    subtotalAfterPromotion - couponDiscount - D_points,
  );

  // Tính lợi nhuận cơ bản của sàn (15%) và đối tác (85%)
  const platformBaseProfit = PERCENTAGE.COMMISSION * subtotalAfterPromotion;

  const partnerBaseProfit = PERCENTAGE.PARTNER * subtotalAfterPromotion;

  // Tính phần trợ giá từ promotion
  const promotionShare = Sp * promotionDiscount;

  // Tính lợi nhuận thực tế
  const platformProfit = Math.round(
    platformBaseProfit - promotionShare - couponDiscount - D_points,
  );

  const partnerProfit = Math.round(partnerBaseProfit + promotionShare);

  return {
    platformProfit,
    partnerProfit,
    finalAmount: finalAmount < 0 ? 0 : finalAmount,
    subtotalAfterPromotion,
    promotionDiscount,
    couponDiscount,
    pointsDiscount: D_points,
  };
};

/**
 * Kiểm tra tổng lợi nhuận sàn và đối tác có khớp với subtotal sau promotion không
 * @param result Kết quả từ calculateBookingProfit
 * @returns True nếu khớp, false nếu không
 */
export const verifyProfit = (result: TProfitResult): boolean => {
  const {
    platformProfit,
    partnerProfit,
    subtotalAfterPromotion,
    couponDiscount,
    pointsDiscount,
  } = result;
  const totalProfit =
    platformProfit + partnerProfit + couponDiscount + pointsDiscount;
  return Math.abs(totalProfit - subtotalAfterPromotion) < 0.01; // Chấp nhận sai số nhỏ do làm tròn
};

export const clearPaymentTimer = (orderId: string | null) => {
  localStorage.removeItem(
    orderId
      ? `${LOCAL_STORAGE.PAYMENT_TIMER}_${orderId}`
      : LOCAL_STORAGE.PAYMENT_TIMER,
  );
};

export const clearAllLocalStorage = () => {
  localStorage.clear();
};

export const toStartOfUTCDate = (date: Date): Date => {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
};

export const getColorStatus = (status?: string) => {
  switch (status) {
    case ORDER_STATUS.CONFIRMED:
      return 'text-green-600';
    case ORDER_STATUS.PENDING:
      return 'text-yellow-600';
    case ORDER_STATUS.FAILED:
      return 'text-red-600';
    case ORDER_STATUS.CANCELED:
      return 'text-red-600';
    case ORDER_STATUS.REFUNDED:
      return 'text-orange-600';
    case ORDER_STATUS.PENDING_REFUND:
      return 'text-orange-600';
    default:
      return 'text-gray-600';
  }
};

export const getNowUTC7 = (): Date =>
  new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }),
  );

export const setChatHistoryLocalStorage = (stringify: string) => {
  localStorage.setItem(LOCAL_STORAGE.CHAT_HISTORY, stringify);
};

export const getChatHistoryLocalStorage = () => {
  return localStorage.getItem(LOCAL_STORAGE.CHAT_HISTORY);
};

export const clearChatHistoryLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE.CHAT_HISTORY);
};

export const setVersionHotelLocalStorage = (
  code: string,
  stringify: string,
) => {
  localStorage.setItem(`${LOCAL_STORAGE.VERSION_HOTEL}_${code}`, stringify);
};

export const getVersionHotelLocalStorage = (code: string) => {
  return JSON.parse(
    localStorage.getItem(`${LOCAL_STORAGE.VERSION_HOTEL}_${code}`) || '{}',
  );
};

export const clearVersionHotelLocalStorage = (code: string) => {
  localStorage.removeItem(`${LOCAL_STORAGE.VERSION_HOTEL}_${code}`);
};

export const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const isInBoundingBox = (lat: number, lon: number, bbox: any) => {
  return (
    lat >= bbox.minLat &&
    lat <= bbox.maxLat &&
    lon >= bbox.minLon &&
    lon <= bbox.maxLon
  );
};
