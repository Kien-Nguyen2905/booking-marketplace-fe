import partnerServices from '@/services/partner/partnerServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAllPartnersQuery = (queryString = '') => {
  return useQuery({
    queryKey: ['partners', queryString],
    queryFn: () => partnerServices.getPartners(queryString),
  });
};

export const useGetPartnerByUserIdQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ['partner-by-user-id'],
    queryFn: partnerServices.getPartnerByUserId,
    enabled,
  });
};

export const useGetPartnerByIdQuery = (id: string | number) => {
  return useQuery({
    queryKey: ['partner', id],
    queryFn: () => partnerServices.getPartnerById(id),
    enabled: !!id,
  });
};

export const useCreatePartnerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: partnerServices.createPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['partner-by-user-id'],
      });
    },
  });
};

export const useUpdatePartnerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: partnerServices.updatePartner,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['partner-by-user-id'],
      });
    },
  });
};

export const useUpdatePartnerStatusMutation = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: partnerServices.updatePartnerStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['partner', id],
      });
    },
  });
};
