import { amenityServices } from '@/services/amenity';
import { useQuery } from '@tanstack/react-query';

export const useGetAmenitiesQuery = () => {
  return useQuery({
    queryKey: ['amenities'],
    queryFn: amenityServices.getAmenities,
  });
};
