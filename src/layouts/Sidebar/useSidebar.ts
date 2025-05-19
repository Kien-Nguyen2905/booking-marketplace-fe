import { MANAGEMENT_NAV_LINKS } from '@/constants';
import { useAppContext } from '@/context/AppProvider';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useSidebar = () => {
  const { role, isAuthenticated } = useAppContext();
  const pathname = usePathname();
  const [links, setLinks] =
    useState<
      (typeof MANAGEMENT_NAV_LINKS)[keyof typeof MANAGEMENT_NAV_LINKS]
    >();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        if (role && isAuthenticated) {
          setLinks(MANAGEMENT_NAV_LINKS[role]);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [role, isAuthenticated]);
  return {
    links,
    pathname,
  };
};
