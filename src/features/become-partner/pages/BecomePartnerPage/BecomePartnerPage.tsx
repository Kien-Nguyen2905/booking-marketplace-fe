'use client';
import React from 'react';
import { Loading, PartnerInformation } from '@/components';
import { useGetPartnerByUserIdQuery } from '@/queries';

const BecomePartnerPage = () => {
  const { data: partner, isLoading } = useGetPartnerByUserIdQuery();
  if (isLoading) return <Loading />;
  return (
    <div className="container mx-auto px-10 pt-5 pb-100">
      <PartnerInformation partner={partner?.data?.data} />
    </div>
  );
};

export default BecomePartnerPage;
