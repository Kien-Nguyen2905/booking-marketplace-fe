import { useSearchParams } from 'next/navigation';
import { LIMIT, ROUTES } from '@/constants';
import { useReactTable } from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/react-table';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useGetCustomersQuery } from '@/queries';
import { customerColumns } from '@/features/admin/customers/components/CustomerTable/CustomerColumn';
import { debounce } from 'lodash';
import { setParamsDefault } from '@/lib/utils';
import { useEffect } from 'react';

export const useCustomerTable = () => {
  const searchParams = useSearchParams();
  const { data: allCustomerData, isLoading } = useGetCustomersQuery(
    searchParams.toString() || `limit=${LIMIT}&page=1`,
  );

  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const form = useForm<{ search: string }>({
    defaultValues: {
      search: searchParams.get('search') || '',
    },
  });

  const table = useReactTable({
    data: allCustomerData?.data?.data.data || [],
    columns: customerColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onResetValues = () => {
    form.reset({
      search: '',
    });
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

  const onReset = () => {
    onResetValues();
    params.delete('search');
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  };

  useEffect(() => {
    if (pathname === ROUTES.ADMIN.CUSTOMERS && searchParams.toString() === '') {
      onResetValues();
    }
  }, [pathname, form, searchParams]);

  return {
    isLoading,
    table,
    pagination: allCustomerData?.data.data,
    form,
    onSearch,
    onReset,
  };
};
