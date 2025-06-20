'use client';
import React, { Suspense } from 'react';
import { RevenueTable } from '@/features/admin/revenue/components';
import { Loading } from '@/components';

const AdminRevenuePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RevenueTable />
    </Suspense>
  );
};

export default AdminRevenuePage;
