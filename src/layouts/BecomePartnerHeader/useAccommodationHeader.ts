'use client';

import { ROUTES } from '@/constants';
import { useGetPartnerByUserIdQuery } from '@/queries';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useBecomePartnerStep } from '@/hooks';

export const useBecomePartnerHeader = () => {
  const { data: partner } = useGetPartnerByUserIdQuery(true);
  const { step, setStep, onNavigateNextStep } = useBecomePartnerStep();

  const router = useRouter();
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
