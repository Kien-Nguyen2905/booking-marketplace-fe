import {
  useCreateHotelAmenitiesMutation,
  useGetAmenitiesQuery,
  useGetHotelAmenitiesQuery,
  useUpdateHotelAmenitiesMutation,
} from '@/queries';
import { useAppContext } from '@/context/AppProvider';
import { useState, useEffect } from 'react';
import { GetAmenityResType } from '@/models/amenity.mode';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { SUCCESS_MESSAGES } from '@/constants';
const AMENITY_CATEGORY_FILTER = [
  { value: 'ALL', label: 'All' },
  { value: 'PUBLIC', label: 'Public' },
  { value: 'SERVICE', label: 'Service' },
];
export const usePartnerAmenitiesPage = () => {
  const { partnerProfile } = useAppContext();

  const hotelId = partnerProfile?.hotel?.id || 0;

  const { data } = useGetAmenitiesQuery();

  const { data: amenitiesData, isLoading } = useGetHotelAmenitiesQuery(hotelId);
  const amenities = amenitiesData?.data?.data || [];

  const { mutateAsync: updateHotelAmenities, isPending: isUpdating } =
    useUpdateHotelAmenitiesMutation(hotelId);

  const { mutateAsync: createHotelAmenities, isPending: isCreating } =
    useCreateHotelAmenitiesMutation(hotelId);

  const allAmenities =
    data?.data.data.filter((item) => item.category !== 'ROOM') || [];

  const [hotelAmenities, setHotelAmenities] = useState<GetAmenityResType[]>(
    amenities || [],
  );

  const [open, setOpen] = useState(false);

  const [selectedType, setSelectedType] = useState('ALL');

  const addAmenity = (amenity: GetAmenityResType) => {
    if (!hotelAmenities.some((item) => item.id === amenity.id)) {
      setHotelAmenities((prev) => [amenity, ...prev]);
    }
  };

  const removeAmenity = (amenityId: number) => {
    setHotelAmenities((prev) => prev.filter((item) => item.id !== amenityId));
  };

  // Get filtered list of amenities that aren't already added to the hotel
  const getAvailableAmenities = () => {
    const hotelAmenityIds = hotelAmenities.map((item) => item.id);
    return allAmenities.filter(
      (amenity) => !hotelAmenityIds.includes(amenity.id),
    );
  };

  const handleUpdateHotelAmenities = async () => {
    try {
      const { data } = await updateHotelAmenities({
        amenities: hotelAmenities.map((amenity) => amenity.id),
      });
      if (data?.data) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.SAVED,
        });
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const handleAddAmenity = async () => {
    try {
      if (amenities.length > 0) return;
      const { data } = await createHotelAmenities({
        amenities: hotelAmenities.map((amenity) => amenity.id),
        hotelId,
      });
      if (data?.data) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.SAVED,
        });
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const filteredAvailableAmenities = getAvailableAmenities().filter(
    (amenity) => {
      if (selectedType === 'ALL') return true;
      return amenity.category === selectedType;
    },
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (amenitiesData?.data?.data) {
        setHotelAmenities(amenitiesData.data.data);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [amenitiesData]);

  const handleSubmit = () =>
    amenities?.length > 0 ? handleUpdateHotelAmenities() : handleAddAmenity();

  return {
    allAmenities,
    hotelAmenities,
    availableAmenities: getAvailableAmenities(),
    addAmenity,
    removeAmenity,
    handleSubmit,
    isSubmitting: isUpdating || isCreating,
    open,
    setOpen,
    selectedType,
    setSelectedType,
    filteredAvailableAmenities,
    isLoading,
    AMENITY_CATEGORY_FILTER,
  };
};
