import { PartnerStatusType, SUCCESS_MESSAGES } from '@/constants';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import {
  useGetDistrictsQuery,
  useGetPartnerByIdQuery,
  useGetProvincesQuery,
  useGetWardsQuery,
  useUpdatePartnerStatusMutation,
} from '@/queries';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export const usePartnerPageDetail = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: partnerData, isLoading: isLoadingPartner } =
    useGetPartnerByIdQuery(id);
  const partner = partnerData?.data.data;
  const { data: provinceData } = useGetProvincesQuery();
  const provinceList = provinceData?.data.data;
  const { data: districtData } = useGetDistrictsQuery(
    partner?.provinceCode?.toString() || '',
  );
  const districtList = districtData?.data.data;
  const { data: wardData } = useGetWardsQuery(
    partner?.districtCode?.toString() || '',
  );
  const wardList = wardData?.data.data;

  const { data: districtDataHotel } = useGetDistrictsQuery(
    partner?.hotel?.provinceCode?.toString() || '',
  );
  const districtListHotel = districtDataHotel?.data.data;

  const { data: wardDataHotel, isLoading: isLoadingHotel } = useGetWardsQuery(
    partner?.hotel?.districtCode?.toString() || '',
  );
  const wardListHotel = wardDataHotel?.data.data;

  const { mutateAsync: updatePartner, isPending: isSubmitting } =
    useUpdatePartnerStatusMutation(id);

  const [statusSubmit, setStatusSubmit] = useState<string>('');

  const handleUpdateStatusPartner = async (value: {
    userId: number;
    status: PartnerStatusType;
  }) => {
    setStatusSubmit(value.status);
    try {
      const { data } = await updatePartner(value);
      if (data?.data) {
        showToast({
          type: 'success',
          message:
            SUCCESS_MESSAGES[value.status as keyof typeof SUCCESS_MESSAGES],
        });
      }
    } catch (error: any) {
      handleErrorApi(error);
    } finally {
      setStatusSubmit('');
    }
  };

  return {
    partner,
    hotel: partner?.hotel,
    provinceList,
    districtList,
    wardList,
    isLoading: isLoadingPartner || isLoadingHotel,
    districtListHotel,
    wardListHotel,
    handleUpdateStatusPartner,
    isSubmitting,
    statusSubmit,
  };
};
