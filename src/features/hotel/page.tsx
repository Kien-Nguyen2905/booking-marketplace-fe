'use client';
import React from 'react';
import { useHotelPage } from './hooks/useHotelPage';
import {
  HotelItem,
  HotelSortOptions,
  HotelSidebar,
  HotelItemSkeleton,
} from '@/features/hotel/components';
import { CPagination } from '@/components';

const HotelPage = () => {
  const { hotels, pagination, isLoading, queryStringDetail } = useHotelPage();
  return (
    <div className="pt-[130px] container mx-auto">
      <div className="w-full justify-end flex mb-4">
        <HotelSortOptions />
      </div>
      <div className="flex">
        <HotelSidebar />
        <div className="flex-1 space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <HotelItemSkeleton key={index} />
            ))
          ) : hotels?.length > 0 ? (
            <div className="">
              <div className="space-y-4">
                {hotels.map((hotel) => (
                  <div key={hotel.id}>
                    <HotelItem
                      hotel={hotel}
                      queryStringDetail={queryStringDetail}
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
            <span className="pt-1">Not found hotels</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
