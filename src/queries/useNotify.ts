import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import notifyServices from '@/services/notify/notifyServices';

export const useGetNotifiesByRecipientIdQuery = (queryString: string = '') => {
  return useQuery({
    queryKey: ['notifies', queryString],
    queryFn: () => notifyServices.getNotifiesByRecipientId(queryString),
  });
};

export const useReadNotifyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notifyServices.readNotify,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifies'],
      });
    },
  });
};

export const useCreateNotifyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notifyServices.createNotify,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifies'],
      });
    },
  });
};

export const useCreateMultipleNotifyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notifyServices.createMultipleNotify,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifies'],
      });
    },
  });
};
