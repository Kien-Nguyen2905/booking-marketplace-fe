'use client';
import { SOMETHING_WRONG } from '@/constants';
import { showToast } from '@/lib/toast';
import { UseFormSetError } from 'react-hook-form';

export const handleErrorApi = ({
  error,
  setError,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error.status === 422 && setError) {
    if (Array.isArray(error.response.data.message)) {
      error.response.data.message.forEach((item: any) => {
        console.log(item.path);
        setError(item.path, {
          type: 'server',
          message: item.message,
        });
      });
    } else {
      showToast({
        type: 'error',
        message: error?.response.data.message ?? SOMETHING_WRONG,
      });
    }
  } else {
    console.log(error);
    showToast({
      type: 'error',
      message: error?.response?.data?.message ?? SOMETHING_WRONG,
    });
  }
};
