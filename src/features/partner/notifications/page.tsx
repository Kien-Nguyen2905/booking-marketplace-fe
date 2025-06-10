import React, { Suspense } from 'react';
import { NotificationTable } from './components';
import { Loading } from '@/components';

const NotificationsPage = () => {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <NotificationTable />
    </Suspense>
  );
};

export default NotificationsPage;
