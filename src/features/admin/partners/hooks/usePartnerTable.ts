import { LIMIT, ROUTES } from '@/constants';
import { partnerColumns } from '@/features/admin/partners/components/PartnerTable/PartnerColumn';
import { setParamsDefault } from '@/lib/utils';
import { useGetAllPartnersQuery } from '@/queries';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const usePartnerTable = () => {
  const searchParams = useSearchParams();
  const { data: allPartnerData, isLoading } = useGetAllPartnersQuery(
    searchParams.toString() || `limit=${LIMIT}&page=1`,
  );

  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const form = useForm<{ search: string; role: string; status: string }>({
    defaultValues: {
      search: searchParams.get('search') || '',
      status: searchParams.get('status') || '',
    },
  });

  const table = useReactTable({
    data: allPartnerData?.data?.data.data || [],
    columns: partnerColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onResetValues = () => {
    form.reset({
      search: '',
      status: '',
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

  const onStatusChange = () => {
    params.set('status', form.watch('status'));
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  };

  const onReset = () => {
    onResetValues();
    params.delete('search');
    params.delete('status');
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  };

  useEffect(() => {
    if (pathname === ROUTES.ADMIN.PARTNERS && searchParams.toString() === '') {
      onResetValues();
    }
  }, [pathname, form, searchParams]);

  return {
    form,
    onSearch,
    isLoading,
    onStatusChange,
    onReset,
    pagination: allPartnerData?.data.data,
    table,
  };
};
