import { Skeleton } from '@/components/ui/skeleton';

export const RecommendedAccommodationSkeleton = () => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden border border-gray-200">
      {/* Image skeleton */}
      <div className="relative h-48 overflow-hidden">
        <Skeleton className="h-full w-full" />
        {/* Promotion tag skeleton */}
        <div className="absolute top-0 left-0 m-2">
          <Skeleton className="h-6 w-20 rounded-lg" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-4">
        <div className="pb-2">
          {/* Hotel name skeleton */}
          <Skeleton className="h-5 w-3/4 mb-1" />
          {/* Rating skeleton */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-3 w-3" />
            ))}
          </div>
        </div>

        {/* Address skeleton */}
        <Skeleton className="h-4 w-full mt-1" />

        {/* Hotel type skeleton */}
        <Skeleton className="h-4 w-1/3 mt-1" />

        {/* Price skeleton */}
        <div className="flex items-baseline mt-2">
          {/* Original price (crossed out) */}
          <Skeleton className="h-4 w-16 mr-2" />
          {/* Discounted price */}
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
};

export default RecommendedAccommodationSkeleton;
