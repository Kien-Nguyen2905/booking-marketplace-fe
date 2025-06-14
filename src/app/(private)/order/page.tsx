'use client';
import { Loading } from '@/components';
import { OrderPage } from '@/features';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <OrderPage />
    </Suspense>
  );
}
