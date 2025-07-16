import { useAppContext } from '@/context/AppProvider';
import { UpdateMeBodySchema, UpdateMeBodyType } from '@/models/profile.model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useUpdateProfileMutation } from '@/queries';
import { convertBirthdayToUTC } from '@/lib/utils';
import { showToast } from '@/lib/toast';
import { SUCCESS_PROFILE_MESSAGES } from '@/constants';
import { handleErrorApi } from '@/lib/helper';

export const useProfileInfo = () => {
  const { profile } = useAppContext();
  const { mutateAsync: updateProfile, isPending: isLoading } =
    useUpdateProfileMutation();
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBodySchema),
    defaultValues: {
      fullName: profile?.fullName || '',
      phoneNumber: profile?.phoneNumber || '',
      address: profile?.address || '',
      gender: profile?.gender || '',
      birthday: profile?.birthday ? new Date(profile.birthday) : null,
      avatar: profile?.avatar || '',
      accountNumber: profile?.accountNumber || '',
      bankAccount: profile?.bankAccount || '',
      bankName: profile?.bankName || '',
    },
  });
  const handleUpdateProfile = async (data: UpdateMeBodyType) => {
    try {
      const birthday = data.birthday
        ? convertBirthdayToUTC(data.birthday as Date)
        : null;
      const response = await updateProfile({
        ...data,
        bankName: data?.bankName?.trim() || null,
        birthday: birthday as unknown as Date,
      });
      if (response.data.data) {
        showToast({
          type: 'success',
          message: SUCCESS_PROFILE_MESSAGES.PROFILE_UPDATED_SUCCESS,
        });
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };
  useEffect(() => {
    if (profile) {
      form.reset({
        fullName: profile?.fullName || '',
        phoneNumber: profile?.phoneNumber || '',
        address: profile?.address || '',
        gender: profile?.gender || '',
        birthday: profile?.birthday ? new Date(profile.birthday) : null,
        avatar: profile?.avatar || '',
        accountNumber: profile?.accountNumber || '',
        bankAccount: profile?.bankAccount || '',
        bankName: profile?.bankName || '',
      });
    }
  }, [profile, form]);

  return {
    form,
    handleUpdateProfile,
    isLoading,
  };
};
