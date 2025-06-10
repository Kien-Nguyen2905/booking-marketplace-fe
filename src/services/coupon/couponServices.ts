import {
  CreateCouponBodyType,
  CreateCouponResType,
  DeleteCouponResType,
  GetCouponResType,
  GetCouponsResType,
  UpdateCouponBodyType,
  UpdateCouponResType,
} from '@/models/coupon.model';
import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';

const couponServices = {
  getAllCoupons: (queryString: string = '') => {
    return instance.get<SuccessResponse<GetCouponsResType>>(
      `/coupons${queryString ? `?${queryString}` : ''}`,
    );
  },

  createCoupon: (body: CreateCouponBodyType) => {
    return instance.post<SuccessResponse<CreateCouponResType>>(
      `/coupons`,
      body,
    );
  },

  getCouponById: (id: number | string) => {
    return instance.get<SuccessResponse<GetCouponResType>>(`/coupons/${id}`);
  },

  updateCoupon: (id: number | string, body: UpdateCouponBodyType) => {
    return instance.put<SuccessResponse<UpdateCouponResType>>(
      `/coupons/${id}`,
      body,
    );
  },

  deleteCoupon: (id: number | string) => {
    return instance.delete<SuccessResponse<DeleteCouponResType>>(
      `/coupons/${id}`,
    );
  },
};
export default couponServices;
