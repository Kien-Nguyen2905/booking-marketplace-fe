import { Skeleton } from '@/components/ui/skeleton';

export const HotelItemSkeleton = () => {
  return (
    <div className="flex border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Left side - Hotel image skeleton */}
      <div className="w-[280px] h-[220px] relative">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Right side - Hotel details */}
      <div className="flex-1 p-4 flex justify-between">
        <div className="space-y-4 flex-1">
          {/* Hotel name and rating */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <Skeleton className="h-7 w-64" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          {/* Location info */}
          <Skeleton className="h-4 w-48" />
          {/* Amenities row */}
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end space-y-5">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-15 w-30" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </div>
  );
};

export default HotelItemSkeleton;
