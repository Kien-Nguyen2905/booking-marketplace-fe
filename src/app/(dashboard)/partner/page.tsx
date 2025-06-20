import { Loading } from '@/components';
import { PartnerDashboardPage } from '@/features/partner';
import { Metadata } from 'next';
import React, { Suspense } from 'react';
export const metadata: Metadata = {
  title: 'Partner',
  alternates: {
    canonical: '/partner',
  },
};
const PartnerPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PartnerDashboardPage />
    </Suspense>
  );
};

export default PartnerPage;
