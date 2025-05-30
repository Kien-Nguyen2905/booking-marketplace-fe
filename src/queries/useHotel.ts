import { UpdateHotelBodyType } from '@/models/hotel.model';
import hotelServices from '@/services/hotel/hotelServices';
import { useMutation, useQuery } from '@tanstack/react-query';

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
