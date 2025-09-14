import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ROUTES } from '@/constants';

export const useBecomePartnerStep = () => {
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
  return {
    step,
    setStep,
    onNavigateNextStep,
  };
};
