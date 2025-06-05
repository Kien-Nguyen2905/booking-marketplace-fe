import { HomePage } from '@/features';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { Loading } from '@/components';

export const metadata: Metadata = {
  title: 'Booking',
  alternates: {
    canonical: '/',
  },
};
export default function Page() {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <HomePage />
    </Suspense>
  );
}
