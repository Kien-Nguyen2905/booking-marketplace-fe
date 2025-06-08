import {
  CreatePromotionBodyType,
  CreatePromotionResType,
  DeletePromotionResType,
  GetPromotionByValidFromResType,
  GetPromotionResType,
  GetPromotionsResType,
  UpdatePromotionBodyType,
  UpdatePromotionResType,
} from '@/models/promotion.model';
import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';

const promotionServices = {
  getPromotions: (queryString: string = '') => {
    return instance.get<SuccessResponse<GetPromotionsResType>>(
      `/promotions${queryString ? `?${queryString}` : ''}`,
    );
  },
  getPromotionById: (id: string | number) => {
    return instance.get<SuccessResponse<GetPromotionResType>>(
      `/promotions/${id}`,
    );
  },
  createPromotion: (body: CreatePromotionBodyType) => {
    return instance.post<SuccessResponse<CreatePromotionResType>>(
      `/promotions`,
      body,
    );
  },
  updatePromotion: (id: string | number, body: UpdatePromotionBodyType) => {
    return instance.put<SuccessResponse<UpdatePromotionResType>>(
      `/promotions/${id}`,
      body,
    );
  },
  deletePromotion: (id: string | number) => {
    return instance.delete<SuccessResponse<DeletePromotionResType>>(
      `/promotions/${id}`,
    );
  },

  getPromotionsByValidFrom: (queryString: string = '') => {
    return instance.get<SuccessResponse<GetPromotionByValidFromResType>>(
      `/promotions/valid${queryString ? `?${queryString}` : ''}`,
    );
  },
};
export default promotionServices;
