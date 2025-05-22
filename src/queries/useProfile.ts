import { profileServices } from '@/services/profile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetProfileQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: profileServices.getProfile,
    enabled,
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: profileServices.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
    },
  });
};

export const useChangePasswordProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: profileServices.changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
    },
  });
};
