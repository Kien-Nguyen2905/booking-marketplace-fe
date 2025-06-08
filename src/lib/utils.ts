import { AccessTokenPayload } from '@/types/jwt.type';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import jwt from 'jsonwebtoken';
import { COOKIE_NAMES, LIMIT, LOCAL_STORAGE, ROUTES } from '@/constants';
import Cookies from 'js-cookie';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';

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

export const setParamsDefault = (params: URLSearchParams) => {
  params.set('limit', LIMIT);
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
  startDate = new Date(),
  endDate = addDays(new Date(), 1),
  adult = 1,
  available = 1,
}: {
  hotelId?: string | number;
  provinceCode?: string | number;
  startDate?: Date;
  endDate?: Date;
  adult?: number;
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
