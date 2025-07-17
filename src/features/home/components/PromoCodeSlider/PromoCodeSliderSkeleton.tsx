import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const PromoCodeSliderSkeleton = () => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm p-4 min-h-[100px]">
      <div className="flex items-center mb-3">
        <Skeleton className="h-8 w-8 rounded-full mr-2" />
        <Skeleton className="h-6 w-40" />
      </div>

      <div className="flex items-center justify-between mt-4">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </div>
  );
};

export default PromoCodeSliderSkeleton;
