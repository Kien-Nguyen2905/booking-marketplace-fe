import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Admin',
  alternates: {
    canonical: '/admin',
  },
};
const AdminPage = () => {
  return <div className="h-[1200px]">Hello Admin</div>;
};

export default AdminPage;
