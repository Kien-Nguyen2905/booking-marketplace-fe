import {
  CreateRoomTypeBodyType,
  CreateRoomTypeResType,
  GetRoomTypeByHotelIdResType,
  UpdateRoomTypeBodyType,
  UpdateRoomTypeResType,
  GetRoomTypeByIdResType,
  UpdateRoomTypeAmenitiesBodyType,
  UpdateRoomTypeAmenitiesResType,
  UpdateRoomBedBodyType,
  UpdateRoomBedResType,
  CreateRoomBedBodyType,
  CreateRoomBedResType,
  CreateRoomTypeAmenitiesBodyType,
  CreateRoomTypeAmenitiesResType,
  DeleteRoomTypeResType,
} from '@/models/room-type.model';
import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';

const roomTypeServices = {
  getRoomTypeById: (id: number | string) => {
    return instance.get<SuccessResponse<GetRoomTypeByIdResType>>(
      `/room-types/${id}`,
    );
  },

  getRoomTypesByHotelId: (hotelId: number | string) => {
    return instance.get<SuccessResponse<GetRoomTypeByHotelIdResType>>(
      `/room-types/hotel/${hotelId}`,
    );
  },

  createRoomType: (body: CreateRoomTypeBodyType) => {
    return instance.post<SuccessResponse<CreateRoomTypeResType>>(
      `/room-types`,
      body,
    );
  },

  updateRoomType: (id: number | string, body: UpdateRoomTypeBodyType) => {
    return instance.put<SuccessResponse<UpdateRoomTypeResType>>(
      `/room-types/${id}`,
      body,
    );
  },

  createRoomTypeAmenities: (
    roomTypeId: number | string,
    body: CreateRoomTypeAmenitiesBodyType,
  ) => {
    return instance.post<SuccessResponse<CreateRoomTypeAmenitiesResType>>(
      `/room-types/amenities/${roomTypeId}`,
      body,
    );
  },

  updateRoomTypeAmenities: (
    id: number | string,
    body: UpdateRoomTypeAmenitiesBodyType,
  ) => {
    return instance.put<SuccessResponse<UpdateRoomTypeAmenitiesResType>>(
      `/room-types/amenities/${id}`,
      body,
    );
  },

  createRoomBed: (roomTypeId: number | string, body: CreateRoomBedBodyType) => {
    return instance.post<SuccessResponse<CreateRoomBedResType>>(
      `/room-types/room-beds/${roomTypeId}`,
      body,
    );
  },

  updateRoomTypeBed: (id: number | string, body: UpdateRoomBedBodyType) => {
    return instance.put<SuccessResponse<UpdateRoomBedResType>>(
      `/room-types/room-beds/${id}`,
      body,
    );
  },

  deleteRoomType: (id: number | string) => {
    return instance.delete<SuccessResponse<DeleteRoomTypeResType>>(
      `/room-types/${id}`,
    );
  },
};

export default roomTypeServices;
