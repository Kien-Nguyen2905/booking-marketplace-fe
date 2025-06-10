import { createContext } from 'react';
import { TNotificationTable } from './type';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useContext } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Eye, MailCheck, MoreHorizontal } from 'lucide-react';
import { usePartnerNotification } from '@/features/partner/notifications/hooks';
declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData, TValue> {
    width?: string;
  }
}

export const NotificationTableContext = createContext<TNotificationTable>({
  setSelectedNotification: () => {},
  setOpen: () => {},
});

export const ActionsCell = ({ row }: { row: any }) => {
  const { setSelectedNotification, setOpen } = useContext(
    NotificationTableContext,
  );
  const { handleReadNotify } = usePartnerNotification();
  const notification = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={() => {
            // Use setTimeout to ensure the state update has time to process
            setTimeout(() => {
              setSelectedNotification(notification);
              setOpen(true);
            }, 0);
          }}
          className="cursor-pointer"
        >
          <Eye className="mr-2 h-4 w-4" />
          <span>View details</span>
        </DropdownMenuItem>
        {!notification.readAt && (
          <DropdownMenuItem
            onClick={() => {
              // Use setTimeout to ensure the state update has time to process
              setTimeout(() => {
                handleReadNotify(notification.id);
              }, 0);
            }}
            className="cursor-pointer"
          >
            <MailCheck className="mr-2 h-4 w-4" />
            <span>Read</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const notificationColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'title',
    header: () => {
      return <div className="pl-4">Title</div>;
    },
    cell: ({ row }) => (
      <span className="pl-4 truncate line-clamp-1">
        {row.getValue('title')}
      </span>
    ),
    meta: { width: 'w-[200px]' },
  },
  {
    accessorKey: 'message',
    header: () => <div>Message</div>,
    cell: ({ row }) => (
      <div className="truncate line-clamp-1">{row.getValue('message')}</div>
    ),
  },
  {
    accessorKey: 'readAt',
    header: () => <div>Read</div>,
    cell: ({ row }) => {
      const dateValue = row.getValue('readAt') as string;
      return (
        <div>
          {dateValue
            ? format(new Date(dateValue), 'dd/MM/yyyy')
            : 'Not read yet'}
        </div>
      );
    },
    meta: { width: 'w-[100px]' },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const dateValue = row.getValue('createdAt') as string;
      return <div>{format(new Date(dateValue), 'dd/MM/yyyy')}</div>;
    },
    meta: { width: 'w-[100px]' },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell row={row} />,
    meta: { width: 'w-[80px]' },
  },
];
