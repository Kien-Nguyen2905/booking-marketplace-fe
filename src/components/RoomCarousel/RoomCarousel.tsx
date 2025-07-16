'use client';

import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './RoomCarousel.css';
import Image from 'next/image';
import { ChildIcon, PeopleIcon } from '@/icons';
import { Bed, Info, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TRoomCarouselProps } from './type.d';

const RoomCarousel: FC<TRoomCarouselProps> = ({
  room,
  handleOpenRoomDetails,
}) => {
  return (
    <div className="w-full lg:w-[360px] relative">
      {/* Room image carousel */}
      <div className="relative h-[240px] rounded-md overflow-hidden shadow-md">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="h-full w-full swiper-hotel-room-card"
          loop={room?.images?.length > 1}
        >
          {room?.images?.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-full h-full cursor-pointer"
                onClick={() => handleOpenRoomDetails(room)}
              >
                <Image
                  src={image}
                  alt={`${room.type} room image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Room key information */}
      <div className="bg-gray-50 p-4 mt-5 rounded-md border border-gray-100 shadow-sm">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-1">
            <PeopleIcon />
            <span className="text-sm">{room.adults}</span>
          </div>
          {room.child && room.child > 0 ? (
            <div className="flex items-center gap-1">
              <ChildIcon />
              <span className="text-sm">{room.child} </span>
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex items-center gap-1">
            <Ruler className="text-gray-500" size={18} />
            <span className="text-sm">{room.area} m²</span>
          </div>
          {room.roomBed && (
            <div className="flex items-center gap-1">
              <Bed className="text-gray-500" size={18} />
              <span className="text-sm">{room.roomBed.length}</span>
            </div>
          )}
        </div>
        <Button
          className="mt-5 w-full"
          onClick={() => handleOpenRoomDetails(room)}
        >
          <Info size={16} className="mr-2" />
          View detail
        </Button>
      </div>
    </div>
  );
};

export default RoomCarousel;
