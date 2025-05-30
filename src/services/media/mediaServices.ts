import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';
import {
  DeleteFilesBodyType,
  PresignedUploadFileBodyType,
  PresignedUploadFileResType,
  UploadImageWithPresignedUrlBodyType,
} from '@/models/media.model';
import axios, { AxiosResponse } from 'axios';
import { EmptyDataResponse } from '@/models';

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

  deleteFiles: (body: DeleteFilesBodyType) => {
    return instance.delete<SuccessResponse<EmptyDataResponse>>(
      `/media/images/delete`,
      {
        data: body,
      },
    );
  },
};

export default mediaServices;
