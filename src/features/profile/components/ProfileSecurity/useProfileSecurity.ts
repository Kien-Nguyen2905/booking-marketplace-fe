import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { ChangePasswordBodySchema, ChangePasswordBodyType } from '@/models';
import { useChangePasswordProfileMutation } from '@/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useProfileSecurity = () => {
  const { mutateAsync: changePassword, isPending: isLoading } =
    useChangePasswordProfileMutation();
  const form = useForm({
    resolver: zodResolver(ChangePasswordBodySchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const handleChangePassword = async (value: ChangePasswordBodyType) => {
    try {
      const { data } = await changePassword(value);
      if (data.data) {
        showToast({
          type: 'success',
          message: data.message,
        });
        form.reset();
      }
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  };
  return {
    form,
    handleChangePassword,
    isLoading,
  };
};
