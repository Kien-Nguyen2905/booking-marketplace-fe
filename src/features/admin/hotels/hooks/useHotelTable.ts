import { LIMIT, ROUTES } from '@/constants';
import { hotelColumns } from '@/features/admin/hotels/components/HotelTable/HotelColumn';
import { useDebounce } from '@/hooks';
import { setParamsDefault } from '@/lib/utils';
import { useGetHotelsQuery } from '@/queries';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const useHotelTable = () => {
  const searchParams = useSearchParams();
  const { data: hotelsData, isLoading: isLoadingGetHotels } = useGetHotelsQuery(
    searchParams.toString() || `limit=${LIMIT}&page=1`,
  );
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('');
  const isLoading = useDebounce({
    initialValue: isLoadingGetHotels,
    delay: 700,
  });

  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const form = useForm<{
    search: string;
    role: string;
    status: string;
  }>({
    defaultValues: {
      search: searchParams.get('search') || '',
      status: searchParams.get('status') || '',
    },
  });

  const table = useReactTable({
    data: hotelsData?.data?.data.data || [],
    columns: hotelColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onResetValues = () => {
    form.reset({
      search: '',
      status: '',
    });
    setOrderBy('');
    setOrder('');
  };

  const onSearch = debounce((value: string) => {
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  }, 700);

  const onStatusChange = () => {
    params.set('status', form.watch('status'));
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  };

  const onOrderByChange = (value: string) => {
    setOrderBy(value);
    params.set('orderBy', value);
    if (order === 'asc') {
      setOrder('desc');
      params.set('order', 'desc');
    } else {
      setOrder('asc');
      params.set('order', 'asc');
    }
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  };

  const onReset = () => {
    onResetValues();
    params.delete('search');
    params.delete('status');
    params.delete('orderBy');
    params.delete('order');
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  };

  useEffect(() => {
    if (pathname === ROUTES.ADMIN.HOTELS && searchParams.toString() === '') {
      onResetValues();
    }
    setOrderBy(searchParams.get('orderBy') || '');
    setOrder(searchParams.get('order') || '');
  }, [pathname, form, searchParams, orderBy, order]);

  return {
    form,
    onSearch,
    isLoading,
    onStatusChange,
    onReset,
    onOrderByChange,
    orderBy,
    pagination: hotelsData?.data.data,
    table,
  };
};
