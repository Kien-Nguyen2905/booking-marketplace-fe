import React, { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { TNotificationViewProps } from '@/features/partner/notifications/components/NotificationView/type';
import { Card, CardContent } from '@/components/ui/card';

const NotificationView: FC<TNotificationViewProps> = ({
  open,
  setOpen,
  selectedNotification,
  handleReadNotify,
}) => {
  if (!selectedNotification) return null;

  const handleAction = () => {
    if (selectedNotification?.id) {
      handleReadNotify(selectedNotification.id.toString());
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle>
              {selectedNotification?.title || 'Notification'}
            </DialogTitle>
          </div>
          {selectedNotification?.createdAt && (
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
              <span>
                Created:{' '}
                {format(selectedNotification?.createdAt, 'dd/MM/yyyy HH:mm')}
              </span>
              <span>
                {selectedNotification.readAt
                  ? 'Read at: ' +
                    format(selectedNotification?.readAt, 'dd/MM/yyyy HH:mm')
                  : 'Unread'}
              </span>
            </div>
          )}
        </DialogHeader>

        <div className="py-2">
          <Card className="border-blue-100">
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm">{selectedNotification?.message}</p>
              </div>
            </CardContent>
          </Card>
        </div>

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
