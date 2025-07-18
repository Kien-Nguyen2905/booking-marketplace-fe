'use client';
import { useHotelDetailPage } from '@/features/hotel/hooks';
import {
  Gallery,
  Loading,
  RoomCarousel,
  RoomDetailModal,
  StartRating,
} from '@/components';
import { MAP_HOTEL_TYPE, POLICY_TYPE } from '@/constants';
import { Badge } from '@/components/ui/badge';
import {
  BookmarkCheck,
  BookmarkPlus,
  CalendarOff,
  CheckCircle2,
  HandCoins,
  House,
  Info,
  MapPin,
  RefreshCwOff,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChildIcon, PeopleIcon } from '@/icons';
import { format } from 'date-fns';
import { HotelReview } from '@/features/hotel/components';

const HotelDetailPage = () => {
  const {
    hotel,
    amenityServices,
    amenityPublic,
    isModalOpen,
    handleCloseModal,
    handleOpenRoomDetails,
    selectedRoomType,
    availableRooms,
    availableParam,
    adultParam,
    childParam,
    handleWishlist,
    wishlist,
    promotion,
    isFuture,
    startDateParams,
    onBookNow,
    isLoadingNavigate,
    dateRange,
    reviews,
  } = useHotelDetailPage();

  if (!hotel || isLoadingNavigate) return <Loading />;

  return (
    <div className="pt-[130px] container mx-auto px-4 md:px-6">
      <Gallery images={hotel?.images || []} />
      <div className="w-full mb-8">
        <Card className="overflow-hidden !pt-0 border-[1px] border-gray-100 shadow-sm mb-8">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r flex justify-between items-start from-[var(--blue-primary)] to-[var(--blue-second)] p-6 md:p-8">
              <div className="flex flex-col  md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {hotel?.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">
                      <House className="mr-1 h-3.5 w-3.5" />
                      {MAP_HOTEL_TYPE[hotel.type]}
                    </Badge>
                    <StartRating size={16} rating={hotel.rating} />
                  </div>
                  <div className="flex items-center gap-3 pt-3 text-white">
                    <MapPin className="h-5 w-5 text-white" />
                    <span className="text-sm md:text-base">
                      {hotel?.address}
                    </span>
                  </div>
                </div>
              </div>

              <div
                onClick={handleWishlist}
                className="text-white cursor-pointer "
              >
                {wishlist ? (
                  <BookmarkCheck className="h-9 w-9" />
                ) : (
                  <BookmarkPlus className="h-9 w-9" />
                )}
              </div>
            </div>
            <div className="px-8 pt-8 space-y-3">
              <div className="space-y-3">
                <h2 className="font-bold text-xl">Description</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 text-sm">{hotel?.description}</p>
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="font-bold text-xl">Amenity</h2>
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
                  {amenityPublic && amenityPublic?.length > 0 && (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-[var(--blue-dark)] mb-4 flex items-center">
                        <Info className="mr-2 h-4 w-4" /> Public
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
            </div>
          </CardContent>
        </Card>
        <div className="space-y-10">
          {hotel.roomType?.map((room) => {
            if (room.adults !== adultParam || (room.child || 0) !== childParam)
              return null;
            return (
              <Card key={room.id}>
                <CardContent>
                  <div className="space-y-4">
                    <h2 className="font-bold text-xl">{room.type}</h2>
                    <div className="flex flex-col lg:flex-row gap-6">
                      <RoomCarousel
                        room={room}
                        handleOpenRoomDetails={handleOpenRoomDetails}
                      />
                      <div className="w-full flex-1">
                        <div className="grid grid-cols-12 px-4 font-bold py-3 bg-gray-100 rounded-t-lg text-sm border border-gray-200">
                          <div className="col-span-4 md:col-span-3 text-left">
                            Policy
                          </div>
                          <div className="hidden md:block col-span-1 text-center">
                            Available
                          </div>
                          <div className="hidden md:block col-span-2 text-right">
                            Capacity
                          </div>
                          <div className="col-span-5 md:col-span-4 text-right">
                            Price/night
                          </div>
                          <div className="col-span-3 md:col-span-2 text-right">
                            Booking
                          </div>
                        </div>
                        <div className="border-x border-b border-gray-200 rounded-b-lg overflow-hidden">
                          {room.room.map((item, index) => {
                            const availableRoom = availableRooms.find(
                              (room) => room?.id === item.id,
                            );
                            if (
                              item.policy === POLICY_TYPE.FREE_CANCELLATION &&
                              !isFuture
                            )
                              return null;
                            if (
                              item.rangeLimitDate &&
                              item.rangeLimitDate < dateRange.length
                            ) {
                              return null;
                            }
                            return (
                              availableRoom &&
                              availableRoom.availableRooms >=
                                availableParam && (
                                <div
                                  key={index}
                                  className={`p-2 md:p-4 grid grid-cols-12 items-start hover:bg-gray-50 transition-colors ${
                                    index !== 0
                                      ? 'border-t border-gray-200'
                                      : ''
                                  }`}
                                >
                                  <div className="col-span-4 md:col-span-3">
                                    <div className="flex flex-col gap-1">
                                      <div className="flex items-center">
                                        {item.policy ===
                                        POLICY_TYPE.FREE_CANCELLATION ? (
                                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 text-[8px] md:text-[12px]">
                                            <CalendarOff
                                              size={14}
                                              className="mr-1"
                                            />
                                            Free Cancellation
                                          </Badge>
                                        ) : item.policy ===
                                          POLICY_TYPE.PAY_AT_HOTEL ? (
                                          <Badge className="bg-blue-100 text-primary hover:bg-blue-100 border-0 text-[8px] md:text-[12px]">
                                            <HandCoins
                                              size={14}
                                              className="mr-1"
                                            />
                                            Pay at Hotel
                                          </Badge>
                                        ) : (
                                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 text-[8px] md:text-[12px]">
                                            <RefreshCwOff
                                              size={14}
                                              className="mr-1"
                                            />
                                            Non-Refundable
                                          </Badge>
                                        )}
                                      </div>
                                      {item.policy ===
                                        POLICY_TYPE.FREE_CANCELLATION && (
                                        <div className="flex items-start gap-1 text-gray-500 mt-1">
                                          <HandCoins
                                            size={16}
                                            className="text-green-500"
                                          />
                                          <span className="text-[8px] md:text-[12px]">
                                            Get all refund when cancel before
                                            14:00 {startDateParams}
                                          </span>
                                        </div>
                                      )}
                                      {(item?.rangeLimitDate || 0) > 0 && (
                                        <span className="text-[8px] md:text-[12px] text-gray-500 mt-1">
                                          Limit booking: {item.rangeLimitDate}{' '}
                                          nights
                                        </span>
                                      )}
                                      {item.notePolicy && (
                                        <span className="text-[8px] md:text-[12px] text-gray-500 mt-1">
                                          {item.notePolicy}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="hidden md:block col-span-1 text-center">
                                    {availableRoom.availableRooms}
                                  </div>
                                  <div className="hidden md:flex col-span-2 gap-1 justify-end">
                                    <div className="flex items-center gap-[2px]">
                                      <PeopleIcon />
                                      <span className="text-sm">
                                        {room.adults}
                                      </span>
                                    </div>
                                    {room?.child && room.child > 0 ? (
                                      <div className="flex items-center gap-[2px]">
                                        <ChildIcon />
                                        <span className="text-sm">
                                          {room.child}
                                        </span>
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="col-span-5 md:col-span-4">
                                    <div className="mb-2 flex flex-col items-end">
                                      {promotion &&
                                        promotion?.percentage > 0 && (
                                          <div className="text-gray-500 text-[10px] md:text-[12px] line-through mb-1">
                                            {formatCurrency(item.price)}
                                          </div>
                                        )}
                                      <div className="text-orange-500 text-[12px] md:text-lg font-bold">
                                        {formatCurrency(
                                          item.price *
                                            (1 - (promotion?.percentage || 0)),
                                        )}
                                      </div>
                                      {promotion &&
                                        promotion.percentage > 0 && (
                                          <span className="text-[10px] md:text-[12px] text-right font-bold text-red-500">
                                            Sale from{' '}
                                            {format(
                                              promotion.validFrom,
                                              'dd/MM/yyyy',
                                            )}{' '}
                                            <br />
                                            to{' '}
                                            {format(
                                              promotion.validUntil,
                                              'dd/MM/yyyy',
                                            )}
                                          </span>
                                        )}
                                      <div className="text-[8px] md:text-[12px] text-gray-500">
                                        Exclude taxes & fees
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-span-3 md:col-span-2 flex justify-end">
                                    <Button
                                      onClick={() =>
                                        onBookNow(
                                          item.roomTypeId,
                                          item.id,
                                          item.policy,
                                        )
                                      }
                                      className="bg-orange-500 hover:bg-orange-600 w-max"
                                    >
                                      Book
                                    </Button>
                                  </div>
                                </div>
                              )
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <HotelReview reviewData={reviews?.data || []} />
      <RoomDetailModal
        open={isModalOpen}
        onOpenChange={handleCloseModal}
        roomType={selectedRoomType!}
      />
    </div>
  );
};

export default HotelDetailPage;
