import { GetUserProfileResType } from '@/models';

export type TProfileHeaderProps = {
  profile: GetUserProfileResType;
};

export type TCropAvatarProps = {
  showCrop: boolean;
  setShowCrop: (showCrop: boolean) => void;
  images: ImageListType;
  crop: Crop;
  setCrop: (crop: Crop) => void;
  completedCrop: PixelCrop;
  setCompletedCrop: (completedCrop: PixelCrop) => void;
  imgRef: React.RefObject<HTMLImageElement | null>;
  handleUploadImage: () => void;
  isUploadingImage: boolean;
};
