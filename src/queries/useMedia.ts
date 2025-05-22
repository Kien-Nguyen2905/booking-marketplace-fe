import mediaServices from '@/services/media/mediaServices';
import { useMutation } from '@tanstack/react-query';

export const usePresignedUploadImageMutation = () => {
  return useMutation({
    mutationFn: mediaServices.presignedUploadImage,
  });
};

export const useUploadImageWithPresignedUrlMutation = () => {
  return useMutation({
    mutationFn: mediaServices.uploadImageWithPresignedUrl,
  });
};
