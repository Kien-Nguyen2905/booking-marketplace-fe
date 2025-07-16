import { HOTEL_TYPE, ROUTES, SUCCESS_MESSAGES } from '@/constants';
import {
  CreateHotelBodySchema,
  CreateHotelBodyType,
} from '@/models/hotel.model';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useCreateHotelMutation, useGetPartnerByUserIdQuery } from '@/queries';
import { setPartnerLocalStorage } from '@/lib/utils';
import { useAppContext } from '@/context/AppProvider';
import { useMultipleUploading } from '@/components/MultipleUploading/useMultipleUploading';

export const usePartnerHotelInformation = () => {
  const { setIsPendingPartner, isPendingPartner } = useAppContext();
  const uploader = useMultipleUploading(3);
  const { data, isLoading: isLoadingPartner } =
    useGetPartnerByUserIdQuery(true);
  const partner = data?.data.data;
  const { mutateAsync: createHotel } = useCreateHotelMutation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateHotelBodyType>({
    resolver: zodResolver(CreateHotelBodySchema),
    defaultValues: {
      partnerId: partner?.id,
      name: '',
      hotelPhoneNumber: '',
      type: HOTEL_TYPE.HOTEL,
      vat: 0,
      lat: 0,
      lon: 0,
      address: '',
      districtCode: undefined,
      provinceCode: undefined,
      wardCode: undefined,
      description: '',
      images: [],
    },
  });

  const handleCreateHotel = async (values: CreateHotelBodyType) => {
    setIsLoading(true);
    try {
      // // First upload all images
      const imageUrls = await uploader.uploadAllImages();
      if (imageUrls) {
        // Then create hotel with the image URLs
        const hotelData = {
          ...values,
          images: imageUrls as [string, ...string[]],
        };
        const { data } = await createHotel(hotelData);
        if (data.data) {
          setPartnerLocalStorage(true);
          setIsPendingPartner(true);
          router.push(ROUTES.PARTNER.DASHBOARD);
          showToast({
            type: 'success',
            message: SUCCESS_MESSAGES.SUBMITTED_SUCCESS,
          });
        }
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof partner === 'undefined') return;
    if (isPendingPartner) {
      router.push(ROUTES.HOME);
    }
    if (partner) {
      form.reset({
        partnerId: partner?.id,
        name: '',
        hotelPhoneNumber: '',
        type: HOTEL_TYPE.HOTEL,
        vat: 0,
        lat: 0,
        lon: 0,
        address: '',
        districtCode: undefined,
        provinceCode: undefined,
        wardCode: undefined,
        description: '',
        images: [],
      });
    } else {
      router.push(ROUTES.BECOME_PARTNER.PARTNER);
    }
  }, [partner, form, router, isPendingPartner]);

  return {
    form,
    isLoadingPartner,
    handleCreateHotel,
    isLoading,
    uploader,
  };
};
