import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks';
import { LIMIT, ROUTES } from '@/constants';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { format, parse } from 'date-fns';
import { useGetAllTransactionsQuery } from '@/queries';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { setParamsDefault } from '@/lib/utils';
import { transactionColumns } from '@/features/admin/transactions/components/TransactionTable/TransactionColumn';
import { TransactionType } from '@/models';

export const useTransactionTable = () => {
  const searchParams = useSearchParams();
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('');

  const { data: allTransactionData, isLoading: isLoadingTransactions } =
    useGetAllTransactionsQuery(
      searchParams.toString() || `limit=${LIMIT}&page=1`,
    );

  const isLoading = useDebounce({
    initialValue: isLoadingTransactions,
    delay: 700,
  });

  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType | null>(null);
  const [open, setOpen] = useState(false);

  const formQuery = useForm<{
    dateFrom: Date | null;
    dateTo: Date | null;
    type: string;
    search: string;
  }>({
    defaultValues: {
      dateFrom: searchParams.get('dateFrom')
        ? parse(searchParams.get('dateFrom') || '', 'dd-MM-yyyy', new Date())
        : null,
      dateTo: searchParams.get('dateTo')
        ? parse(searchParams.get('dateTo') || '', 'dd-MM-yyyy', new Date())
        : null,
      type: searchParams.get('type') || '',
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

  const onTypeChange = () => {
    params.set('type', formQuery.watch('type'));
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
      type: '',
      search: '',
    });
  };

  const onReset = () => {
    onResetValues();
    params.delete('dateFrom');
    params.delete('dateTo');
    params.delete('type');
    params.delete('search');
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  };
  const table = useReactTable({
    data: allTransactionData?.data.data.data || [],
    columns: transactionColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  const onCloseModal = () => {
    setOpen(false);
    setSelectedTransaction(null);
  };

  useEffect(() => {
    if (
      pathname === ROUTES.ADMIN.TRANSACTIONS &&
      searchParams.toString() === ''
    ) {
      onResetValues();
    }
  }, [pathname, formQuery, searchParams]);
  return {
    formQuery,
    onDateFromChange,
    onDateToChange,
    onTypeChange,
    onReset,
    onResetValues,
    onCloseModal,
    selectedTransaction,
    open,
    setOpen,
    setSelectedTransaction,
    isLoading,
    pagination: allTransactionData?.data.data,
    table,
    onOrderByChange,
    orderBy,
    order,
    dateFromValue,
  };
};
