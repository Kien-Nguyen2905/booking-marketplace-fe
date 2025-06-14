'use client';

import { Loading } from '@/components';
import { PaymentPage } from '@/features';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentPage />
    </Suspense>
  );
}
