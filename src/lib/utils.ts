import { AccessTokenPayload } from '@/types/jwt.type';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import jwt from 'jsonwebtoken';
import { COOKIE_NAMES, LOCAL_STORAGE } from '@/constants';
import Cookies from 'js-cookie';

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
  Cookies.set(COOKIE_NAMES.ROLE, decodedAccessToken.roleName, {
    path: '/',
    sameSite: 'lax',
    secure: true,
    expires: decodedRefreshToken.exp * 1000,
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
