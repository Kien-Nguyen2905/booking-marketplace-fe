'use client';

import { ImageListType } from 'react-images-uploading';
import { Dispatch, SetStateAction, useState } from 'react';
import { usePresignedUploadImageMutation } from '@/queries';
import { useUploadImageWithPresignedUrlMutation } from '@/queries';
import { showToast } from '@/lib/toast';
import { handleErrorApi } from '@/lib/helper';

export type TUploader = {
  images: ImageListType;
  setImages: Dispatch<SetStateAction<ImageListType>>;
  uploadingImages: boolean;
  setUploadingImages: Dispatch<SetStateAction<boolean>>;
  onImageChange: (imageList: ImageListType) => void;
  uploadAllImages: () => Promise<string[] | undefined>;
  error: string;
};

export const useUploadMultipleImages = (minNumber?: number): TUploader => {
  const { mutateAsync: presignedUploadImage } =
    usePresignedUploadImageMutation();
  const { mutateAsync: uploadImageWithPresignedUrl } =
    useUploadImageWithPresignedUrlMutation();

  // Image list consumed by <ImageUploading/>
  const [images, setImages] = useState<ImageListType>([]);

  // Track overall uploading state
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState('');

  // Update local state whenever user adds / updates / removes images
  const onImageChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const uploadAllImages = async (): Promise<string[] | undefined> => {
    const required = minNumber ?? 0;
    if (images.length < required) {
      showToast({
        type: 'error',
        message: `Please add at least ${required} images`,
      });
      setError(`Please add at least ${required} images`);
      return;
    }

    setUploadingImages(true);
    try {
      // 1. Upload images. For remote images (no file) we simply
      // keep the same URL, for local images we request a presigned URL then
      // upload.
      const uploadPromises = images.map(async (image) => {
        // For existing images (no file property), just return the URL
        if (!image.file && image.dataURL) {
          return image.dataURL;
        }

        // For new uploads, process with presigned URL
        if (image.file) {
          // Step 1: Get presigned URL
          const presignedResponse = await presignedUploadImage({
            filename: image.file.name,
            filesize: image.file.size,
          });

          // Step 2: Upload file to storage
          await uploadImageWithPresignedUrl({
            croppedBlob: image.file,
            presignedUrl: presignedResponse.data.data.presignedUrl,
          });

          // Return the image URL
          return presignedResponse.data.data.url;
        }

        return null;
      });

      // Wait for all uploads to complete
      const results = await Promise.all(uploadPromises);
      const uploadedUrls = results.filter(Boolean) as string[];
      setError('');
      // `results` has the SAME length & order as `images` so we can safely cast
      // here. We also update our local state so subsequent edits do NOT re-upload
      // these images again.
      const refreshedImageList: ImageListType = uploadedUrls.map((url) => ({
        dataURL: url,
        file: undefined,
        isExist: true,
      }));

      setImages(refreshedImageList);
      return uploadedUrls;
    } catch (error) {
      handleErrorApi({ error, setErrorText: setError });
    } finally {
      setUploadingImages(false);
    }
  };

  return {
    images,
    setImages,
    uploadingImages,
    setUploadingImages,
    onImageChange,
    uploadAllImages,
    error,
  };
};
