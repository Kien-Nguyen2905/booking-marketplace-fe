import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Wallet,
  Tag,
  Calendar,
  CreditCard,
  FileText,
  BarChart4,
} from 'lucide-react';
import { MAP_TRANSACTION_TYPE } from '@/constants';
import { TTransactionViewProps } from '@/features/admin/transactions/components/TransactionView/type';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import React, { FC } from 'react';

const TransactionView: FC<TTransactionViewProps> = ({
  selectedTransaction,
  open,
  onOpenChange,
}) => {
  if (!selectedTransaction) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            Transaction ID: #{selectedTransaction?.id}
          </DialogTitle>
        </DialogHeader>
        <Card className="border-0 shadow-none py-0">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 gap-6">
              {/* Transaction Overview Section */}
              <div className="rounded-md border bg-gray-50/50 p-4">
                <h3 className="mb-3 font-medium text-sm text-gray-500">
                  TRANSACTION OVERVIEW
                </h3>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Amount */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <Wallet className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-600">
                          Amount
                        </span>
                      </div>
                      <span className="text-xl font-bold text-orange-500">
                        {formatCurrency(selectedTransaction?.amount || 0)}
                      </span>
                    </div>

                    {/* Transaction Type */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <Tag className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-600">
                          Type
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={cn(
                            'rounded-md font-medium',
                            selectedTransaction?.type === 'IN'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-orange-50 text-orange-700 border-orange-200',
                          )}
                        >
                          {MAP_TRANSACTION_TYPE[
                            selectedTransaction?.type as keyof typeof MAP_TRANSACTION_TYPE
                          ] || 'Unknown'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Transaction Date
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {selectedTransaction?.transactionDate
                        ? format(
                            new Date(selectedTransaction.transactionDate),
                            "EEEE, MMMM dd, yyyy 'at' h:mm a",
                          )
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Transaction Details Section */}
              <div>
                <h3 className="mb-3 font-medium text-sm text-gray-500">
                  TRANSACTION DETAILS
                </h3>
                <div className="space-y-3 rounded-lg border p-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Code
                      </span>
                    </div>
                    <span className="text-sm">
                      {selectedTransaction?.code || 'N/A'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 pt-2 border-t">
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Transaction Content
                      </span>
                    </div>
                    <span className="text-sm">
                      {selectedTransaction?.transactionContent || 'N/A'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 pt-2 border-t">
                    <div className="flex items-center gap-1.5">
                      <BarChart4 className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Reference Number
                      </span>
                    </div>
                    <span className="text-sm">
                      {selectedTransaction?.referenceNumber || 'N/A'}
                    </span>
                  </div>

                  {selectedTransaction?.body && (
                    <div className="flex flex-col gap-1 pt-2 border-t">
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-600">
                          Additional Information
                        </span>
                      </div>
                      <span className="text-sm whitespace-pre-wrap">
                        {selectedTransaction.body}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionView;
