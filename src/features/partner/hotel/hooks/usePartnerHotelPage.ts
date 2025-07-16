import { useForm } from 'react-hook-form';
import { useAppContext } from '@/context/AppProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UpdateHotelBodySchema,
  UpdateHotelBodyType,
} from '@/models/hotel.model';
import { useEffect, useState } from 'react';
import { HOTEL_STATUS, HOTEL_TYPE, SUCCESS_MESSAGES } from '@/constants';
import { useUpdateHotelMutation } from '@/queries';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { useMultipleUploading } from '@/components/MultipleUploading/useMultipleUploading';

export const usePartnerHotelPage = () => {
  const { partnerProfile } = useAppContext();
  const uploader = useMultipleUploading(3);
  const hotel = partnerProfile?.hotel;
  const { mutateAsync } = useUpdateHotelMutation(hotel?.id || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(UpdateHotelBodySchema),
    defaultValues: {
      name: hotel?.name || '',
      hotelPhoneNumber: hotel?.hotelPhoneNumber || '',
      vat: hotel?.vat ? Math.round(hotel.vat * 100) : 0,
      description: hotel?.description || '',
      images: hotel?.images || [],
      status: hotel?.status || HOTEL_STATUS.ACTIVE,
      type: hotel?.type || HOTEL_TYPE.HOTEL,
      reputationScore: hotel?.reputationScore || 0,
      provinceCode: hotel?.provinceCode || 0,
      districtCode: hotel?.districtCode || 0,
      wardCode: hotel?.wardCode || 0,
      lat: hotel?.lat || 0,
      lon: hotel?.lon || 0,
      address: hotel?.address || '',
      rating: hotel?.rating || 0,
    },
  });
  useEffect(() => {
    if (hotel) {
      form.reset({
        name: hotel?.name,
        hotelPhoneNumber: hotel?.hotelPhoneNumber,
        vat: hotel?.vat ? Math.round(hotel.vat * 100) : 0,
        description: hotel?.description,
        images: hotel?.images,
        status: hotel?.status,
        type: hotel?.type,
        reputationScore: hotel?.reputationScore,
        provinceCode: hotel?.provinceCode,
        districtCode: hotel?.districtCode,
        wardCode: hotel?.wardCode,
        lat: Number(hotel?.lat),
        lon: Number(hotel?.lon),
        address: hotel?.address,
        rating: hotel?.rating,
      });
    }
  }, [hotel, form]);

  const handleUpdateHotel = async (values: UpdateHotelBodyType) => {
    setIsSubmitting(true);
    if (hotel?.status === HOTEL_STATUS.INACTIVE) return;
    try {
      const imageUrls = await uploader.uploadAllImages();
      if (imageUrls) {
        const hotelData = {
          ...values,
          partnerId: partnerProfile?.id as number,
          id: hotel?.id as number,
          images: imageUrls as [string, ...string[]],
        };
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    hotel,
    handleUpdateHotel,
    isSubmitting,
    uploader,
  };
};
