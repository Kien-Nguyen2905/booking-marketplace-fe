import { Loading } from '@/components';
import { CustomerTable } from '@/features/admin/customers/components/CustomerTable';
import React, { Suspense } from 'react';

const AdminCustomerPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CustomerTable />
    </Suspense>
  );
};

export default AdminCustomerPage;
