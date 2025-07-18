'use client';

import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import { TBecomePartnerHeaderProps } from '@/layouts/BecomePartnerHeader/types';
import { useBecomePartnerHeader } from '@/layouts/BecomePartnerHeader/useAccommodationHeader';
import Link from 'next/link';
import { MapPinHouse } from 'lucide-react';
import { ROUTES } from '@/constants';

const BecomePartnerHeader: FC<TBecomePartnerHeaderProps> = ({ className }) => {
  const { step, partner } = useBecomePartnerHeader();
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 bg-white shadow-sm',
        className,
      )}
    >
      <div className="mx-auto max-w-7x">
        <div className="flex items-center h-19 justify-between px-6">
          <div className="flex-shrink-0 text-[var(--blue-primary)] ">
            <Link href="/" className="flex items-center">
              <MapPinHouse size={24} />
              <span className="ml-2 text-2xl font-bold hidden sm:block">
                Booking
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-end h-full">
            <div className="flex items-center gap-2 md:gap-5">
              <Link
                href={ROUTES.BECOME_PARTNER.PARTNER}
                className="flex items-center gap-2"
              >
                <div
                  className={cn(
                    'w-6 h-6 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center',
                    step === 1 && 'bg-primary text-white border-primary',
                  )}
                >
                  1
                </div>
                <span className="font-medium">Partner</span>
              </Link>
              <div className="border-t border-black w-8 md:w-16"></div>
              <Link
                href={partner ? ROUTES.BECOME_PARTNER.HOTEL : '#'}
                className="flex items-center gap-2"
              >
                <div
                  className={cn(
                    'w-6 h-6 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center',
                    step === 2 && 'bg-primary text-white border-primary',
                  )}
                >
                  2
                </div>
                <span className="font-medium">Hotel</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BecomePartnerHeader;
