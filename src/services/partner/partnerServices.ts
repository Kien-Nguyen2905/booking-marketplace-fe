import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';
import {
  CreatePartnerBodyType,
  CreatePartnerResType,
  GetPartnerByIdResType,
  GetPartnerByUserIdResType,
  GetPartnersResType,
  UpdatePartnerBodyType,
  UpdatePartnerByAdminBodyType,
  UpdatePartnerByAdminResType,
  UpdatePartnerResType,
  UpdatePartnerStatusBodyType,
  UpdatePartnerStatusResType,
} from '@/models/partner.model';

const partnerServices = {
  getPartners: (queryString: string = '') => {
    return instance.get<SuccessResponse<GetPartnersResType>>(
      `/partners${queryString ? `?${queryString}` : ''}`,
    );
  },
  getPartnerByUserId: () => {
    return instance.get<SuccessResponse<GetPartnerByUserIdResType>>(
      `/partners/user-id`,
    );
  },
  getPartnerById: (id: string | number) => {
    return instance.get<SuccessResponse<GetPartnerByIdResType>>(
      `/partners/${id}`,
    );
  },
  createPartner: (body: CreatePartnerBodyType) => {
    return instance.post<SuccessResponse<CreatePartnerResType>>(
      `/partners`,
      body,
    );
  },
  updatePartner: (body: UpdatePartnerBodyType) => {
    return instance.put<SuccessResponse<UpdatePartnerResType>>(
      `/partners`,
      body,
    );
  },
  updatePartnerStatus: (body: UpdatePartnerStatusBodyType) => {
    return instance.put<SuccessResponse<UpdatePartnerStatusResType>>(
      `/partners/status`,
      body,
    );
  },
  updatePartnerByAdmin: (
    id: string | number,
    body: UpdatePartnerByAdminBodyType,
  ) => {
    return instance.put<SuccessResponse<UpdatePartnerByAdminResType>>(
      `/partners/admin/${id}`,
      body,
    );
  },
};
export default partnerServices;
