import React, { FC } from 'react';
import { format } from 'date-fns';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ORDER_STATUS, MAP_PAYMENT_TYPE } from '@/constants';
import { Button } from '@/components/ui/button';
import { Eye, MessageCircle, Clock, CreditCard } from 'lucide-react';
import { TAccountOrderItemProps } from '@/features/account/pages/order/components/AccountOrderItem/type';
import { useAccountOrderItem } from '@/features/account/pages/order/components/AccountOrderItem/useAccountOrderItem';

const StatusBadge: FC<{ status: string }> = ({ status }) => {
  const variantMap: Record<string, string> = {
    [ORDER_STATUS.PENDING]: 'secondary',
    [ORDER_STATUS.CONFIRMED]: 'default',
    [ORDER_STATUS.FAILED]: 'destructive',
    [ORDER_STATUS.CANCELED]: 'destructive',
    [ORDER_STATUS.PENDING_REFUND]: 'secondary',
    [ORDER_STATUS.REFUNDED]: 'outline',
    [ORDER_STATUS.CHECKOUT]: 'default',
    [ORDER_STATUS.NO_SHOW]: 'destructive',
  };

  const variant = variantMap[status] || 'secondary';

  return (
    <Badge variant={variant as any} className="text-xs capitalize">
      {status.toLowerCase().replace('_', ' ')}
    </Badge>
  );
};

const AccountOrderItem: FC<TAccountOrderItemProps> = ({
  order,
  onViewDetails,
  onOpenReview,
}) => {
  const { isPendingBanking, formattedTime, isActive, handleContinuePayment } =
    useAccountOrderItem({ order });
  if (!order) return null;
  return (
    <div className="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium"> Order #{order.id}</span>
            <StatusBadge status={order.status || ORDER_STATUS.PENDING} />
            {isPendingBanking && isActive && (
              <div className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                <Clock className="h-3 w-3" />
                <span>{formattedTime()}</span>
              </div>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {format(new Date(order.createdAt || new Date()), 'EEE dd-MM-yyyy')}
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-1">
          <p className="font-bold text-lg text-orange-600">
            {formatCurrency(order.totalPrice)}
          </p>
          <p className="text-sm font-semibold">
            {
              MAP_PAYMENT_TYPE[
                order.paymentType as keyof typeof MAP_PAYMENT_TYPE
              ]
            }
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-sm">
          <div>
            Check-in: {format(new Date(order.checkinDate), 'EEE dd-MM-yyyy')}
          </div>
          <div>
            Check-out: {format(new Date(order.checkoutDate), 'EEE dd-MM-yyyy')}
          </div>
        </div>
        <div className="flex gap-2">
          {order.status === ORDER_STATUS.CHECKOUT && !order.review?.id && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenReview?.(order)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Review
            </Button>
          )}
          {isPendingBanking && isActive && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleContinuePayment}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Continue Payment
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(order)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountOrderItem;
