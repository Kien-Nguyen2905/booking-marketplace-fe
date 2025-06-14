import { UpdateCouponBodyType } from '@/models/coupon.model';
import couponServices from '@/services/coupon/couponServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAllCouponsQuery = (queryString: string = '') => {
  return useQuery({
    queryKey: ['coupons', queryString],
    queryFn: () => couponServices.getAllCoupons(queryString),
  });
};

export const useGetCouponByIdQuery = (id: string | number) => {
  return useQuery({
    queryKey: ['coupon', id],
    queryFn: () => couponServices.getCouponById(id),
    enabled: !!id,
  });
};

export const useValidateCouponByCodeMutation = () => {
  return useMutation({
    mutationFn: (code: string) => couponServices.validateCouponByCode({ code }),
  });
};

export const useCreateCouponMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: couponServices.createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['coupons'],
      });
    },
  });
};

export const useUpdateCouponMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string | number;
      body: UpdateCouponBodyType;
    }) => couponServices.updateCoupon(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['coupons'],
      });
    },
  });
};

export const useDeleteCouponMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => couponServices.deleteCoupon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['coupons'],
      });
    },
  });
};
