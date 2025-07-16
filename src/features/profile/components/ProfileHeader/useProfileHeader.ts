import { getCroppedImg, handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import {
  useUpdateProfileMutation,
  usePresignedUploadImageMutation,
  useUploadImageWithPresignedUrlMutation,
  useDeleteFilesMutation,
} from '@/queries';
import { useState, useRef, useEffect } from 'react';
import { ImageListType } from 'react-images-uploading';
import { useAppContext } from '@/context/AppProvider';
import { Crop, PixelCrop } from 'react-image-crop';
import { SUCCESS_PROFILE_MESSAGES } from '@/constants';

export const useProfileHeader = () => {
  const { profile } = useAppContext();
  const { mutateAsync: updateProfile, isPending: isLoading } =
    useUpdateProfileMutation();
  const { mutateAsync: presignedUploadImage } =
    usePresignedUploadImageMutation();
  const {
    mutateAsync: uploadImageWithPresignedUrl,
    isPending: isUploadingImage,
  } = useUploadImageWithPresignedUrlMutation();
  const { mutateAsync: deleteFiles } = useDeleteFilesMutation();
  const [isHovered, setIsHovered] = useState(false);
  const [images, setImages] = useState<ImageListType>([]);
  const [existImage, setExistImage] = useState('');
  // Crop related state
  const [showCrop, setShowCrop] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageChange = async (imageList: ImageListType) => {
    setImages(imageList);
    if (imageList.length > 0 && imageList[0].dataURL) {
      setShowCrop(true);
      setTimeout(() => {
        if (imgRef.current) {
          const { width, height } = imgRef.current;
          const minSize = Math.min(width, height);
          const cropSize = minSize * 0.8; // 80% of the smallest dimension
          const x = (width - cropSize) / 2;
          const y = (height - cropSize) / 2;
          setCrop({
            unit: 'px',
            x,
            y,
            width: cropSize,
            height: cropSize,
          });
        }
      }, 100);
    }
  };

  const handleUploadImage = async () => {
    if (!completedCrop || !imgRef.current || !images[0].file) {
      return;
    }
    if (!profile) {
      return;
    }
    try {
      // Get the cropped image as a blob
      const croppedBlob = await getCroppedImg(imgRef.current, completedCrop);
      const croppedFile = new File([croppedBlob], images[0].file.name, {
        type: 'image/jpeg',
      });

      const { data } = await presignedUploadImage({
        filename: croppedFile.name,
        filesize: croppedFile.size,
      });
      const response = await uploadImageWithPresignedUrl({
        croppedBlob,
        presignedUrl: data.data.presignedUrl,
      });
      if (response.status === 200) {
        setShowCrop(false);
        const response = await updateProfile({
          fullName: profile?.fullName || '',
          phoneNumber: profile?.phoneNumber || '',
          address: profile?.address || null,
          gender: profile?.gender || null,
          birthday: profile?.birthday || null,
          avatar: data.data.url,
          accountNumber: profile?.accountNumber || null,
          bankAccount: profile?.bankAccount || null,
          bankName: profile?.bankName || null,
        });
        if (response.data.data) {
          if (existImage) {
            await deleteFiles({
              oldFileKeys: [existImage],
            });
          }
          showToast({
            type: 'success',
            message: SUCCESS_PROFILE_MESSAGES.AVATAR_UPDATED_SUCCESS,
          });
        }
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  useEffect(() => {
    if (!showCrop && images.length > 0) {
      setImages([]);
    }
    if (profile?.avatar) {
      setExistImage(profile.avatar);
    }
  }, [showCrop, images.length, profile]);

  const cropAvatarProps = {
    showCrop,
    setShowCrop,
    images,
    crop,
    setCrop,
    completedCrop,
    setCompletedCrop,
    imgRef,
    handleUploadImage,
    isUploadingImage,
  };
  return {
    images,
    onImageChange,
    isHovered,
    setIsHovered,
    profile,
    cropAvatarProps,
    isLoading,
  };
};
