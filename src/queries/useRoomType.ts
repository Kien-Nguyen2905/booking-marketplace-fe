import {
  CreateRoomBedBodyType,
  CreateRoomTypeAmenitiesBodyType,
  UpdateRoomBedBodyType,
  UpdateRoomTypeAmenitiesBodyType,
  UpdateRoomTypeBodyType,
} from '@/models/room-type.model';
import roomTypeServices from '@/services/room-type/roomTypeServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetRoomTypesQuery = (hotelId: string | number) => {
  return useQuery({
    queryKey: ['room-types'],
    queryFn: () => roomTypeServices.getRoomTypesByHotelId(hotelId),
    enabled: !!hotelId,
  });
};

export const useGetRoomTypeByIdQuery = (id: string | number) => {
  return useQuery({
    queryKey: ['room-type', id],
    queryFn: () => roomTypeServices.getRoomTypeById(id),
    enabled: !!id,
  });
};

export const useCreateRoomTypeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: roomTypeServices.createRoomType,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['room-types'],
      });
    },
  });
};

export const useUpdateRoomTypeMutation = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateRoomTypeBodyType) =>
      roomTypeServices.updateRoomType(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['room-types'],
      });
    },
  });
};

export const useCreateRoomTypeAmenitiesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      roomTypeId,
      body,
    }: {
      roomTypeId: string | number;
      body: CreateRoomTypeAmenitiesBodyType;
    }) => roomTypeServices.createRoomTypeAmenities(roomTypeId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['room-types'],
      });
    },
  });
};

export const useUpdateRoomTypeAmenitiesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string | number;
      body: UpdateRoomTypeAmenitiesBodyType;
    }) => roomTypeServices.updateRoomTypeAmenities(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['room-type'],
      });
    },
  });
};

export const useCreateRoomBedMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      roomTypeId,
      body,
    }: {
      roomTypeId: string | number;
      body: CreateRoomBedBodyType;
    }) => roomTypeServices.createRoomBed(roomTypeId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['room-type'],
      });
    },
  });
};

export const useUpdateRoomTypeBedMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string | number;
      body: UpdateRoomBedBodyType;
    }) => roomTypeServices.updateRoomTypeBed(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['room-type'],
      });
    },
  });
};

export const useDeleteRoomTypeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => roomTypeServices.deleteRoomType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['room-types'],
      });
    },
  });
};
