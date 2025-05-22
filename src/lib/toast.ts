import { JSX } from 'react';
import { toast } from 'react-toastify';
export type TToast = {
  type: 'error' | 'success' | 'info' | 'warning';
  message: string;
};

export function showToast({ type, message }: TToast) {
  toast[type](message);
}

export function showCustomToast(Component: JSX.Element) {
  toast(Component, {
    position: 'top-right',
    autoClose: false,
  });
}
