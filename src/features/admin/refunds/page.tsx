import React, { Suspense } from 'react';
import { RefundTable } from './components';
import { Loading } from '@/components';

const AdminRefundsPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RefundTable />
    </Suspense>
  );
};

export default AdminRefundsPage;
