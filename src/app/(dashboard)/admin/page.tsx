import { Loading } from '@/components';
import { AdminDashboardPage } from '@/features/admin';
import { Metadata } from 'next';
import React, { Suspense } from 'react';
export const metadata: Metadata = {
  title: 'Admin',
  alternates: {
    canonical: '/admin',
  },
};
const AdminPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AdminDashboardPage />
    </Suspense>
  );
};

export default AdminPage;
