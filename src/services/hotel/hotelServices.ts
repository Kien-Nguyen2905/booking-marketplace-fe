import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';
import {
  UpdateHotelAmenitiesBodyType,
  UpdateHotelAmenitiesResType,
  CreateHotelAmenitiesBodyType,
  CreateHotelAmenitiesResType,
  CreateHotelBodyType,
  CreateHotelResType,
  GetHotelResType,
  GetHotelsResType,
  UpdateHotelBodyType,
  UpdateHotelResType,
  GetHotelsByProvinceCodeResType,
  GetQuantityHotelsByProvinceCodeBodyType,
  GetQuantityHotelsByProvinceCodeResType,
  GetFindHotelsResType,
} from '@/models/hotel.model';
import { GetAmenitiesResType } from '@/models/amenity.model';

const hotelServices = {
  getHotels: (queryString: string = '') => {
    return instance.get<SuccessResponse<GetHotelsResType>>(
      `/hotels${queryString ? `?${queryString}` : ''}`,
    );
  },

  getHotelById: (id: string | number) => {
    return instance.get<SuccessResponse<GetHotelResType>>(`/hotels/${id}`);
  },

  createHotel: (body: CreateHotelBodyType) => {
    return instance.post<SuccessResponse<CreateHotelResType>>(`/hotels`, body);
  },

  updateHotel: (id: string | number, body: UpdateHotelBodyType) => {
    return instance.put<SuccessResponse<UpdateHotelResType>>(
      `/hotels/${id}`,
      body,
    );
  },

  getHotelAmenities: (hotelId: string | number) => {
    return instance.get<SuccessResponse<GetAmenitiesResType>>(
      `/hotels/amenities/${hotelId}`,
    );
  },

  updateHotelAmenities: (
    hotelId: string | number,
    body: UpdateHotelAmenitiesBodyType,
  ) => {
    return instance.put<SuccessResponse<UpdateHotelAmenitiesResType>>(
      `/hotels/amenities/${hotelId}`,
      body,
    );
  },

  createHotelAmenities: (body: CreateHotelAmenitiesBodyType) => {
    return instance.post<SuccessResponse<CreateHotelAmenitiesResType>>(
      `/hotels/amenities`,
      body,
    );
  },

  getHotelsByProvinceCode: (provinceCode: string | number) => {
    return instance.get<SuccessResponse<GetHotelsByProvinceCodeResType>>(
      `/hotels/province/${provinceCode}`,
    );
  },

  getQuantityHotelsByProvinceCode: (
    body: GetQuantityHotelsByProvinceCodeBodyType,
  ) => {
    return instance.post<
      SuccessResponse<GetQuantityHotelsByProvinceCodeResType>
    >(`/hotels/province/count`, body);
  },

  getFindHotels: (queryString: string = '') => {
    return instance.get<SuccessResponse<GetFindHotelsResType>>(
      `/hotels/find-hotels${queryString ? `?${queryString}` : ''}`,
    );
  },
};

export default hotelServices;
