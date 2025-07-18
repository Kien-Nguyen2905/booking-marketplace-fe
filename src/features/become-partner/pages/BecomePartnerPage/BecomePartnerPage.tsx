'use client';

import { Loading, PartnerInformation } from '@/components';
import { useGetPartnerByUserIdQuery } from '@/queries';

const BecomePartnerPage = () => {
  const { data: partner, isLoading } = useGetPartnerByUserIdQuery(true);
  if (isLoading) return <Loading />;
  return (
    <div className="container mx-auto lg:px-10 py-3 lg:pt-5 lg:pb-100">
      <PartnerInformation partner={partner?.data?.data} />
    </div>
  );
};

export default BecomePartnerPage;
