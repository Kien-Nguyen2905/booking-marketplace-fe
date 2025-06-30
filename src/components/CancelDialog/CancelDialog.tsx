import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { FC } from 'react';
import { TCancelDialogProps } from '@/components/CancelDialog/type';
import { ORDER_STATUS } from '@/constants';

const CancelDialog: FC<TCancelDialogProps> = ({
  showActionDialog,
  setShowActionDialog,
  actionType,
  cancelReason,
  setCancelReason,
  isSubmitting,
  setIsSubmitting,
  handleSubmit,
  handleCloseDialog,
}) => {
  if (!actionType) return null;
  return (
    <div>
      {/* Action Dialog (Cancel or Refund) */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent className="w-full max-w-md">
          <DialogHeader>
            <DialogTitle>
              {actionType === ORDER_STATUS.CANCELED
                ? 'Cancel Order'
                : 'Cancel and Refund Order'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="actionReason" className="text-sm font-medium">
                {actionType === ORDER_STATUS.CANCELED
                  ? 'Cancellation'
                  : 'Cancellation/Refund'}{' '}
                Reason <span className="text-red-500">*</span>
              </Label>
              <Input
                id="actionReason"
                placeholder="Enter reason for cancellation"
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
                  await handleSubmit(actionType);
                  setIsSubmitting(false);
                  handleCloseDialog();
                }}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {isSubmitting
                  ? 'Processing...'
                  : `Confirm ${
                      actionType === ORDER_STATUS.CANCELED ? 'Cancel' : 'Refund'
                    }`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CancelDialog;
