import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LIMIT, SUCCESS_MESSAGES } from '@/constants';
import { useDebounce } from '@/hooks';
import {
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
  useUpdateCouponMutation,
} from '@/queries';
import {
  CouponType,
  CreateCouponBodySchema,
  CreateCouponBodyType,
  UpdateCouponBodyType,
} from '@/models/coupon.model';
import { useEffect, useState } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { couponColumns } from '@/features/admin/coupons/components/CouponTable/CouponColumn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setParamsDefault } from '@/lib/utils';
import { useCreateCouponMutation } from '@/queries';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';

export const useCouponTable = () => {
  const searchParams = useSearchParams();
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('');
  const { data: allCouponData, isLoading: isLoadingCoupon } =
    useGetAllCouponsQuery(searchParams.toString() || `limit=${LIMIT}&page=1`);
  const { mutateAsync: createCoupon, isPending: isSubmittingCreate } =
    useCreateCouponMutation();
  const { mutateAsync: updateCoupon, isPending: isSubmittingUpdate } =
    useUpdateCouponMutation();
  const { mutateAsync: deleteCoupon, isPending: isSubmittingDelete } =
    useDeleteCouponMutation();
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);
  const [open, setOpen] = useState(false);

  const isLoading = useDebounce({
    initialValue: isLoadingCoupon,
    delay: 700,
  });

  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const table = useReactTable({
    data: allCouponData?.data.data.data || [],
    columns: couponColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const form = useForm<CreateCouponBodyType>({
    resolver: zodResolver(CreateCouponBodySchema),
    defaultValues: {
      title: '',
      percentage: 1,
      amount: 1,
      description: '',
    },
  });

  const onOpenModal = () => {
    setSelectedCoupon(null);
    setOpen(true);
  };

  const onOrderByChange = (value: string) => {
    if (orderBy === value) {
      // If current order is asc, change to desc
      if (order === 'asc') {
        setOrder('desc');
        params.set('order', 'desc');
        params.set('orderBy', value);
      }
      // If current order is desc, reset sorting
      else if (order === 'desc') {
        setOrderBy('');
        setOrder('');
        params.delete('orderBy');
        params.delete('order');
      }
    }
    // If different column is clicked, set to asc by default
    else {
      setOrderBy(value);
      setOrder('asc');
      params.set('orderBy', value);
      params.set('order', 'asc');
    }

    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  };

  const onResetForm = () => {
    form.reset({
      title: '',
      percentage: 1,
      amount: 1,
      description: '',
    });
  };

  const onCloseModal = () => {
    setOpen(false);
    setSelectedCoupon(null);
    onResetForm();
  };

  const handleDeleteCoupon = async () => {
    try {
      if (!selectedCoupon?.id) return;
      const { data } = await deleteCoupon(selectedCoupon.id);
      if (data?.data?.id) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.DELETED,
        });
        onCloseModal();
      }
    } catch (error: any) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleCreateCoupon = async (values: CreateCouponBodyType) => {
    try {
      const { data } = await createCoupon(values);
      if (data.data) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.CREATED,
        });
        onCloseModal();
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleUpdateCoupon = async (values: UpdateCouponBodyType) => {
    try {
      if (!selectedCoupon?.id) return;
      const { data } = await updateCoupon({
        id: selectedCoupon.id,
        body: values,
      });
      if (data.data) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.UPDATED,
        });
        onCloseModal();
      }
    } catch (error) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleSubmit = selectedCoupon ? handleUpdateCoupon : handleCreateCoupon;

  useEffect(() => {
    if (selectedCoupon) {
      form.reset({
        title: selectedCoupon.title,
        percentage: Math.round(selectedCoupon.percentage * 100),
        amount: selectedCoupon.amount,
        description: selectedCoupon.description,
      });
    } else {
      onResetForm();
    }
  }, [selectedCoupon, form, open]);

  useEffect(() => {
    setOrderBy(searchParams.get('orderBy') || '');
    setOrder(searchParams.get('order') || '');
  }, [pathname, form, searchParams]);

  return {
    isLoading,
    selectedCoupon,
    open,
    setOpen,
    setSelectedCoupon,
    pagination: allCouponData?.data.data,
    table,
    form,
    onOpenModal,
    onOrderByChange,
    orderBy,
    order,
    handleSubmit,
    isSubmitting: isSubmittingCreate || isSubmittingUpdate,
    isSubmittingDelete,
    handleDeleteCoupon,
  };
};
