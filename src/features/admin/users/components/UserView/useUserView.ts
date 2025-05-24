import { UserStatusType } from './../../../../../constants/auth';
import { useAppContext } from '@/context/AppProvider';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { GetUserProfileResType } from '@/models';
import { useGetUserById, useUpdateUser } from '@/queries';

export const useUserView = (selectedUser: GetUserProfileResType) => {
  const { profile } = useAppContext();
  const { data } = useGetUserById(selectedUser?.id.toString());
  const user = data?.data.data;
  const { mutateAsync: updateUser } = useUpdateUser(
    selectedUser?.id?.toString() || '',
  );
  const handleActiveUser = async (
    status: UserStatusType,
    onSuccess?: (open: boolean) => void,
  ) => {
    if (!user) return;
    try {
      const response = await updateUser({
        status,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        avatar: user.avatar,
        roleId: user.roleId,
      });
      if (response.data.data.id) {
        onSuccess?.(false);
        showToast({
          type: 'success',
          message: 'User updated successfully',
        });
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };
  return { user, updateUser, handleActiveUser, profile };
};
