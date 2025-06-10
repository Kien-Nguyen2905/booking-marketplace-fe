'use client';
import React, { Fragment } from 'react';
import {
  ButtonBack,
  LoadingButton,
  RoomCarousel,
  RoomDetailModal,
} from '@/components';
import { HOTEL_STATUS, MAP_HOTEL_TYPE, ROUTES } from '@/constants';
import { useHotelPageDetail } from '@/features/admin/hotels/hooks';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import {
  CalendarOff,
  CheckCircle2,
  HandCoins,
  Info,
  RefreshCwOff,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const HotelPageDetail = () => {
  const {
    hotel,
    provinceList,
    districtList,
    wardList,
    isModalOpen,
    handleCloseModal,
    handleOpenRoomDetails,
    selectedRoomType,
    amenityServices,
    amenityPublic,
    handleUpdateStatusHotel,
    isPendingUpdateHotel,
  } = useHotelPageDetail();
  if (!hotel) {
    return (
      <div className="flex items-center justify-between">
        <div>Not found</div>
        <ButtonBack link={ROUTES.ADMIN.HOTELS} />
      </div>
    );
  }
  return (
    <div>
      {hotel?.name}
      <div className="pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p>Hotel ID: #{hotel?.id}</p>
            <span
              className={`text-xs font-bold ${
                hotel?.status === HOTEL_STATUS.ACTIVE
                  ? 'text-green-800'
                  : hotel?.status === HOTEL_STATUS.PENDING
                  ? 'text-yellow-800'
                  : hotel?.status === HOTEL_STATUS.INACTIVE
                  ? 'text-red-800'
                  : 'text-gray-800'
              }`}
            >
              {hotel?.status}
            </span>
          </div>
          <Button
            variant={
              hotel.status === HOTEL_STATUS.ACTIVE ? 'destructive' : 'default'
            }
            onClick={handleUpdateStatusHotel}
            disabled={isPendingUpdateHotel}
            className="w-[110px h-9 relative"
          >
            {isPendingUpdateHotel ? (
              <LoadingButton />
            ) : hotel.status === HOTEL_STATUS.ACTIVE ? (
              'Inactive'
            ) : (
              'Active'
            )}
          </Button>
        </div>
        <div className="pt-4">
          <Carousel className="w-full cursor-grab">
            <CarouselContent className="-ml-1">
              {hotel?.images?.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                      fill
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="flex justify-between pt-4">
            <div className="space-y-2 w-1/2">
              <div className="flex gap-1">
                <p className="font-semibold">Name:</p>
                <p>{hotel?.name}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Phone:</p>
                <p>{hotel?.hotelPhoneNumber}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Type:</p>
                <p>{MAP_HOTEL_TYPE[hotel?.type]}</p>
              </div>
              <div className="flex gap-5">
                <div className="flex gap-1">
                  <p className="font-semibold">Reputation:</p>
                  <p>{hotel?.reputationScore}</p>
                </div>
                <div className="flex gap-1">
                  <p className="font-semibold">VAT:</p>
                  <p>{hotel?.vat ? Math.round(hotel.vat * 100) : 0}%</p>
                </div>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Province:</p>
                <p>
                  {
                    provinceList?.find(
                      (item) => item.code === hotel?.provinceCode,
                    )?.name
                  }
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">District:</p>
                <p>
                  {
                    districtList?.find(
                      (item) => item.code === hotel?.districtCode,
                    )?.name
                  }
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Ward:</p>
                <p>
                  {
                    wardList?.find((item) => item.code === hotel?.wardCode)
                      ?.name
                  }
                </p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold">Address:</p>
                <p>{hotel?.address}</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold">Description:</p>
              <p className="text-sm">{hotel?.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10 space-y-3">
        <h2 className="font-bold text-xl">Amenity</h2>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
          {amenityPublic && amenityPublic?.length > 0 && (
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-[var(--blue-dark)] mb-4 flex items-center">
                <Info className="mr-2 h-4 w-4" /> Public Areas
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {amenityPublic.map((amenity, index) => (
                  <li
                    key={`public-${index}`}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--blue-second)]" />
                    <span>{amenity.amenity.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {amenityServices && amenityServices?.length > 0 && (
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-[var(--blue-dark)] mb-4 flex items-center">
                <Info className="mr-2 h-4 w-4" /> Services
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {amenityServices.map((amenity, index) => (
                  <li
                    key={`service-${index}`}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--blue-second)]" />
                    <span>{amenity.amenity.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="pt-10 space-y-8">
        {hotel?.roomType?.map((room, index) => (
          <Fragment key={room.id}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl">{room.type}</h2>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left side - Room image and amenities */}
                <RoomCarousel
                  room={room}
                  handleOpenRoomDetails={handleOpenRoomDetails}
                />
                {/* Right side - Room options */}
                <div className="w-full flex-1">
                  {/* Header */}
                  <div className="grid grid-cols-12 px-4 py-3 bg-gray-100 rounded-t-lg font-medium text-gray-700 text-sm border border-gray-200">
                    <div className="col-span-4 text-left">Policy</div>
                    <div className="col-span-4 text-center">Quantity</div>
                    <div className="col-span-4 text-center">Price/night</div>
                  </div>

                  {/* Room options */}
                  <div className="border-x border-b border-gray-200 rounded-b-lg overflow-hidden">
                    {room.room.map((item, index) => (
                      <div
                        key={index}
                        className={`p-4 grid grid-cols-12 items-start hover:bg-gray-50 transition-colors ${
                          index !== 0 ? 'border-t border-gray-200' : ''
                        }`}
                      >
                        {/* Policy */}
                        <div className="col-span-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center">
                              {item.policy === 'FREE_CANCELLATION' ? (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">
                                  <CalendarOff size={14} className="mr-1" />
                                  Free Cancellation
                                </Badge>
                              ) : item.policy === 'PAY_AT_HOTEL' ? (
                                <Badge className="bg-blue-100 text-primary hover:bg-blue-100 border-0">
                                  <HandCoins size={14} className="mr-1" />
                                  Pay at Hotel
                                </Badge>
                              ) : (
                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
                                  <RefreshCwOff size={14} className="mr-1" />
                                  Non-Refundable
                                </Badge>
                              )}
                            </div>
                            {(item?.rangeLimitDate || 0) > 0 && (
                              <span className="text-xs text-gray-500 mt-1">
                                Limit range booking: {item.rangeLimitDate} days
                              </span>
                            )}
                            {item.notePolicy && (
                              <span className="text-xs text-gray-500 mt-1">
                                {item.notePolicy}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Room option details */}
                        <div className="col-span-4 text-center">
                          {item.quantity}
                        </div>

                        {/* Price */}
                        <div className="text-orange-600 col-span-4 text-xl text-center font-bold">
                          {formatCurrency(item.price, 'VND')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {hotel?.roomType?.length > index + 1 && <Separator />}
          </Fragment>
        ))}
        <RoomDetailModal
          open={isModalOpen}
          onOpenChange={handleCloseModal}
          roomType={selectedRoomType!}
        />
      </div>
    </div>
  );
};

export default HotelPageDetail;
