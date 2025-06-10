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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateHotelBodyType) =>
      hotelServices.updateHotel(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['hotel', id],
      });
    },
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

export const useCreateHotelAmenitiesMutation = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: hotelServices.createHotelAmenities,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['hotel-amenities', id],
      });
    },
  });
};

export const useGetHotelsByProvinceCodeQuery = (
  provinceCode: string | number,
) => {
  return useQuery({
    queryKey: ['hotels-by-province-code', provinceCode],
    queryFn: () => hotelServices.getHotelsByProvinceCode(provinceCode),
    enabled: !!provinceCode,
  });
};

export const useGetQuantityHotelsByProvinceCodeQuery = (provinceCode: {
  provinceCodes: number[];
}) => {
  return useQuery({
    queryKey: ['quantity-hotels-by-province-code'],
    queryFn: () => hotelServices.getQuantityHotelsByProvinceCode(provinceCode),
    enabled: !!provinceCode,
  });
};

export const useGetFindHotelsQuery = (queryString: string = '') => {
  return useQuery({
    queryKey: ['find-hotels', queryString],
    queryFn: () => hotelServices.getFindHotels(queryString),
    enabled: !!queryString,
  });
};
