import { useGetMyOrdersQuery } from '@/queries/useOrder';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LIMIT, ROUTES } from '@/constants';
import { useDebounce } from '@/hooks';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { OrderType } from '@/models';
import { format, parse } from 'date-fns';
import { setParamsDefault } from '@/lib/utils';
import { useForm } from 'react-hook-form';

export const useAccountOrderPage = () => {
  const searchParams = useSearchParams();

  const { data: allOrderData, isLoading: isLoadingOrders } =
    useGetMyOrdersQuery(searchParams.toString() || `limit=${LIMIT}&page=1`);

  const isLoading = useDebounce({
    initialValue: isLoadingOrders,
    delay: 700,
  });

  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [open, setOpen] = useState(false);

  const [openReview, setOpenReview] = useState(false);

  const orders = allOrderData?.data.data;

  const formQuery = useForm<{
    dateFrom: Date | null;
    dateTo: Date | null;
    search: string;
  }>({
    defaultValues: {
      dateFrom: searchParams.get('dateFrom')
        ? parse(searchParams.get('dateFrom') || '', 'dd-MM-yyyy', new Date())
        : null,
      dateTo: searchParams.get('dateTo')
        ? parse(searchParams.get('dateTo') || '', 'dd-MM-yyyy', new Date())
        : null,
      search: searchParams.get('search') || '',
    },
  });

  const dateFromValue = formQuery.watch('dateFrom');

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
  const onResetValues = () => {
    formQuery.reset({
      dateFrom: null,
      dateTo: null,
    });
  };
  const onReset = () => {
    onResetValues();
    params.delete('dateFrom');
    params.delete('dateTo');
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  };

  const onCloseModal = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const onOpenModal = (order: OrderType) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const onCloseReview = () => {
    setOpenReview(false);
    setSelectedOrder(null);
  };

  const onOpenReview = (order: OrderType) => {
    setSelectedOrder(order);
    setOpenReview(true);
  };

  useEffect(() => {
    if (pathname === ROUTES.ACCOUNT.ORDER && searchParams.toString() === '') {
      onResetValues();
    }
  }, [pathname, formQuery, searchParams]);

  return {
    orders,
    isLoading,
    selectedOrder,
    setSelectedOrder,
    open,
    setOpen,
    pagination: allOrderData?.data.data,
    formQuery,
    onDateFromChange,
    onDateToChange,
    dateFromValue,
    onReset,
    onCloseModal,
    onOpenModal,
    openReview,
    setOpenReview,
    onCloseReview,
    onOpenReview,
  };
};
