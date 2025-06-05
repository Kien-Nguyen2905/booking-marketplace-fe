import { Loading, SearchHorizontalBar } from '@/components';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <SearchHorizontalBar />
      <main>{children}</main>
    </Suspense>
  );
}
