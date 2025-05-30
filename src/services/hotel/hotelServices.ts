import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';
import {
  CreateHotelBodyType,
  CreateHotelResType,
  GetHotelResType,
  GetHotelsResType,
  UpdateHotelBodyType,
  UpdateHotelResType,
} from '@/models/hotel.model';

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
};

export default hotelServices;
