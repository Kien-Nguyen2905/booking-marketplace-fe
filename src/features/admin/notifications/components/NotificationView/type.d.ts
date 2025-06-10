import { NotifyType } from '@/models/notify.model';

export type TNotificationViewProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedNotification: NotifyType | null;
  handleReadNotify: (id: string) => void;
};
