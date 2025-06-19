'use client';

import { Loading } from '@/components';
import { AccountOrderPage } from '@/features/account/pages';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <AccountOrderPage />
    </Suspense>
  );
}
