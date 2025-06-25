import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  useCreateMultipleNotifyMutation,
  useCreatePromotionMutation,
  useDeletePromotionMutation,
  useGetAllPromotionsQuery,
  useUpdatePromotionMutation,
} from '@/queries';
import { useDebounce } from '@/hooks';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { LIMIT, ROUTES, SUCCESS_MESSAGES } from '@/constants';
import { normalizeToUTC, setParamsDefault } from '@/lib/utils';
import {
  CreatePromotionBodySchema,
  CreatePromotionBodyType,
  GetPromotionResType,
  PromotionType,
  UpdatePromotionBodyType,
} from '@/models/promotion.model';
import { promotionColumns } from '@/features/admin/promotions/components/PromotionTable/PromotionColumn';
import { format, parse } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
export const usePromotionTable = () => {
  const searchParams = useSearchParams();
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('');
  const { mutateAsync: createMultipleNotify } =
    useCreateMultipleNotifyMutation();
  const { mutateAsync: createPromotion, isPending: isSubmittingCreate } =
    useCreatePromotionMutation();
  const { mutateAsync: updatePromotion, isPending: isSubmittingUpdate } =
    useUpdatePromotionMutation();
  const { mutateAsync: deletePromotion, isPending: isSubmittingDelete } =
    useDeletePromotionMutation();
  const { data: allPromotionData, isLoading: isLoadingPromotions } =
    useGetAllPromotionsQuery(
      searchParams.toString() || `limit=${LIMIT}&page=1`,
    );
  const isLoading = useDebounce({
    initialValue: isLoadingPromotions,
    delay: 700,
  });

  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const [selectedPromotion, setSelectedPromotion] =
    useState<GetPromotionResType | null>(null);
  const [open, setOpen] = useState(false);

  const formQuery = useForm<{ dateFrom: Date | null; dateTo: Date | null }>({
    defaultValues: {
      dateFrom: searchParams.get('dateFrom')
        ? parse(searchParams.get('dateFrom') || '', 'dd-MM-yyyy', new Date())
        : null,
      dateTo: searchParams.get('dateTo')
        ? parse(searchParams.get('dateTo') || '', 'dd-MM-yyyy', new Date())
        : null,
    },
  });

  const dateFromValue = formQuery.watch('dateFrom');

  const form = useForm<CreatePromotionBodyType>({
    resolver: zodResolver(CreatePromotionBodySchema),
    defaultValues: {
      title: '',
      percentage: 1,
      sharePercentage: 0,
      validFrom: new Date(),
      validUntil: new Date(),
    },
  });
  const table = useReactTable({
    data: allPromotionData?.data?.data.data || [],
    columns: promotionColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onReset = () => {
    params.delete('dateFrom');
    params.delete('dateTo');
    params.delete('orderBy');
    params.delete('order');
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
    onResetDateFilter();
    setOrderBy('');
    setOrder('');
  };

  const onResetDateFilter = () => {
    formQuery.reset({
      dateFrom: null,
      dateTo: null,
    });
  };

  const onDateFromChange = (value: Date) => {
    if (!value) return;
    formQuery.setValue('dateFrom', value);
    if (
      formQuery.getValues('dateTo') &&
      value > formQuery.getValues('dateTo')!
    ) {
      params.delete('dateTo');
      formQuery.setValue('dateTo', null);
    }
    const dateFrom = format(value, 'dd-MM-yyyy').toString();
    params.set('dateFrom', dateFrom);
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  };

  const onDateToChange = (value: Date | null) => {
    if (!value) return;
    formQuery.setValue('dateTo', value);
    const dateTo = format(value, 'dd-MM-yyyy').toString();
    params.set('dateTo', dateTo);
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
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

  const onCloseModal = () => {
    setOpen(false);
    setSelectedPromotion(null);
    form.reset({
      title: '',
      percentage: 1,
      sharePercentage: 0,
      validFrom: new Date(),
      validUntil: new Date(),
    });
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  const handleCreatePromotion = async (values: CreatePromotionBodyType) => {
    try {
      const { data } = await createPromotion({
        ...values,
        validFrom: normalizeToUTC(values.validFrom),
        validUntil: normalizeToUTC(values.validUntil),
      });
      if (data?.data?.id) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.CREATED,
        });
        onCloseModal();
      }
    } catch (error: any) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleUpdatePromotion = async (values: UpdatePromotionBodyType) => {
    try {
      if (!selectedPromotion?.id) return;
      const { data } = await updatePromotion({
        id: selectedPromotion.id,
        body: {
          ...values,
          validFrom: normalizeToUTC(values.validFrom),
          validUntil: normalizeToUTC(values.validUntil),
        },
      });
      if (data?.data?.id) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.UPDATED,
        });
        onCloseModal();
      }
    } catch (error: any) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  const handleDeletePromotion = async () => {
    try {
      if (!selectedPromotion?.id) return;
      const { data } = await deletePromotion(selectedPromotion.id);
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

  const handleSubmit = selectedPromotion
    ? handleUpdatePromotion
    : handleCreatePromotion;

  const handleCreateNotify = async (promotion: PromotionType) => {
    try {
      const { data } = await createMultipleNotify({
        title: promotion.title,
        message:
          'Promotion: ' +
          `"${promotion.title}"` +
          ' will be taken place from ' +
          format(promotion.validFrom, 'dd-MM-yyyy') +
          ' to ' +
          format(promotion.validUntil, 'dd-MM-yyyy') +
          ' with percentage ' +
          Math.round(promotion.percentage * 100) +
          '% and we will share ' +
          Math.round(promotion.sharePercentage * 100) +
          '% to partner',
        recipientId: null,
      });
      if (data?.message) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.NOTIFIED_SUCCESS,
        });
      }
    } catch (error: any) {
      handleErrorApi({ error, setError: form.setError });
    }
  };

  useEffect(() => {
    if (selectedPromotion) {
      form.reset({
        title: selectedPromotion.title,
        percentage: Math.round(selectedPromotion.percentage * 100),
        sharePercentage: Math.round(selectedPromotion.sharePercentage * 100),
        validFrom: new Date(selectedPromotion.validFrom),
        validUntil: new Date(selectedPromotion.validUntil),
      });
    }
  }, [selectedPromotion]);

  useEffect(() => {
    if (
      pathname === ROUTES.ADMIN.PROMOTIONS &&
      searchParams.toString() === ''
    ) {
      onResetDateFilter();
    }
    setOrderBy(searchParams.get('orderBy') || '');
    setOrder(searchParams.get('order') || '');
  }, [pathname, form, searchParams]);

  return {
    selectedPromotion,
    open,
    setSelectedPromotion,
    setOpen,
    isLoading,
    onReset,
    pagination: allPromotionData?.data.data,
    table,
    onDateFromChange,
    onDateToChange,
    formQuery,
    isSubmitting: isSubmittingCreate || isSubmittingUpdate,
    isSubmittingDelete,
    handleSubmit,
    onCloseModal,
    onOpenModal,
    form,
    handleDeletePromotion,
    dateFromValue,
    orderBy,
    order,
    onOrderByChange,
    handleCreateNotify,
  };
};
