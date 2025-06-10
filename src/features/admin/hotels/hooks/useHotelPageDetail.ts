import { AMENITY_CATEGORY, HOTEL_STATUS, SUCCESS_MESSAGES } from '@/constants';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { GetRoomTypeByIdResType } from '@/models';
import {
  useGetDistrictsQuery,
  useGetHotelByIdQuery,
  useGetProvincesQuery,
  useGetWardsQuery,
  useUpdateHotelMutation,
} from '@/queries';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export const useHotelPageDetail = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: hotelData, isLoading: isLoadingHotel } = useGetHotelByIdQuery(
    id || '',
  );
  const { mutateAsync: updateHotel, isPending: isPendingUpdateHotel } =
    useUpdateHotelMutation(id);
  const { data: provinceData } = useGetProvincesQuery();
  const provinceList = provinceData?.data.data;
  const { data: districtData } = useGetDistrictsQuery(
    hotelData?.data.data?.provinceCode?.toString() || '',
  );
  const districtList = districtData?.data.data;
  const { data: wardData } = useGetWardsQuery(
    hotelData?.data.data?.districtCode?.toString() || '',
  );
  const wardList = wardData?.data.data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] =
    useState<GetRoomTypeByIdResType | null>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenRoomDetails = (room: GetRoomTypeByIdResType) => {
    setSelectedRoomType(room);
    setIsModalOpen(true);
  };
  const hotel = hotelData?.data.data;
  const amenityServices = hotel?.hotelAmenity.filter(
    (amenity) => amenity.amenity.category === AMENITY_CATEGORY.SERVICE,
  );
  const amenityPublic = hotel?.hotelAmenity.filter(
    (amenity) => amenity.amenity.category === AMENITY_CATEGORY.PUBLIC,
  );

  const handleUpdateStatusHotel = async () => {
    if (!hotel) return;
    try {
      const hotelData = {
        id: hotel?.id,
        partnerId: hotel?.partnerId,
        name: hotel?.name,
        hotelPhoneNumber: hotel?.hotelPhoneNumber,
        type: hotel?.type,
        provinceCode: hotel?.provinceCode,
        districtCode: hotel?.districtCode,
        wardCode: hotel?.wardCode,
        address: hotel?.address,
        description: hotel?.description,
        reputationScore: hotel?.reputationScore,
        vat: hotel?.vat * 100,
        rating: hotel?.rating,
        images: hotel?.images,
        status:
          hotel?.status === HOTEL_STATUS.ACTIVE
            ? HOTEL_STATUS.INACTIVE
            : HOTEL_STATUS.ACTIVE,
      };
      const { data } = await updateHotel(hotelData);
      if (data.data) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.UPDATED,
        });
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };
  return {
    hotel,
    isLoadingHotel,
    provinceList,
    districtList,
    wardList,
    isModalOpen,
    handleCloseModal,
    handleOpenRoomDetails,
    selectedRoomType,
    amenityServices,
    amenityPublic,
    isPendingUpdateHotel,
    handleUpdateStatusHotel,
  };
};
