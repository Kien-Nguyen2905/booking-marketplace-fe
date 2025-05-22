import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';
import {
  PresignedUploadFileBodyType,
  PresignedUploadFileResType,
  UploadImageWithPresignedUrlBodyType,
} from '@/models/media.model';
import axios, { AxiosResponse } from 'axios';

const mediaServices = {
  presignedUploadImage: (body: PresignedUploadFileBodyType) => {
    return instance.post<SuccessResponse<PresignedUploadFileResType>>(
      `/media/images/upload/presigned-url`,
      body,
    );
  },
  uploadImageWithPresignedUrl: ({
    croppedBlob,
    presignedUrl,
  }: UploadImageWithPresignedUrlBodyType) => {
    return axios.put<AxiosResponse>(presignedUrl, croppedBlob, {
      headers: {
        'Content-Type': croppedBlob.type || 'image/jpeg',
      },
    });
  },
};

export default mediaServices;
