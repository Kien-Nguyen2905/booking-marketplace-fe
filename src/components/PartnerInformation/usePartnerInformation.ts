import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreatePartnerBodySchema,
  CreatePartnerBodyType,
  GetPartnerByUserIdResType,
  UpdatePartnerBodyType,
} from '@/models';
import { showToast } from '@/lib/toast';
import { handleErrorApi } from '@/lib/helper';
import { useCreatePartnerMutation, useUpdatePartnerMutation } from '@/queries';
import { useSendOTPMutation } from '@/queries';
import {
  ERROR_AUTH_MESSAGES,
  ROUTES,
  SUCCESS_MESSAGES,
  TypeOfVerificationCode,
} from '@/constants';
import { useTimeCountdown } from '@/hooks';
import { useBecomePartnerHeader } from '@/layouts/BecomePartnerHeader/useAccommodationHeader';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppProvider';
import { useRouter } from 'next/navigation';

export const usePartnerInformation = ({
  partner,
}: {
  partner?: GetPartnerByUserIdResType;
}) => {
  const { isPendingPartner } = useAppContext();
  const { onNavigateNextStep } = useBecomePartnerHeader();
  const { mutateAsync: sendOTP, isPending: isLoadingOTP } =
    useSendOTPMutation();
  const { time, startTimer } = useTimeCountdown();
  const { mutateAsync: createPartner, isPending: isLoading } =
    useCreatePartnerMutation();
  const { mutateAsync: updatePartner, isPending: isLoadingUpdate } =
    useUpdatePartnerMutation();
  const [isLoadingNavigate, setIsLoadingNavigate] = useState(false);
  const router = useRouter();
  const form = useForm<CreatePartnerBodyType>({
    resolver: zodResolver(CreatePartnerBodySchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      birthday: undefined,
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
      code: '',
    },
  });

  const handleCreatePartner = async (value: CreatePartnerBodyType) => {
    try {
      // if (value.idCard && !isOnlyDigits(value.idCard)) {
      //   form.setError('idCard', {
      //     type: 'server',
      //     message: ERROR_PARTNER_MESSAGES.idCard.invalid,
      //   });
      //   return;
      // }
      const { data } = await createPartner(value);
      if (data.data.id) {
        setIsLoadingNavigate(true);
        onNavigateNextStep();
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.SUBMITTED_SUCCESS,
        });
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleUpdatePartner = async (value: UpdatePartnerBodyType) => {
    try {
      // if (value.idCard && !isOnlyDigits(value.idCard)) {
      //   form.setError('idCard', {
      //     type: 'server',
      //     message: ERROR_PARTNER_MESSAGES.idCard.invalid,
      //   });
      //   return;
      // }
      const { data } = await updatePartner(value);
      if (data.data.id) {
        onNavigateNextStep();
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.UPDATED,
        });
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleSendOTP = async () => {
    try {
      if (form.getValues('email')) {
        const { data } = await sendOTP({
          email: form.getValues('email'),
          type: TypeOfVerificationCode.VERIFY,
        });
        if (data.data) {
          showToast({
            type: 'success',
            message: data.message,
          });
          startTimer();
        }
      } else {
        form.setError('email', {
          type: 'server',
          message: ERROR_AUTH_MESSAGES.email.required,
        });
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  useEffect(() => {
    if (typeof partner === 'undefined') return;
    if (isPendingPartner) {
      router.push(ROUTES.HOME);
    }
    if (partner) {
      form.reset({
        fullName: partner?.fullName,
        email: partner?.email,
        phoneNumber: partner?.phoneNumber,
        birthday: partner?.birthday ? new Date(partner?.birthday) : undefined,
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
        code: '',
      });
    }
  }, [partner, form, router, isPendingPartner]);
  return {
    form,
    handleCreatePartner,
    isLoading,
    handleSendOTP,
    time,
    isLoadingOTP,
    handleUpdatePartner,
    isLoadingUpdate,
    partner,
    isLoadingNavigate,
  };
};
