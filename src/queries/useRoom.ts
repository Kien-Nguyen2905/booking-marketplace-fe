import { CreateRoomBodyType, UpdateRoomBodyType } from '@/models/room.model';
import roomServices from '@/services/room/roomServices';
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const useGetRoomsByHotelIdQuery = (hotelId: string | number) => {
  return useQuery({
    queryKey: ['room'],
    queryFn: () => roomServices.getRoomsByHotelId(hotelId),
    enabled: !!hotelId,
  });
};

export const useGetRoomByIdQuery = (id: string | number) => {
  return useQuery({
    queryKey: ['room', id],
    queryFn: () => roomServices.getRoomById(id),
    enabled: !!id,
  });
};

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateRoomBodyType) => roomServices.createRoom(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['room-types'],
      });
    },
  });
};

export const useUpdateRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string | number;
      body: UpdateRoomBodyType;
    }) => roomServices.updateRoom(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['room-types'],
      });
    },
    retry: (failureCount, error: any) => {
      // Nếu là lỗi mạng (không có response) => retry
      if (!error.response) return true;

      const status = error.response.status;

      // Retry nếu là lỗi 409
      return [409].includes(status);
    },
  });
};

export const useDeleteRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => roomServices.deleteRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['room-types'],
      });
    },
  });
};

export const useAvailableRoomsByRoomIds = (
  roomIds: (string | number)[],
  queryString: string = '',
) => {
  return useQueries({
    queries: roomIds.map((roomId) => ({
      queryKey: ['room', roomId, queryString],
      queryFn: () =>
        roomServices.getAvailableRoomsByRoomId(roomId, queryString),
      enabled: !!roomId,
    })),
  });
};

export const useGetAvailableRoomsByRoomIdQuery = (
  roomId: string | number,
  queryString: string = '',
) => {
  return useQuery({
    queryKey: ['room', roomId, queryString],
    queryFn: () => roomServices.getAvailableRoomsByRoomId(roomId, queryString),
    enabled: !!roomId,
  });
};
