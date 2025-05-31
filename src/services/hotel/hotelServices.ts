import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';
import {
  CreateHotelBodyType,
  CreateHotelResType,
  GetHotelResType,
  GetHotelsResType,
  UpdateHotelAmenitiesBodyType,
  UpdateHotelAmenitiesResType,
  UpdateHotelBodyType,
  UpdateHotelResType,
} from '@/models/hotel.model';
import { GetAmenitiesResType } from '@/models/amenity.mode';

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
};

export default hotelServices;
