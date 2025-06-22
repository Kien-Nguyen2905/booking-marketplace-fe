import React, { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { NOTIFY_TYPE } from '@/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Info, RotateCcw } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TNotificationViewProps } from '@/features/partner/notifications/components/NotificationView/type';

const NotificationView: FC<TNotificationViewProps> = ({
  open,
  setOpen,
  selectedNotification,
  handleReadNotify,
}) => {
  const handleAction = () => {
    if (selectedNotification?.id) {
      handleReadNotify(selectedNotification.id.toString());
      setOpen(false);
    }
  };

  const renderTypeBadge = () => {
    if (!selectedNotification) return null;
    switch (selectedNotification.type) {
      case NOTIFY_TYPE.REFUND:
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <RotateCcw className="h-3 w-3" />
            Refund
          </Badge>
        );
      case NOTIFY_TYPE.INFORM:
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Info className="h-3 w-3" />
            Information
          </Badge>
        );
      default:
        return null;
    }
  };

  const renderNotificationContent = () => {
    if (!selectedNotification) return null;
    switch (selectedNotification.type) {
      case NOTIFY_TYPE.REFUND:
        return (
          <Card className="border-red-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-red-600">
                Refund Request
              </CardTitle>
              <CardDescription>
                A refund has been requested for a booking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm">{selectedNotification.message}</p>
                <div className="rounded-md bg-red-50 p-3">
                  <p className="text-xs text-red-600">
                    Please review this refund request and process accordingly.
                    You may need to check the booking details and contact the
                    customer.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case NOTIFY_TYPE.INFORM:
      default:
        return (
          <Card className="border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-blue-600">
                Information
              </CardTitle>
              <CardDescription>For your information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm">{selectedNotification.message}</p>
                <div className="rounded-md bg-blue-50 p-3">
                  <p className="text-xs text-blue-600">
                    This is an informational notification. No immediate action
                    is required.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-between py-5">
            <DialogTitle className="max-w-[100px]">
              {selectedNotification?.title || 'Notification'}
            </DialogTitle>
            {renderTypeBadge()}
          </div>
          {selectedNotification?.createdAt && (
            <>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span>
                  Created:{' '}
                  {format(selectedNotification?.createdAt, 'dd/MM/yyyy HH:mm')}
                </span>
                <span>{selectedNotification.readAt ? 'Read' : 'Unread'}</span>
              </div>
              {selectedNotification?.readAt && (
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                  <span>
                    Read at:{' '}
                    {format(selectedNotification?.readAt, 'dd/MM/yyyy HH:mm')}
                  </span>
                </div>
              )}
            </>
          )}
        </DialogHeader>

        {/* Notification content based on type */}
        <div className="py-2">{renderNotificationContent()}</div>

        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          {selectedNotification && !selectedNotification.readAt && (
            <Button onClick={handleAction}>Mark as Read</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationView;
