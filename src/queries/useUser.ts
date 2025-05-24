import { UpdateUserBodyType } from '@/models/user.model';
import { userServices } from '@/services/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAllUsers = (queryString = '') => {
  return useQuery({
    queryKey: ['users', queryString],
    queryFn: () => userServices.getAllUsers(queryString),
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userServices.getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateUserBodyType) =>
      userServices.updateUser(userId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });
};
