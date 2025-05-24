'use client';
import { Loading } from '@/components';
import { UserTable } from '@/features/admin/users/components';
import { Suspense } from 'react';

const AdminUsersPage = () => {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <UserTable />
    </Suspense>
  );
};

export default AdminUsersPage;
