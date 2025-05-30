import { useState } from 'react';
import { ImageListType } from 'react-images-uploading';
import {
  usePresignedUploadImageMutation,
  useUploadImageWithPresignedUrlMutation,
} from '@/queries';
import { showToast } from '@/lib/toast';
import { handleErrorApi } from '@/lib/helper';

/**
 * Generic hook to upload a mixed list of existing (remote) and newly-selected (local) images.
 *
 * It uploads the **local** files to S3 via a presigned URL and returns **ONLY**
 * the remote URLs – preserving the original order of the input list.
 *
 * This hook is UI-agnostic and can therefore be reused in any place where you
 * need to upload multiple images (forms, wizards, etc.).
 */
export const useUploadMultipleImages = () => {
  const { mutateAsync: presignedUploadImage } =
    usePresignedUploadImageMutation();
  const { mutateAsync: uploadImageWithPresignedUrl } =
    useUploadImageWithPresignedUrlMutation();

  const [uploadingImages, setUploadingImages] = useState(false);

  /**
   * Upload images and receive remote URLs.
   *
   * @param images     The list of images coming from react-images-uploading.
   * @param maxNumber  Optional validation: minimum number of images required.
   * @returns          Promise resolving to an array of remote image URLs.
   */
  const uploadImages = async (
    images: ImageListType,
    maxNumber?: number,
    minNumber?: number,
    setError?: (message: string) => void,
  ): Promise<string[] | undefined> => {
    const required = minNumber ?? maxNumber ?? 0;
    if (images.length < required) {
      showToast({
        type: 'error',
        message: `Please add at least ${required} images`,
      });
      setError?.(`Please add at least ${required} images`);
      return;
    }

    try {
      setUploadingImages(true);

      // 1. Upload images. For remote images (no file) we simply
      // keep the same URL, for local images we request a presigned URL then
      // upload.
      const uploadPromises = images.map(async (image) => {
        // Existing remote image – keep the same URL
        if (!image.file && image.dataURL) {
          return image.dataURL;
        }

        if (image.file) {
          // 1. Request a presigned URL for this file
          const presignedResponse = await presignedUploadImage({
            filename: image.file.name,
            filesize: image.file.size,
          });

          // 2. PUT upload to S3 (or the relevant storage) using the presigned URL
          await uploadImageWithPresignedUrl({
            croppedBlob: image.file,
            presignedUrl: presignedResponse.data.data.presignedUrl,
          });

          // 3. Return the public URL provided by the server
          return presignedResponse.data.data.url;
        }

        return null;
      });

      const results = await Promise.all(uploadPromises);
      // filter Boolean keeps order while excluding nulls
      return results.filter(Boolean) as string[];
    } catch (error) {
      handleErrorApi({ error });
    } finally {
      setUploadingImages(false);
    }
  };

  return { uploadImages, uploadingImages };
};
