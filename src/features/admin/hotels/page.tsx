import React from 'react';
import { Suspense } from 'react';
import { Loading } from '@/components';
import { HotelTable } from '@/features/admin/hotels/components/HotelTable';

const AdminHotelPage = () => {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <HotelTable />
    </Suspense>
  );
};

export default AdminHotelPage;
