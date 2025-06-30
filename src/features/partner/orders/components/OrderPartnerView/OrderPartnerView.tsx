'use client';

import React, { FC } from 'react';
import { format } from 'date-fns';
import { Clock, Hotel, Tags } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, getColorStatus } from '@/lib/utils';
import {
  MAP_PAYMENT_TYPE,
  MAP_POLICY,
  ORDER_STATUS,
  PAYMENT_TYPE,
} from '@/constants';
import { useOrderPartnerView } from '@/features/partner/orders/components/OrderPartnerView/useOrderPartnerView';
import { Button } from '@/components/ui/button';
import { TOrderViewProps } from '@/features/admin/orders/components/OrderView/type';

const OrderPartnerView: FC<TOrderViewProps> = ({
  selectedOrder,
  open,
  onOpenChange,
}) => {
  const {
    order,
    handleCheckout,
    handleNoShow,
    handleCancel,
    handleRefund,
    cancelReason,
    isSubmitting,
    setCancelReason,
    setIsSubmitting,
    showActionDialog,
    setShowActionDialog,
    actionType,
    handleOpenDialog,
    handleCloseDialog,
  } = useOrderPartnerView(selectedOrder?.id);

  if (!selectedOrder) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[1000px] h-[90vh] overflow-y-auto p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <p>Order ID: #{order?.id}</p>
            <p className={`font-bold ${getColorStatus(order?.status)}`}>
              {order?.status}
            </p>
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            {format(order?.createdAt || new Date(), 'HH:mm dd/MM/yyyy')}
          </div>
        </DialogHeader>

        <Card className="mb-2">
          <CardContent className="pt-0">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Hotel className="h-5 w-5 text-blue-primary" />
              Booking
            </h2>

            <div className="grid grid-cols-3 grid-rows-2 gap-4">
              <div className="grid-span-1 text-sm font-medium">
                <h3 className="font-bold text-lg">Customer</h3>
                <div className="flex gap-1">
                  <p>Name: </p>
                  <p>{order?.customer?.fullName}</p>
                </div>
                <div className="flex gap-1">
                  <p>Email: </p>
                  <p>{order?.customer?.email}</p>
                </div>
                <div className="flex gap-1">
                  <p>Phone number: </p>
                  <p>{order?.customer?.phoneNumber}</p>
                </div>
              </div>
              <div className="grid-span-1 text-sm font-medium">
                <h3 className="font-bold text-lg">Hotel</h3>
                <div className="flex gap-1">
                  <p>Name: </p>
                  <p>{order?.hotel?.name}</p>
                </div>
                <div className="flex gap-1">
                  <p>Address: </p>
                  <p>{order?.hotel?.address}</p>
                </div>
              </div>
              <div className="grid-span-1 text-sm font-medium">
                <h3 className="font-bold text-lg">Room</h3>
                <div className="flex gap-1">
                  <p>Type: </p>
                  <p>
                    {order?.quantity} x {order?.room?.roomType?.type}
                  </p>
                </div>
                <div className="flex gap-1">
                  <p>Bed: </p>
                  <p>
                    {order?.room?.roomType?.roomBed
                      ?.map((bed) => bed.quantity + ' x ' + bed.roomBedType)
                      .join(', ')}
                  </p>
                </div>
                <div className="flex gap-1">
                  <p>Capacity: </p>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">
                      <span className="font-medium">
                        {order?.room?.roomType?.adults || 0}
                      </span>
                      {' x '}
                      Adult
                      {(order?.room?.roomType?.adults || 0) > 1 ? 's' : ''}
                    </span>
                  </div>
                  {order?.room?.roomType?.child &&
                  order?.room?.roomType?.child > 0 ? (
                    <div className="flex items-center gap-1">
                      <span className="text-sm">
                        <span className="font-medium">
                          {order?.room?.roomType?.child || 0}
                        </span>
                        {' x '}
                        Child
                        {(order?.room?.roomType?.child || 0) > 1 ? 'ren' : ''}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="flex gap-1">
                  <p>Policy: </p>
                  <p>
                    {MAP_POLICY[order?.room?.policy as keyof typeof MAP_POLICY]}
                  </p>
                </div>
              </div>
              <div className="grid-span-1 text-sm font-medium">
                <h3 className="font-bold text-lg">Payment</h3>
                <div className="flex gap-1">
                  <p>Payment type: </p>
                  <p>
                    {
                      MAP_PAYMENT_TYPE[
                        order?.paymentType as keyof typeof MAP_PAYMENT_TYPE
                      ]
                    }
                  </p>
                </div>
              </div>
              <div className="grid-span-1 text-sm font-medium">
                <h3 className="font-bold text-lg">Booking</h3>
                <div className="flex gap-1">
                  <p>Check-in date: </p>
                  <p>
                    {format(order?.checkinDate || new Date(), 'dd/MM/yyyy')}
                  </p>
                </div>
                <div className="flex gap-1">
                  <p>Check-out date: </p>
                  <p>
                    {format(order?.checkoutDate || new Date(), 'dd/MM/yyyy')}
                  </p>
                </div>
                <div className="flex gap-1">
                  <p>Arrival time: </p>
                  <p>
                    {format(
                      order?.arrivalTime || new Date(),
                      'HH:mm dd/MM/yyyy',
                    )}
                  </p>
                </div>
                {order?.checkoutTime && (
                  <div className="flex gap-1">
                    <p>Checkout time: </p>
                    <p>
                      {format(
                        order?.checkoutTime || new Date(),
                        'HH:mm dd/MM/yyyy',
                      )}
                    </p>
                  </div>
                )}
              </div>
              {order?.reason && (
                <div className="grid-span-1 text-sm font-medium">
                  <h3 className="font-bold text-lg">Reason</h3>
                  <div className="flex gap-1">
                    <p>Reason: </p>
                    <p>{order?.reason}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-0">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Tags className="h-5 w-5 text-blue-primary" />
              Pricing
            </h2>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
              {order?.quantity} room(s) x {order?.room.roomType.type}
            </h2>
            <div className="flex flex-col">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Base price</span>
                <span className="font-medium">
                  {formatCurrency(order?.basePrice || 0)}
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-gray-600">Service fee</span>
                <span className="font-medium">
                  {formatCurrency(order?.serviceFeeAmount || 0)}
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-gray-600">VAT</span>
                <span className="font-medium">
                  {formatCurrency(order?.vatAmount || 0)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {formatCurrency(
                    (order?.totalPrice || 0) +
                      (order?.serviceFeeAmount || 0) +
                      (order?.vatAmount || 0),
                  )}
                </span>
              </div>

              {order?.promotionId && (
                <>
                  <Separator className="my-2" />
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Promotion discount</span>
                    <span className="font-medium text-green-500">
                      -{formatCurrency(order?.promotionAmount)}
                    </span>
                  </div>
                </>
              )}

              {(order?.pointDiscount || 0) > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Point discount</span>
                  <span className="font-medium text-green-500">
                    -{formatCurrency(order?.pointDiscount || 0)}
                  </span>
                </div>
              )}

              {order?.couponId && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Coupon discount</span>
                  <span className="font-medium text-green-500">
                    -{formatCurrency(order?.couponAmount || 0)}
                  </span>
                </div>
              )}

              <Separator className="my-2" />

              <div className="flex justify-between py-2">
                <span className="font-semibold">Total price</span>
                <span className="font-bold text-lg text-blue-primary">
                  {formatCurrency(order?.totalPrice || 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {order?.status === ORDER_STATUS.CONFIRMED && (
          <div className="flex justify-end gap-2">
            <Button
              onClick={handleCheckout}
              className="bg-blue-500 w-[100px] h-10 relative hover:bg-blue-600"
            >
              CHECK OUT
            </Button>
            {order?.paymentType === PAYMENT_TYPE.BANKING ? (
              <Button
                onClick={() => handleOpenDialog('REFUND')}
                className="bg-orange-500 hover:bg-orange-600 w-[100px] h-10 relative"
              >
                REFUND
              </Button>
            ) : (
              <Button
                onClick={() => handleOpenDialog('CANCEL')}
                className="bg-orange-500 hover:bg-orange-600 w-[100px] h-10 relative"
              >
                CANCEL
              </Button>
            )}
            <Button
              onClick={handleNoShow}
              className="bg-red-500 hover:bg-red-600 w-[100px] h-10 relative"
            >
              NO SHOW
            </Button>
          </div>
        )}
      </DialogContent>

      {/* Action Dialog (Cancel or Refund) */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent className="w-full max-w-md">
          <DialogHeader>
            <DialogTitle>
              {actionType === 'CANCEL'
                ? 'Cancel Order'
                : 'Cancel and Refund Order'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="actionReason" className="text-sm font-medium">
                {actionType === 'CANCEL'
                  ? 'Cancellation'
                  : 'Cancellation/Refund'}{' '}
                Reason <span className="text-red-500">*</span>
              </label>
              <Input
                id="actionReason"
                placeholder={`Enter reason for ${
                  actionType === 'CANCEL'
                    ? 'cancellation'
                    : 'cancellation and refund'
                }`}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={handleCloseDialog}>
                Close
              </Button>
              <Button
                disabled={!cancelReason.trim() || isSubmitting}
                onClick={async () => {
                  if (!cancelReason.trim()) return;
                  setIsSubmitting(true);
                  if (actionType === 'CANCEL') {
                    await handleCancel(cancelReason);
                  } else if (actionType === 'REFUND') {
                    await handleRefund(cancelReason);
                  }
                  setIsSubmitting(false);
                  handleCloseDialog();
                }}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {isSubmitting
                  ? 'Processing...'
                  : `Confirm ${actionType === 'CANCEL' ? 'Cancel' : 'Refund'}`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default OrderPartnerView;
