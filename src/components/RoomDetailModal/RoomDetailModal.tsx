'use client';
import React, { FC, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './RoomDetailModal.css';
import Image from 'next/image';
import { ChildIcon, PeopleIcon } from '@/icons';
import { Separator } from '@/components/ui/separator';
import { BedSingle, Dot, Ruler } from 'lucide-react';
import { TRoomDetailModalProps } from '@/components/RoomDetailModal/type';
import { AmenityType } from '@/models/amenity.model';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';

const RoomDetailModal: FC<TRoomDetailModalProps> = ({
  open,
  roomType,
  onOpenChange,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {roomType && (
        <DialogContent className="!max-w-5xl !max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              {roomType.type} Room
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col lg:flex-row gap-6">
            {/* Room Images Gallery */}
            <div className="relative h-max w-[600px] rounded-md overflow-hidden">
              {/* Main Swiper with images */}
              <div className="mb-2 w-full h-full">
                <Swiper
                  modules={[Navigation, Pagination, Thumbs]}
                  navigation
                  pagination={{ clickable: true }}
                  className="h-[400px] w-full swiper-hotel-room-card rounded-md"
                  loop={roomType.images.length > 1}
                  grabCursor
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  slideToClickedSlide={true}
                >
                  {roomType.images.map((image: any, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full">
                        <Image
                          src={image}
                          alt={`${roomType.type} room image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {/* Thumbnail Swiper */}
              <div className="mt-2 w-full">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  watchSlidesProgress={true}
                  modules={[Thumbs]}
                  grabCursor
                  className="thumbnails-swiper"
                >
                  {roomType.images.map((image: any, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full max-h-[100px] aspect-square thumbnail-slide">
                        <Image
                          src={image}
                          alt={`${roomType.type} room thumbnail ${index + 1}`}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            {/* Room Details Section */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-4 overflow-y-auto pr-2 max-h-[400px] custom-scrollbar">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Room Capacity</h3>
                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="flex items-center gap-1">
                      <PeopleIcon />
                      <span className="text-sm">{roomType.adults}</span>
                    </div>
                    {roomType?.child && roomType.child > 0 ? (
                      <div className="flex items-center gap-1">
                        <ChildIcon />
                        <span className="text-sm">{roomType.child}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Room Area</h3>
                  <div className="flex items-center gap-1">
                    <Ruler className="text-gray-500" size={18} />
                    <span className="text-sm">{roomType.area} m²</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Bed Options</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {roomType.roomBed.map((bed: any) => (
                      <div
                        key={bed.id}
                        className="flex items-center gap-2 bg-gray-50 p-2 rounded border border-gray-200"
                      >
                        <BedSingle className="text-gray-600" size={18} />
                        <span className="capitalize">
                          {bed.quantity} {bed.roomBedType.toLowerCase()} bed
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-3">Room Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {roomType.amenities?.map((amenity: AmenityType) => (
                      <div key={amenity.id} className="flex items-center gap-2">
                        <Dot size={16} />
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 text-sm">
                    {roomType.description}
                  </p>
                </div>
              </div>
              <Button onClick={() => onOpenChange(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default RoomDetailModal;
