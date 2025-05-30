'use client';

import { ROUTES } from '@/constants';
import { useGetPartnerByUserIdQuery } from '@/queries';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useBecomePartnerHeader = () => {
  const { data: partner } = useGetPartnerByUserIdQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [step, setStep] = useState(1);

  const onNavigateNextStep = () => {
    setStep(2);
    router.push(ROUTES.BECOME_PARTNER.HOTEL);
  };

  useEffect(() => {
    if (pathname === ROUTES.BECOME_PARTNER.PARTNER) {
      setStep(1);
    } else if (pathname === ROUTES.BECOME_PARTNER.HOTEL) {
      setStep(2);
    }
  }, [pathname]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        if (!partner?.data?.data) {
          router.push(ROUTES.BECOME_PARTNER.PARTNER);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [partner, router]);
  return {
    step,
    setStep,
    partner: partner?.data.data,
    onNavigateNextStep,
  };
};
