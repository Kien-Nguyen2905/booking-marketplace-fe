'use client';
import { showToast } from '@/lib/toast';
import { UseFormSetError } from 'react-hook-form';
import { PixelCrop } from 'react-image-crop';
import { ERROR_MESSAGES } from '@/constants';

export const handleErrorApi = ({
  error,
  setError,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  console.log(error);
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
        message: error?.response.data.message ?? ERROR_MESSAGES.SOMETHING_WRONG,
      });
    }
  } else {
    showToast({
      type: 'error',
      message: error?.response?.data?.message ?? ERROR_MESSAGES.SOMETHING_WRONG,
    });
  }
};

// Function to get cropped image as a blob
export const getCroppedImg = (image: HTMLImageElement, crop: PixelCrop) => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error(ERROR_MESSAGES.FILE.NO_2D_CONTEXT);
  }

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error(ERROR_MESSAGES.FILE.CANVAS_EMPTY));
          return;
        }
        resolve(blob);
      },
      'image/jpeg',
      0.95,
    );
  });
};
