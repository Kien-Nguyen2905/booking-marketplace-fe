import { Loading } from '@/components';
import { OrderPartnerTable } from '@/features/partner/orders/components';
import React, { Suspense } from 'react';

const PartnerOrderPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <OrderPartnerTable />
    </Suspense>
  );
};

export default PartnerOrderPage;
