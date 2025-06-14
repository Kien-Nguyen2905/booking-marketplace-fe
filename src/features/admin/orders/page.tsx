import { Loading } from '@/components';
import { OrderTable } from '@/features/admin/orders/components/OrderTable';
import React, { Suspense } from 'react';

const AdminOrderPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <OrderTable />
    </Suspense>
  );
};

export default AdminOrderPage;
