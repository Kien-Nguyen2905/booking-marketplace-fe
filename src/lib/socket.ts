'use client';
import { io } from 'socket.io-client';
import envConfig from '../../config';
import { getAccessTokenLocalStorage } from './utils';

export const generateSocketInstance = () => {
  if (typeof window === 'undefined') return undefined;
  const accessToken = getAccessTokenLocalStorage();
  return io(envConfig.NEXT_PUBLIC_API_ENDPOINT, {
    extraHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
