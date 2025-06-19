import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TRefundViewProps } from '@/features/admin/refunds/components/RefundView/type';
import { useRefundView } from '@/features/admin/refunds/components/RefundView/useRefundView';
import React, { FC } from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Receipt, User } from 'lucide-react';
import { PREFIX_CONTENT_ORDER, REFUND_STATUS } from '@/constants';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';

const RefundView: FC<TRefundViewProps> = ({
  selectedRefund,
  open,
  onOpenChange,
}) => {
  const { refund } = useRefundView(selectedRefund?.id);

  if (!selectedRefund) return null;

  if (!refund) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-4xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            Refund ID: #{refund?.id}
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 w-full">
          <div className="w-[430px]">
            <Card className="mb-4 w-full">
              <CardContent>
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Receipt className="h-5 w-5" />
                  Refund Information
                </h2>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Refund ID:</span>
                      <span className="text-sm font-medium">{refund.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Order ID:</span>
                      <span className="text-sm font-medium">
                        {refund.orderId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Created At:</span>
                      <span className="text-sm font-medium text-right">
                        {refund.createdAt
                          ? format(
                              new Date(refund.createdAt),
                              'dd/MM/yyyy HH:mm',
                            )
                          : '-'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Refund Note:
                      </span>
                      <span className="text-sm font-medium">
                        {`${PREFIX_CONTENT_ORDER.REFUND}${
                          refund.order?.id || ''
                        }`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Status:</span>
                      {refund.status && (
                        <Badge
                          className={`text-xs ${
                            refund.status === REFUND_STATUS.COMPLETED
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-orange-50 text-orange-700 border-orange-200'
                          }`}
                        >
                          {refund.status}
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Updated At:</span>
                      <span className="text-sm font-medium text-right">
                        {refund.updatedAt
                          ? format(
                              new Date(refund.updatedAt),
                              'dd/MM/yyyy HH:mm',
                            )
                          : '-'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Amount:</span>
                      <span className="text-lg font-bold text-orange-600 text-right">
                        {formatCurrency(refund.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Reason:</span>
                      <span className="text-sm font-medium">
                        {refund.reason || '-'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent>
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <User className="h-5 w-5 text-blue-primary" />
                  User Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Name:</span>
                      <span className="text-sm font-medium">
                        {refund.order.user.fullName || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Email:</span>
                      <span className="text-sm font-medium">
                        {refund.order.user.email || '-'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Phone:</span>
                      <span className="text-sm font-medium">
                        {refund.order.user.phoneNumber || '-'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="w-full flex-1 bg-blue-50">
            <CardContent>
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-2">
                <CreditCard className="h-5 w-5 text-blue-primary" />
                Bank Transfer Information
              </h2>
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Bank Account:</span>
                    <span className="text-sm font-medium">
                      {refund.order.user.bankAccount || '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Account Number:
                    </span>
                    <span className="text-sm font-medium">
                      {refund.order.user.accountNumber || '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Bank Name:</span>
                    <span className="text-sm font-medium">
                      {refund.order.user.bankName || '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Amount:</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(refund.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Content:</span>
                    <span className="text-sm font-medium">
                      {PREFIX_CONTENT_ORDER.REFUND + refund.order.id}
                    </span>
                  </div>
                </div>
                <div className="flex mx-auto rounded-lg">
                  <Image
                    src={`https://qr.sepay.vn/img?acc=${refund.order.user.accountNumber}&bank=${refund.order.user.bankAccount}&amount=${refund.amount}&des=${PREFIX_CONTENT_ORDER.REFUND}${refund.order?.id}`}
                    alt="QR Code"
                    className="object-cover w-64 h-64"
                    width={256}
                    height={256}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RefundView;
