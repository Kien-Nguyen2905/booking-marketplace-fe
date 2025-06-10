import React, { Suspense } from 'react';
import { NotificationTable } from './components';
import { Loading } from '@/components';

const AdminNotificationsPage = () => {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <NotificationTable />
    </Suspense>
  );
};

export default AdminNotificationsPage;
