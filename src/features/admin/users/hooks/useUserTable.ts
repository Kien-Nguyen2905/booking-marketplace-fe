import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';
import { useGetAllUsers } from '@/queries';
import { useDebounce } from '@/hooks';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { userColumns } from '@/features/admin/users/components/UserTable/UserColumn';
import { LIMIT, ROUTES } from '@/constants';
import { setParamsDefault } from '@/lib/utils';
import { GetUserProfileResType } from '@/models';
export const useUserTable = () => {
  const searchParams = useSearchParams();
  const { data: allUserData, isLoading: isLoadingGetAllUsers } = useGetAllUsers(
    searchParams.toString() || `limit=${LIMIT}&page=1`,
  );

  const isLoading = useDebounce({
    initialValue: isLoadingGetAllUsers,
    delay: 700,
  });

  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams.toString());

  const [selectedUser, setSelectedUser] =
    useState<GetUserProfileResType | null>(null);
  const [open, setOpen] = useState(false);
  const form = useForm<{ search: string; role: string; status: string }>({
    defaultValues: {
      search: searchParams.get('search') || '',
      role: searchParams.get('role') || '',
      status: searchParams.get('status') || '',
    },
  });

  const table = useReactTable({
    data: allUserData?.data?.data.data || [],
    columns: userColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onResetValues = () => {
    form.reset({
      search: '',
      role: '',
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

  const onRoleChange = () => {
    params.set('role', form.watch('role'));
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  };

  const onOpenChange = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const onReset = () => {
    onResetValues();
    params.delete('search');
    params.delete('role');
    params.delete('status');
    const newQueryString = setParamsDefault(params);
    router.push(`${pathname}?${newQueryString}`);
  };

  useEffect(() => {
    if (pathname === ROUTES.ADMIN.USERS && searchParams.toString() === '') {
      onResetValues();
    }
  }, [pathname, form, searchParams]);

  return {
    onSearch,
    form,
    onOpenChange,
    selectedUser,
    open,
    setSelectedUser,
    setOpen,
    isLoading,
    onStatusChange,
    onRoleChange,
    onReset,
    pagination: allUserData?.data.data,
    table,
  };
};
