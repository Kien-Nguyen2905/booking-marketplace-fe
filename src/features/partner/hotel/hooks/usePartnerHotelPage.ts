import { useForm } from 'react-hook-form';
import { useAppContext } from '@/context/AppProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UpdateHotelBodySchema,
  UpdateHotelBodyType,
} from '@/models/hotel.model';
import { useEffect } from 'react';
import { HOTEL_STATUS, HOTEL_TYPE, SUCCESS_MESSAGES } from '@/constants';
import { useUpdateHotelMutation } from '@/queries';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';

type TUsePartnerHotelPageProps = {
  uploadAllImages: (minNumber?: number) => Promise<string[] | undefined>;
};

export const usePartnerHotelPage = ({
  uploadAllImages,
}: TUsePartnerHotelPageProps) => {
  const { partnerProfile } = useAppContext();
  const hotel = partnerProfile?.hotel;
  const { mutateAsync, isPending: isSubmitting } = useUpdateHotelMutation(
    hotel?.id || '',
  );
  const form = useForm({
    resolver: zodResolver(UpdateHotelBodySchema),
    defaultValues: {
      name: hotel?.name || '',
      hotelPhoneNumber: hotel?.hotelPhoneNumber || '',
      vat: hotel?.vat ? hotel.vat * 100 : 0,
      description: hotel?.description || '',
      images: hotel?.images || [],
      status: hotel?.status || HOTEL_STATUS.ACTIVE,
      type: hotel?.type || HOTEL_TYPE.HOTEL,
      reputationScore: hotel?.reputationScore || 0,
      provinceCode: hotel?.provinceCode || 0,
      districtCode: hotel?.districtCode || 0,
      wardCode: hotel?.wardCode || 0,
      address: hotel?.address || '',
    },
  });
  useEffect(() => {
    if (hotel) {
      form.reset({
        name: hotel?.name,
        hotelPhoneNumber: hotel?.hotelPhoneNumber,
        vat: hotel?.vat ? hotel.vat * 100 : 0,
        description: hotel?.description,
        images: hotel?.images,
        status: hotel?.status,
        type: hotel?.type,
        reputationScore: hotel?.reputationScore,
        provinceCode: hotel?.provinceCode,
        districtCode: hotel?.districtCode,
        wardCode: hotel?.wardCode,
        address: hotel?.address,
      });
    }
  }, [hotel, form]);

  const handleUpdateHotel = async (values: UpdateHotelBodyType) => {
    try {
      const imageUrls = await uploadAllImages();
      if (imageUrls) {
        // Then create hotel with the image URLs
        console.log('imageUrls', imageUrls);
        const hotelData = {
          ...values,
          partnerId: partnerProfile?.id as number,
          id: hotel?.id as number,
          images: imageUrls as [string, ...string[]],
        };
        console.log('hotelData', hotelData);
        const { data } = await mutateAsync(hotelData);
        if (data.data) {
          showToast({
            type: 'success',
            message: SUCCESS_MESSAGES.UPDATED,
          });
        }
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  return {
    form,
    hotel,
    handleUpdateHotel,
    isSubmitting,
  };
};
