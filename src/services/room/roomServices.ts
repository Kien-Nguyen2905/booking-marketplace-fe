import {
  CreateRoomBodyType,
  CreateRoomResType,
  DeleteRoomResType,
  GetRoomByIdResType,
  GetRoomsByHotelIdResType,
  UpdateRoomBodyType,
  UpdateRoomResType,
} from '@/models/room.model';
import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';

const roomServices = {
  getRoomsByHotelId: (hotelId: string | number) => {
    return instance.get<SuccessResponse<GetRoomsByHotelIdResType>>(
      `/rooms/hotel/${hotelId}`,
    );
  },

  getRoomById: (roomId: string | number) => {
    return instance.get<SuccessResponse<GetRoomByIdResType>>(
      `/rooms/${roomId}`,
    );
  },

  createRoom: (body: CreateRoomBodyType) => {
    return instance.post<SuccessResponse<CreateRoomResType>>(`/rooms`, body);
  },

  updateRoom: (roomId: string | number, body: UpdateRoomBodyType) => {
    return instance.put<SuccessResponse<UpdateRoomResType>>(
      `/rooms/${roomId}`,
      body,
    );
  },

  deleteRoom: (roomId: string | number) => {
    return instance.delete<SuccessResponse<DeleteRoomResType>>(
      `/rooms/${roomId}`,
    );
  },
};

export default roomServices;
