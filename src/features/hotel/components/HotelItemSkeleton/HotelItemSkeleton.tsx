import { Skeleton } from '@/components/ui/skeleton';

export const HotelItemSkeleton = () => {
  return (
    <div className="mx-4 md:mx-0 mb-4 border lg:flex lg:justify-between border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Hotel image skeleton - Full width on mobile, fixed width on desktop */}
        <div className="w-full md:w-[250px] lg:w-[280px] h-[250px] md:h-[210px] relative">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Hotel details - Stack vertically on mobile */}
        <div className="flex-1 p-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-3 md:space-y-4 flex-1">
            {/* Hotel name and rating */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-6 md:h-7 w-[180px] md:w-64" />
                <Skeleton className="h-4 w-32 md:w-40" />
              </div>
            </div>
            {/* Location info */}
            <Skeleton className="h-4 w-full md:w-48" />
            {/* Amenities row */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  className="h-5 md:h-6 w-16 md:w-20 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Price and button section - Side by side on mobile, vertical on desktop */}
      <div className="flex p-4 lg:flex-col items-center justify-between lg:justify-start lg:items-end w-full lg:w-auto lg:space-y-5">
        <Skeleton className="h-8 w-8 hidden lg:block" />
        <div className="flex flex-col items-start lg:items-end">
          <Skeleton className="h-6 md:h-7 w-24 md:w-28" />
          <Skeleton className="h-4 w-32 mt-1" />
        </div>
        <Skeleton className="h-10 w-28 md:w-32" />
      </div>
    </div>
  );
};

export default HotelItemSkeleton;
