'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'motion/react';
import { MAP_HOTEL_TYPE, POPULAR_ACCOMMODATION_LIST } from '@/constants';
import { useRecommendedAccommodations } from './useRecommendedAccommodations';
import { HotelByIdProvinceCodeResType } from '@/models/hotel.model';
import { getHotelUrl } from '@/lib/utils';

const RecommendedAccommodations = () => {
  const {
    activeTab,
    setActiveTab,
    setIsBeginning,
    isBeginning,
    setIsEnd,
    isEnd,
    setSwiper,
    hotelsData,
    nextBtnRef,
    prevBtnRef,
  } = useRecommendedAccommodations();

  return (
    <div className="w-full relative pt-8 pb-10">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          The recommended popular accommodations
        </h2>
        <Tabs
          defaultValue={POPULAR_ACCOMMODATION_LIST[0]?.provinceCode}
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
          }}
          className="w-full mb-8"
        >
          <TabsList className="flex overflow-x-auto space-x-2 bg-transparent h-auto p-0 mb-6 scrollbar-hide">
            {POPULAR_ACCOMMODATION_LIST.map((location) => (
              <TabsTrigger
                key={location.provinceCode}
                value={location.provinceCode}
                className="px-4 py-2 rounded-md data-[state=active]:bg-[var(--blue-primary)] data-[state=active]:text-white text-gray-700 hover:bg-gray-100 data-[state=active]:hover:bg-[var(--blue-primary)]"
              >
                {location.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {POPULAR_ACCOMMODATION_LIST.map((location) => (
            <TabsContent
              key={location.provinceCode}
              value={location.provinceCode}
              className="mt-0"
            >
              <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1.2}
                spaceBetween={16}
                breakpoints={{
                  640: { slidesPerView: 2.2 },
                  768: { slidesPerView: 2.2 },
                  1024: { slidesPerView: 3.2 },
                  1280: { slidesPerView: 4.2 },
                }}
                className="w-full"
                onSwiper={(swiperInstance) => {
                  setSwiper(swiperInstance);
                  // @ts-ignore
                  swiperInstance.params.navigation.prevEl = prevBtnRef.current;
                  // @ts-ignore
                  swiperInstance.params.navigation.nextEl = nextBtnRef.current;
                  // Initialize modules with the new elements
                  swiperInstance.navigation.init();
                  swiperInstance.navigation.update();
                }}
                onSlideChange={(swiperInstance) => {
                  setIsBeginning(swiperInstance.isBeginning);
                  setIsEnd(swiperInstance.isEnd);
                }}
              >
                {activeTab === location.provinceCode && hotelsData?.data
                  ? hotelsData?.data?.data?.map(
                      (hotel: HotelByIdProvinceCodeResType) => {
                        return (
                          <SwiperSlide key={hotel.id}>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Link
                                href={getHotelUrl({
                                  hotelId: hotel.id || '',
                                })}
                                className="flex flex-col group rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200"
                              >
                                <div className="relative h-48 overflow-hidden">
                                  <Image
                                    src={hotel?.images?.[0] || ''}
                                    alt={hotel.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                  <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md text-sm font-medium">
                                    {Number(hotel.rating).toFixed(1)}
                                  </div>
                                </div>
                                <div className="p-4">
                                  <h3 className="text-gray-800 font-medium line-clamp-1">
                                    {hotel.name}
                                  </h3>

                                  <span className=" mt-1 text-sm text-gray-500 line-clamp-2">
                                    {hotel.address}
                                  </span>

                                  <div className="mt-1 text-sm text-gray-500">
                                    {MAP_HOTEL_TYPE[hotel.type]}
                                  </div>

                                  <div className="flex items-baseline mt-2">
                                    {hotel.roomType?.[0]?.room[0]?.price && (
                                      <span className="text-gray-400 line-through mr-2 text-sm">
                                        {hotel.roomType?.[0]?.room[0]?.price.toLocaleString()}{' '}
                                        VND
                                      </span>
                                    )}
                                    <span className="text-[var(--blue-primary)] font-medium">
                                      {hotel.roomType?.[0]?.room[0]?.price.toLocaleString()}{' '}
                                      VND
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          </SwiperSlide>
                        );
                      },
                    )
                  : null}
                {!isBeginning && (
                  <Button
                    ref={prevBtnRef}
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-[35%] -translate-y-1/2 rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm shadow-md z-10 border-gray-200"
                  >
                    <ChevronLeft className="h-5 w-5 text-[var(--blue-primary)]" />
                  </Button>
                )}
                {!isEnd && (
                  <Button
                    ref={nextBtnRef}
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-[35%] -translate-y-1/2 rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm shadow-md z-10 border-gray-200"
                  >
                    <ChevronRight className="h-5 w-5 text-[var(--blue-primary)]" />
                  </Button>
                )}
              </Swiper>
              {!hotelsData?.data ||
                (hotelsData.data.data.length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                    Not found any popular accommodations in {location.name}
                  </div>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default RecommendedAccommodations;
