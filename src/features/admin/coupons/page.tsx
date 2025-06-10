import React from 'react';
import { CouponTable } from './components/CouponTable';
import { Loading } from '@/components';
import { Suspense } from 'react';

const AdminCouponPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CouponTable />
    </Suspense>
  );
};

export default AdminCouponPage;
