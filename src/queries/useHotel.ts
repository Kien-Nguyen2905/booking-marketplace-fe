import {
  UpdateHotelAmenitiesBodyType,
  UpdateHotelBodyType,
} from '@/models/hotel.model';
import hotelServices from '@/services/hotel/hotelServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetHotelsQuery = (queryString = '') => {
  return useQuery({
    queryKey: ['hotels', queryString],
    queryFn: () => hotelServices.getHotels(queryString),
  });
};

export const useGetHotelByIdQuery = (id: string | number) => {
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => hotelServices.getHotelById(id),
    enabled: !!id,
  });
};

export const useCreateHotelMutation = () => {
  return useMutation({
    mutationFn: hotelServices.createHotel,
  });
};

export const useUpdateHotelMutation = (id: string | number) => {
  return useMutation({
    mutationFn: (body: UpdateHotelBodyType) =>
      hotelServices.updateHotel(id, body),
  });
};

export const useGetHotelAmenitiesQuery = (id: string | number) => {
  return useQuery({
    queryKey: ['hotel-amenities', id],
    queryFn: () => hotelServices.getHotelAmenities(id),
    enabled: !!id,
  });
};

export const useUpdateHotelAmenitiesMutation = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateHotelAmenitiesBodyType) =>
      hotelServices.updateHotelAmenities(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['hotel-amenities', id],
      });
    },
  });
};
