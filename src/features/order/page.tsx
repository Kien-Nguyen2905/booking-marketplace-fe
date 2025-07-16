'use client';
import { Loading, LoadingButton, RHFInput, StartRating } from '@/components';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MAP_POLICY } from '@/constants';
import { useOrderPage } from '@/features/order/hooks';
import { ChildIcon, PeopleIcon } from '@/icons';
import { formatCurrency, isDayDiscounted } from '@/lib/utils';
import { format } from 'date-fns';
import { BedSingle, Check, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const OrderPage = () => {
  const {
    hotel,
    roomType,
    room,
    form,
    checkIn,
    checkOut,
    nights,
    booking,
    formCoupon,
    handleApplyCoupon,
    formPoint,
    handleApplyPoint,
    availablePoint,
    handleCreateOrder,
    promotion,
    coupon,
    point,
    baseAmount,
    couponDiscountAmount,
    pointDiscountAmount,
    serviceFeeAmount,
    vatAmount,
    subtotalAmount,
    totalAmount,
    totalPromotionDiscount,
    estimatedCheckInTime,
    handleEstimatedCheckInTimeChange,
    minimumCheckInTime,
    maximumCheckInTime,
    isCreatingOrder,
    isValidateCoupon,
  } = useOrderPage();
  if (!booking) {
    return <Loading />;
  }

  return (
    <div className="space-y-4 container mx-auto py-20 flex gap-20 items-start">
      <div className="w-full flex-1 space-y-4">
        <Card>
          <CardContent className="space-y-10">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <Form {...form}>
              <form
                id="contact-form"
                className="space-y-5"
                onSubmit={form.handleSubmit(handleCreateOrder)}
              >
                <RHFInput
                  form={form}
                  name="fullName"
                  label="Full Name"
                  placeholder="Full Name"
                  required
                />
                <RHFInput
                  form={form}
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Phone Number"
                  required
                />
                <RHFInput
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="Email"
                  required
                />

                {/* Estimated check-in time component with input type="time" */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Estimated Arrival Time
                    </label>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-md h-12 flex items-center bg-gray-50">
                          {estimatedCheckInTime ? (
                            <span>
                              {format(estimatedCheckInTime, 'EEE dd-MM')}
                              {estimatedCheckInTime.getDate() !==
                              checkIn?.getDate()
                                ? ' (next day)'
                                : ''}
                            </span>
                          ) : (
                            <span>Select a time first</span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <Input
                          type="time"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md h-12"
                          value={
                            estimatedCheckInTime
                              ? format(estimatedCheckInTime, 'HH:mm')
                              : ''
                          }
                          onChange={(e) => {
                            if (e.target.value && checkIn) {
                              const [hours, minutes] = e.target.value
                                .split(':')
                                .map(Number);

                              // Create a new date based on check-in date
                              const selectedDate = new Date(checkIn);

                              // Determine if this is for the next day (hours < 14)
                              const isNextDay = hours < 12;
                              if (isNextDay) {
                                selectedDate.setDate(
                                  selectedDate.getDate() + 1,
                                );
                              }

                              // Set the hours and minutes
                              selectedDate.setHours(hours, minutes, 0, 0);

                              // Validate the time is within our allowed range
                              if (minimumCheckInTime && maximumCheckInTime) {
                                if (selectedDate < minimumCheckInTime) {
                                  // If before minimum, set to minimum
                                  handleEstimatedCheckInTimeChange(
                                    minimumCheckInTime,
                                  );
                                } else if (selectedDate > maximumCheckInTime) {
                                  // If after maximum, set to maximum
                                  handleEstimatedCheckInTimeChange(
                                    maximumCheckInTime,
                                  );
                                } else {
                                  // Within range, use the selected time
                                  handleEstimatedCheckInTimeChange(
                                    selectedDate,
                                  );
                                }
                              } else {
                                handleEstimatedCheckInTimeChange(selectedDate);
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 mt-2 text-amber-600 bg-amber-50 p-3 rounded-md">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-xs">
                      If you do not check in before 12:00 tomorrow, your
                      reservation will be canceled and no refund will be issued.
                    </p>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="space-y-4 h-full gap-10 flex">
          <Card className="w-1/2 h-full">
            <CardContent>
              <Form {...formCoupon}>
                <form
                  className="space-y-1"
                  onSubmit={formCoupon.handleSubmit(handleApplyCoupon)}
                >
                  <h2>Apply coupon </h2>
                  <div className="flex items-start gap-2 w-full">
                    <RHFInput
                      form={formCoupon}
                      name="code"
                      placeholder="Apply coupon code"
                      className="w-full"
                    />
                    <Button
                      type="submit"
                      className="w-[90px] relative h-12"
                      disabled={isValidateCoupon}
                    >
                      {isValidateCoupon ? <LoadingButton /> : 'Apply'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card className="w-1/2 h-full">
            <CardContent>
              <Form {...formPoint}>
                <form
                  className="space-y-1"
                  onSubmit={formPoint.handleSubmit(handleApplyPoint)}
                >
                  <h2>Apply point (Your point: {availablePoint})</h2>
                  <div className="flex items-start gap-2 w-full">
                    <RHFInput
                      form={formPoint}
                      name="point"
                      placeholder="Apply point"
                      className="w-full"
                      min={0}
                      type="number"
                    />
                    <Button type="submit" className="w-[90px] h-12">
                      Apply
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-bold">
              {booking?.available > 1 ? `${booking?.available} x ` : ''}
              {roomType?.type}
            </h2>

            <div className="border-b pb-3">
              <div className="flex justify-between items-center">
                <p>Price</p>
                <p>{formatCurrency(room?.price || 0)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Room</p>
                <p>{booking.available}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Night</p>
                <p>{nights}</p>
              </div>
              <div className="flex justify-between items-center font-medium">
                <p>Base Price</p>
                <p>
                  {formatCurrency(
                    (room?.price || 0) * booking.available * nights,
                  )}
                </p>
              </div>
            </div>

            {/* Promotions Section */}
            {promotion && (
              <div className="border-b pb-3">
                <h3 className="font-medium mb-2">Promotion</h3>
                {promotion && (
                  <div className="space-y-2">
                    <div className="flex text-green-600">
                      <div>
                        <p className="font-bold text-red-500">
                          {promotion.title}{' '}
                          {`From ${format(
                            promotion.validFrom,
                            'dd-MM-yyyy',
                          )} To ${format(promotion.validUntil, 'dd-MM-yyyy')}`}
                        </p>
                        <p>
                          Discount: {Math.round(promotion.percentage * 100)}%
                        </p>
                      </div>
                    </div>
                    {/* Day-by-day promotion breakdown */}
                    <div className="bg-gray-50 p-2 rounded text-sm">
                      {checkIn &&
                        checkOut &&
                        Array.from({ length: nights }).map((_, index) => {
                          const currentDate = new Date(checkIn);
                          // Tăng số ngày tương ứng với index (0 -> đêm đầu, 1 -> đêm tiếp theo, ...)
                          currentDate.setDate(currentDate.getDate() + index);
                          const dateString = format(currentDate, 'dd-MM-yyyy');
                          const isDiscounted = isDayDiscounted(
                            promotion,
                            dateString,
                          );
                          return (
                            <div
                              key={dateString}
                              className="flex justify-between items-center"
                            >
                              <p>Night_{format(currentDate, 'EEE dd-MM')}</p>
                              {isDiscounted ? (
                                <p className="text-green-600">
                                  -
                                  {formatCurrency(
                                    (room?.price || 0) *
                                      booking.available *
                                      promotion.percentage,
                                  )}
                                </p>
                              ) : (
                                <p className="text-gray-500">
                                  {formatCurrency(
                                    (room?.price || 0) * booking.available,
                                  )}
                                </p>
                              )}
                            </div>
                          );
                        })}
                    </div>
                    <div className="flex justify-end text-green-600">
                      <p>-{formatCurrency(totalPromotionDiscount)}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Price Calculation Summary */}
            <div className="border-b pb-3">
              <h3 className="font-medium mb-2">Price Calculation</h3>
              <div className="bg-gray-50 p-3 rounded space-y-2">
                {/* Base Price */}
                <div className="flex justify-between items-center">
                  <p>Base Price</p>
                  <p>{formatCurrency(baseAmount)}</p>
                </div>

                {/* Show fees */}
                <div className="flex justify-between items-center">
                  <p>
                    Service Fee (
                    {Math.round((roomType?.serviceFeeRate || 0.1) * 100)}%)
                  </p>
                  <p>{formatCurrency(serviceFeeAmount)}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p>VAT ({Math.round((hotel?.vat || 0.1) * 100)}%)</p>
                  <p>{formatCurrency(vatAmount)}</p>
                </div>

                {/* Subtotal - This is the amount before all discounts */}
                <div className="flex justify-between items-center font-medium border-t border-gray-300 pt-2">
                  <p>Subtotal</p>
                  <p>{formatCurrency(subtotalAmount)}</p>
                </div>

                {/* Promotions if available */}
                {promotion && (
                  <div className="flex justify-between items-center text-green-600">
                    <p>
                      Promotion Discount (
                      {Math.round(promotion.percentage * 100)}%)
                    </p>
                    <p>-{formatCurrency(totalPromotionDiscount)}</p>
                  </div>
                )}

                {/* Coupon discount if applicable */}
                {coupon && (
                  <div className="flex justify-between items-center text-green-600">
                    <p>
                      Coupon Discount ({Math.round(coupon.percentage * 100)}%)
                    </p>
                    <p>-{formatCurrency(couponDiscountAmount)}</p>
                  </div>
                )}

                {/* Point discount if applicable */}
                {point > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <p>Points Discount ({point} points)</p>
                    <p>-{formatCurrency(pointDiscountAmount)}</p>
                  </div>
                )}

                {/* Final total after all discounts */}
                <div className="flex justify-between items-center font-medium border-t border-gray-300 pt-2">
                  <p>Total Amount</p>
                  <p>{formatCurrency(totalAmount)}</p>
                </div>
              </div>
            </div>

            {/* Total Section */}
            <div className="pt-2">
              <div className="flex justify-between items-center text-lg font-bold">
                <p>Total Amount</p>
                <p>{formatCurrency(totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button
            type="submit"
            form="contact-form"
            className="w-[160px] relative h-12"
            disabled={isCreatingOrder}
          >
            {isCreatingOrder ? <LoadingButton /> : 'Confirm Booking'}
          </Button>
        </div>
      </div>
      <div className="w-[440px] space-y-4">
        <Card className="overflow-hidden border-gray-200 pt-0 shadow-md">
          <CardContent className="p-0">
            <div className="relative h-[200px] w-full">
              {roomType && (
                <Image
                  src={roomType?.images[0] || ''}
                  alt={roomType?.type || ''}
                  className="w-full object-cover"
                  fill
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">
                    {hotel?.name}
                  </h2>
                  <StartRating size={18} rating={hotel?.rating || 0} />
                </div>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="border-b border-gray-200 pb-2">
                <h2 className="font-semibold text-lg text-gray-800">
                  Booking Information
                </h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between w-full">
                  <div className="flex-1 flex flex-col items-center text-center gap-1">
                    <h3 className="text-gray-500 text-xs font-medium">
                      Check-in
                    </h3>
                    <p className="font-bold text-sm">
                      {checkIn && format(checkIn, 'EEE dd-MM-yyyy')}
                    </p>
                    <p className=" bg-green-100 text-xs px-2 py-1 rounded-full font-medium">
                      From 14:00
                    </p>
                  </div>
                  <div className="mx-3 flex flex-col items-center">
                    <div className="relative w-full flex items-center justify-center">
                      <div className="w-20 h-[1px] bg-gray-300 absolute"></div>
                      <span className="bg-gray-50 font-bold text-xs px-2 py-1 z-10 rounded-full text-blue-600 border border-blue-200">
                        {nights} night{nights > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center text-center gap-1">
                    <h3 className="text-gray-500 text-xs font-medium">
                      Check-out
                    </h3>
                    <p className="font-bold text-sm">
                      {checkOut && format(checkOut, 'EEE dd-MM-yyyy')}
                    </p>
                    <p className=" bg-red-100 text-xs px-2 py-1 rounded-full font-medium">
                      Before 12:00
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">Room Details</h3>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {booking.available} × {roomType?.type}
                  </span>
                </div>

                {/* Guests */}
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <h4 className="text-xs text-gray-500 mb-2 font-medium">
                    Guests
                  </h4>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <PeopleIcon />
                      <span className="text-sm">
                        <span className="font-medium">{booking.adult}</span>{' '}
                        Adult{booking.adult > 1 ? 's' : ''}
                      </span>
                    </div>
                    {booking.child && booking.child > 0 ? (
                      <div className="flex items-center gap-2">
                        <ChildIcon />
                        <span className="text-sm">
                          <span className="font-medium">{booking.child}</span>{' '}
                          Child{booking.child > 1 ? 'ren' : ''}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Bed Configuration */}
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <h4 className="text-xs text-gray-500 mb-2 font-medium">
                    Bed Configuration
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {roomType?.roomBed?.map((bed: any) => (
                      <div
                        key={bed.id}
                        className="flex items-center gap-2 bg-gray-50 p-2 rounded-md border border-gray-200"
                      >
                        <BedSingle className="text-blue-600" size={18} />
                        <span className="capitalize text-sm">
                          <span className="font-medium">{bed.quantity}</span>{' '}
                          {bed.roomBedType.toLowerCase()} bed
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <h4 className="text-xs text-gray-500 mb-2 font-medium">
                    Price Summary
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Room price per night:</span>
                      <span className="font-medium">
                        {formatCurrency(room?.price || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>
                        Total ({nights} night{nights > 1 ? 's' : ''}):
                      </span>
                      <span className="font-bold text-blue-700">
                        {formatCurrency((room?.price || 0) * nights)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-gray-200 shadow-md">
          <CardContent className="p-5 space-y-4">
            {/* Policy Header */}
            <div className="border-b border-gray-200 pb-2">
              <h2 className="font-semibold text-lg text-gray-800">
                Booking Policy
              </h2>
            </div>

            {/* Policy Type Badge */}
            <div className="flex items-center">
              <div
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  room?.policy === 'FREE_CANCELLATION'
                    ? 'bg-green-100 text-green-800'
                    : room?.policy === 'PAY_AT_HOTEL'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-orange-100 text-orange-800'
                }`}
              >
                {MAP_POLICY[room?.policy || 'NON_REFUNDABLE']}
              </div>
            </div>

            {/* Policy Details Card */}
            <div
              className={`bg-gray-50 rounded-lg p-4 border ${
                room?.policy === 'FREE_CANCELLATION'
                  ? 'border-green-200'
                  : room?.policy === 'PAY_AT_HOTEL'
                  ? 'border-blue-200'
                  : 'border-orange-200'
              }`}
            >
              {/* Free Cancellation Policy */}
              {room?.policy === 'FREE_CANCELLATION' && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 bg-green-100 p-1 rounded-full">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Free cancellation before {format(checkIn, 'dd-MM-yyyy')}
                      </p>
                      <p className="text-xs text-gray-500">
                        If you cancel after this date, you can get a refund
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 bg-green-100 p-1 rounded-full">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Charge a cancellation fee
                      </p>
                      <p className="text-xs text-gray-500">
                        {`You'll get your payment back but charge a cancellation fee is 50.000 VND.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Non-Refundable Policy */}
              {room?.policy === 'NON_REFUNDABLE' && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 bg-orange-100 p-1 rounded-full">
                      <Check size={14} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        No refund available if canceled
                      </p>
                      <p className="text-xs text-gray-500">
                        {`This special rate is non-refundable. You will not receive a refund if you cancel your booking.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Pay at Hotel Policy */}
              {room?.policy === 'PAY_AT_HOTEL' && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 bg-blue-100 p-1 rounded-full">
                      <Check size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Pay at the hotel during your stay
                      </p>
                      <p className="text-xs text-gray-500">
                        No advance payment required - pay the full amount at the
                        hotel
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Note Policy */}
            {room?.notePolicy && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p className="text-xs font-medium text-gray-700 mb-1">
                  Additional Policy Notes:
                </p>
                <p className="text-sm text-gray-600">{room.notePolicy}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderPage;
