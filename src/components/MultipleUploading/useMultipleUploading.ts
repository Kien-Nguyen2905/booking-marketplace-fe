'use client';

import { ImageListType } from 'react-images-uploading';
import { useEffect, useState } from 'react';
import { usePresignedUploadImageMutation } from '@/queries';
import { useUploadImageWithPresignedUrlMutation } from '@/queries';
import { TUseMultipleUploading } from './type';
import { showToast } from '@/lib/toast';

export const useMultipleUploading = (props?: TUseMultipleUploading) => {
  const { initialImages, maxNumber } = props || {};
  const { mutateAsync: presignedUploadImage } =
    usePresignedUploadImageMutation();
  const { mutateAsync: uploadImageWithPresignedUrl } =
    useUploadImageWithPresignedUrlMutation();

  // Image list consumed by <ImageUploading/>
  const [images, setImages] = useState<ImageListType>([]);

  // Track overall uploading state
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState('');
  // Load initial images once (for edit scenario)
  useEffect(() => {
    if (!initialImages || initialImages.length === 0) return;
    // Map provided initialImages into the shape expected by react-images-uploading
    // They already contain dataURL that points to a remote url on S3
    const formatted: ImageListType = initialImages.map((img: any) => ({
      dataURL: img.dataURL || img.url || '', // fallback just in case
      file: undefined, // no local file -> remote already exists
      isExist: img.isExist,
    }));
    setImages(formatted);

    // We explicitly want this effect to run whenever initialImages changes
  }, [initialImages]);

  // Update local state whenever user adds / updates / removes images
  const onImageChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const uploadAllImages = async (
    minNumber?: number,
  ): Promise<string[] | undefined> => {
    const required = minNumber ?? maxNumber ?? 0;
    if (images.length < required) {
      showToast({
        type: 'error',
        message: `Please add at least ${required} images`,
      });
      setError(`Please add at least ${required} images`);
      return;
    }

    setUploadingImages(true);

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

    // `results` has the SAME length & order as `images` so we can safely cast
    // here. We also update our local state so subsequent edits do NOT re-upload
    // these images again.
    const refreshedImageList: ImageListType = uploadedUrls.map((url) => ({
      dataURL: url,
      file: undefined,
      isExist: true,
    }));

    setImages(refreshedImageList);
    setUploadingImages(false);
    return uploadedUrls;
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
