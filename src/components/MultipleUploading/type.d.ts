import { TUploader } from '@/hooks/useUploadMultipleImages';

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
  classNamePreview?: string;
};

export type TItemExist = {
  dataURL: string;
  isExist: boolean;
  file: File | null;
};

export type TUseMultipleUploading = {
  maxNumber?: number;
};
