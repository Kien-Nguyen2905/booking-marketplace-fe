import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Partner',
  alternates: {
    canonical: '/partner',
  },
};
const PartnerPage = () => {
  return <div className="h-[1200px]">Hello Partner</div>;
};

export default PartnerPage;
