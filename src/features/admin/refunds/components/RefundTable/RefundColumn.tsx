import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData, TValue> {
    width?: string;
  }
}
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Eye,
  MoreHorizontal,
} from 'lucide-react';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { createContext, useContext } from 'react';
import { formatCurrency } from '@/lib/utils';
import { TRefundTable } from '@/features/admin/refunds/components/RefundTable/type';
import { useRefundTable } from '@/features/admin/refunds/hooks/useRefundTable';
import { REFUND_STATUS } from '@/constants';

export const RefundTableContext = createContext<TRefundTable>({
  setSelectedRefund: () => {},
  setOpen: () => {},
});

const AmountHeader = () => {
  const { orderBy, onOrderByChange, order } = useRefundTable();
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${
        orderBy === 'amount' ? 'text-primary' : ''
      }`}
      onClick={() => onOrderByChange('amount')}
    >
      Amount
      {orderBy === 'amount' && order === 'asc' ? (
        <ChevronUp size={16} />
      ) : orderBy === 'amount' && order === 'desc' ? (
        <ChevronDown size={16} />
      ) : (
        <ChevronsUpDown size={16} />
      )}
    </div>
  );
};

export const ActionsCell = ({ row }: { row: any }) => {
  const { setSelectedRefund, setOpen } = useContext(RefundTableContext);
  const order = row.original;

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
              setSelectedRefund(order);
              setOpen(true);
            }, 0);
          }}
          className="cursor-pointer"
        >
          <Eye className="mr-2 h-4 w-4" />
          <span>View detail</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const refundColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: () => {
      return <div className="pl-4">ID</div>;
    },
    cell: ({ row }) => (
      <span className="pl-4 truncate line-clamp-1">{row.getValue('id')}</span>
    ),
    meta: { width: 'w-[150px]' },
  },
  {
    accessorKey: 'orderId',
    header: 'Order ID',
    cell: ({ row }) => <div>{row.getValue('orderId')}</div>,
    meta: { width: 'w-[150px]' },
  },
  {
    accessorKey: 'amount',
    header: () => <AmountHeader />,
    cell: ({ row }) => {
      return <div>{formatCurrency(row.getValue('amount'))}</div>;
    },
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => (
      <div className="truncate line-clamp-1">{row.getValue('reason')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.getValue('status') === REFUND_STATUS.COMPLETED
            ? 'bg-green-100 text-green-600'
            : 'bg-yellow-100 text-yellow-600'
        }`}
      >
        {row.getValue('status')}
      </span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => (
      <div>{format(row.getValue('createdAt'), 'dd/MM/yyyy HH:mm')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell row={row} />,
    meta: { width: 'w-[80px]' },
  },
];
