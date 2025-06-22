import { PartnerStatusType, SUCCESS_MESSAGES } from '@/constants';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import {
  UpdatePartnerByAdminBodySchema,
  UpdatePartnerByAdminBodyType,
} from '@/models';
import {
  useGetDistrictsQuery,
  useGetPartnerByIdQuery,
  useGetProvincesQuery,
  useGetWardsQuery,
  useUpdatePartnerByAdminMutation,
  useUpdatePartnerStatusMutation,
} from '@/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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

  const { mutateAsync: updateStatusPartner, isPending: isSubmitting } =
    useUpdatePartnerStatusMutation(id);

  const { mutateAsync: updatePartnerByAdmin, isPending: isSubmittingByAdmin } =
    useUpdatePartnerByAdminMutation(id);

  const [statusSubmit, setStatusSubmit] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleUpdateStatusPartner = async (value: {
    userId: number;
    status: PartnerStatusType;
  }) => {
    setStatusSubmit(value.status);
    try {
      const { data } = await updateStatusPartner(value);
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

  const handleUpdatePartnerByAdmin = async (
    value: UpdatePartnerByAdminBodyType,
  ) => {
    try {
      const { data } = await updatePartnerByAdmin(value);
      if (data?.data) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.UPDATED,
        });
        setOpenModal(false);
      }
    } catch (error: any) {
      handleErrorApi(error);
    }
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const form = useForm<UpdatePartnerByAdminBodyType>({
    resolver: zodResolver(UpdatePartnerByAdminBodySchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      birth: undefined,
      gender: '',
      idCard: '',
      address: '',
      provinceCode: undefined,
      districtCode: undefined,
      wardCode: undefined,
      companyName: '',
      accountNumber: '',
      bankAccount: '',
      bankName: '',
    },
  });
  useEffect(() => {
    if (typeof partner === 'undefined') return;

    if (partner) {
      form.reset({
        fullName: partner?.fullName,
        email: partner?.email,
        phoneNumber: partner?.phoneNumber,
        birth: partner?.birth ? new Date(partner?.birth) : undefined,
        gender: partner?.gender,
        idCard: partner?.idCard,
        address: partner?.address,
        provinceCode: partner?.provinceCode,
        districtCode: partner?.districtCode,
        wardCode: partner?.wardCode,
        companyName: partner?.companyName,
        accountNumber: partner?.accountNumber,
        bankAccount: partner?.bankAccount,
        bankName: partner?.bankName,
      });
    }
  }, [partner, form]);
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
    openModal,
    handleCloseModal,
    handleOpenModal,
    form,
    handleUpdatePartnerByAdmin,
    isSubmittingByAdmin,
  };
};
