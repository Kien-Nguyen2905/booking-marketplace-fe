import { ImageListType } from 'react-images-uploading';

export type TUploader = {
  images: ImageListType;
  onImageChange: (imageList: ImageListType) => void;
  error?: string | undefined;
  setImages?: (images: ImageListType) => void;
  maxNumber?: number;
};

export type TMultipleUploadingProps = {
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  maxNumber: number;
  maxFileSize?: number;
  initialImages?: TItemExist[] | [];
  uploader: TUploader;
  className?: string;
  isButton?: boolean;
};

export type TItemExist = {
  dataURL: string;
  isExist: boolean;
  file: File | null;
};
export type TUseMultipleUploading = {
  maxNumber?: number;
};
