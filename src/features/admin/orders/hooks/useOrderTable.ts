import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LIMIT, ROUTES } from '@/constants';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { format, parse } from 'date-fns';
import { useGetAllOrdersQuery } from '@/queries';
import { OrderType } from '@/models';
import { orderColumns } from '@/features/admin/orders/components/OrderTable/OrderColumn';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { setParamsDefault } from '@/lib/utils';
import { debounce } from 'lodash';

export const useOrderTable = () => {
  const searchParams = useSearchParams();
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('');

  const { data: allOrderData, isLoading } = useGetAllOrdersQuery(
    searchParams.toString() || `limit=${LIMIT}&page=1`,
  );

  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [open, setOpen] = useState(false);

  const formQuery = useForm<{
    dateFrom: Date | null;
    dateTo: Date | null;
    status: string;
    paymentType: string;
    search: string;
  }>({
    defaultValues: {
      dateFrom: searchParams.get('dateFrom')
        ? parse(searchParams.get('dateFrom') || '', 'dd-MM-yyyy', new Date())
        : null,
      dateTo: searchParams.get('dateTo')
        ? parse(searchParams.get('dateTo') || '', 'dd-MM-yyyy', new Date())
        : null,
      status: searchParams.get('status') || '',
      paymentType: searchParams.get('paymentType') || '',
      search: searchParams.get('search') || '',
    },
  });

  const dateFromValue = formQuery.watch('dateFrom');

  const onSearch = debounce((value: string) => {
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  }, 700);

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

  const onStatusChange = () => {
    params.set('status', formQuery.watch('status'));
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  };

  const onPaymentTypeChange = () => {
    params.set('paymentType', formQuery.watch('paymentType'));
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

  const onResetValues = () => {
    formQuery.reset({
      dateFrom: null,
      dateTo: null,
      status: '',
      paymentType: '',
      search: '',
    });
  };

  const onReset = () => {
    onResetValues();
    params.delete('dateFrom');
    params.delete('dateTo');
    params.delete('status');
    params.delete('paymentType');
    params.delete('search');
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  };

  const table = useReactTable({
    data: allOrderData?.data.data.data || [],
    columns: orderColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onCloseModal = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    if (pathname === ROUTES.ADMIN.ORDERS && searchParams.toString() === '') {
      onResetValues();
    }
  }, [pathname, formQuery, searchParams]);

  return {
    isLoading,
    table,
    pagination: allOrderData?.data.data,
    selectedOrder,
    setSelectedOrder,
    open,
    setOpen,
    onOrderByChange,
    orderBy,
    order,
    formQuery,
    onDateFromChange,
    onDateToChange,
    dateFromValue,
    onStatusChange,
    onPaymentTypeChange,
    onReset,
    onSearch,
    onCloseModal,
  };
};
