import { Loading } from '@/components';
import { OauthPage } from '@/features';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <OauthPage />
    </Suspense>
  );
}
