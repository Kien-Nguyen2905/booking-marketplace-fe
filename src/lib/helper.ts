'use client';
import { showToast } from '@/lib/toast';
import { UseFormSetError } from 'react-hook-form';
import { PixelCrop } from 'react-image-crop';
import {
  ERROR_MESSAGES,
  MANAGEMENT_NAV_LINKS,
  ROLE_NAME,
  ROUTES,
} from '@/constants';

export const handleErrorApi = ({
  error,
  setError,
  setErrorText,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  setErrorText?: (value: string) => void;
  duration?: number;
}) => {
  if (error.status === 422 && (setError || setErrorText)) {
    if (Array.isArray(error.response.data.message)) {
      error.response.data.message.forEach((item: any) => {
        if (setError) {
          setError(item.path, {
            type: 'server',
            message: item.message,
          });
          return;
        }
        if (setErrorText) {
          setErrorText(item.message);
          return;
        }
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

export const navigateWithLogin = ({
  data,
  setIsAuthenticated,
  setTokensLocalStorage,
  setRoleNameCookies,
  decodeToken,
  setRole,
  router,
}: {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  setIsAuthenticated: (value: boolean) => void;
  setTokensLocalStorage: (value: {
    accessToken: string;
    refreshToken: string;
  }) => void;
  setRoleNameCookies: (value: {
    accessToken: string;
    refreshToken: string;
  }) => void;
  decodeToken: (value: string) => {
    roleName: string;
  };
  setRole: (value: string) => void;
  router: {
    push: (path: string) => void;
  };
}) => {
  const accessToken = data.accessToken;
  const refreshToken = data.refreshToken;
  if (accessToken && refreshToken) {
    setIsAuthenticated(true);
    setTokensLocalStorage({ accessToken, refreshToken });
    setRoleNameCookies({ accessToken, refreshToken });

    const decodedAccessToken = decodeToken(accessToken);
    setRole(decodedAccessToken.roleName);

    // Navigate based on user role
    const redirectPath =
      decodedAccessToken.roleName === ROLE_NAME.CUSTOMER ||
      decodedAccessToken.roleName === ROLE_NAME.PARTNER
        ? ROUTES.HOME
        : MANAGEMENT_NAV_LINKS[decodedAccessToken.roleName].ROOT.href;
    router.push(redirectPath || ROUTES.HOME);
  }
};
