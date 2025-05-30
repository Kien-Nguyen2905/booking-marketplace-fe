'use client';
import { Loading } from '@/components';
import { PartnerTable } from '@/features/admin/partners/components';
import { Suspense } from 'react';

const AdminPartnerPage = () => {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <PartnerTable />
    </Suspense>
  );
};

export default AdminPartnerPage;
