'use client';

import { useHotelPage } from './hooks/useHotelPage';
import {
  HotelItem,
  HotelSortOptions,
  HotelSidebar,
  HotelItemSkeleton,
} from '@/features/hotel/components';
import { CPagination } from '@/components';

const HotelPage = () => {
  const { hotels, pagination, isLoading, queryStringDetail, promotion } =
    useHotelPage();
  return (
    <div className="container mx-auto pt-[200px] md:pt-[100px] lg:pt-[130px] ">
      <div className="w-full justify-center md:justify-end flex mb-4 px-4">
        <HotelSortOptions />
      </div>
      <div className="flex gap-4 flex-col md:gap-0 md:flex-row w-full">
        <HotelSidebar />
        <div className="flex-1 space-y-4 w-full">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <HotelItemSkeleton key={index} />
            ))
          ) : hotels?.length > 0 ? (
            <div className="pb-10 space-y-10">
              <div className="space-y-4">
                {hotels.map((hotel) => (
                  <div key={hotel.id}>
                    <HotelItem
                      hotel={hotel}
                      queryStringDetail={queryStringDetail}
                      promotion={promotion || null}
                    />
                  </div>
                ))}
              </div>
              <CPagination
                currentPage={pagination?.page as number}
                totalPages={pagination?.totalPages as number}
                totalItems={pagination?.totalItems as number}
                itemsPerPage={pagination?.limit as number}
              />
            </div>
          ) : (
            <div className="pb-10">Not found hotels</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
