import React from 'react';
import { Suspense } from 'react';
import { Loading } from '@/components';
import { TransactionTable } from '@/features/admin/transactions/components';

const AdminTransactionsPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <TransactionTable />
    </Suspense>
  );
};

export default AdminTransactionsPage;
