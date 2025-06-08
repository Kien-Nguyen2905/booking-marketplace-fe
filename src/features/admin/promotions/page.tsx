import React from 'react';
import { Suspense } from 'react';
import { Loading } from '@/components';
import { PromotionTable } from '@/features/admin/promotions/components';

const AdminPromotionsPage = () => {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <PromotionTable />
    </Suspense>
  );
};

export default AdminPromotionsPage;
