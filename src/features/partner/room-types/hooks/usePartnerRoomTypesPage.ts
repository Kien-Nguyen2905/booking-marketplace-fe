import { useAppContext } from '@/context/AppProvider';
import { useGetRoomTypesQuery } from '@/queries';

export const usePartnerRoomTypesPage = () => {
  const { partnerProfile } = useAppContext();
  const hotelId = partnerProfile?.hotel?.id || 0;
  const { data, isLoading } = useGetRoomTypesQuery(hotelId);
  return {
    roomTypes: data?.data.data,
    isLoading,
  };
};
