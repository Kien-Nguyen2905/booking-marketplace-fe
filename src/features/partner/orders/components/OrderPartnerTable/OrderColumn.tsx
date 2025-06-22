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
import { useOrderPartnerTable } from '@/features/partner/orders/hooks';
import { formatCurrency } from '@/lib/utils';
import { MAP_ORDER_STATUS, MAP_PAYMENT_TYPE, ORDER_STATUS } from '@/constants';
import { TOrderPartnerTable } from '@/features/partner/orders/components/OrderPartnerTable/type';

export const OrderPartnerTableContext = createContext<TOrderPartnerTable>({
  setSelectedOrder: () => {},
  setOpen: () => {},
});

const PriceHeader = () => {
  const { orderBy, onOrderByChange, order } = useOrderPartnerTable();
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${
        orderBy === 'totalPrice' ? 'text-primary' : ''
      }`}
      onClick={() => onOrderByChange('totalPrice')}
    >
      Price
      {orderBy === 'totalPrice' && order === 'asc' ? (
        <ChevronUp size={16} />
      ) : orderBy === 'totalPrice' && order === 'desc' ? (
        <ChevronDown size={16} />
      ) : (
        <ChevronsUpDown size={16} />
      )}
    </div>
  );
};

export const ActionsCell = ({ row }: { row: any }) => {
  const { setSelectedOrder, setOpen } = useContext(OrderPartnerTableContext);
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
              setSelectedOrder(order);
              setOpen(true);
            }, 0);
          }}
          className="cursor-pointer"
        >
          <Eye className="mr-2 h-4 w-4" />
          <span>View details</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const orderPartnerColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: () => {
      return <div className="pl-4">ID</div>;
    },
    cell: ({ row }) => (
      <span className="pl-4 truncate line-clamp-1">{row.getValue('id')}</span>
    ),
    meta: { width: 'w-[80px]' },
  },
  {
    accessorKey: 'checkinDate',
    header: 'Checkin',
    cell: ({ row }) => (
      <div>{format(row.getValue('checkinDate'), 'dd/MM/yyyy')}</div>
    ),
    meta: { width: 'w-[160px]' },
  },
  {
    accessorKey: 'checkoutDate',
    header: 'Checkout',
    cell: ({ row }) => (
      <div>{format(row.getValue('checkoutDate'), 'dd/MM/yyyy')}</div>
    ),
    meta: { width: 'w-[160px]' },
  },
  {
    accessorKey: 'totalPrice',
    header: () => <PriceHeader />,
    cell: ({ row }) => {
      return <div>{formatCurrency(row.getValue('totalPrice'))}</div>;
    },
    meta: { width: 'w-[160px]' },
  },
  {
    accessorKey: 'status',
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      return (
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              row.getValue('status') === ORDER_STATUS.CONFIRMED
                ? 'bg-green-100 text-green-600'
                : row.getValue('status') === ORDER_STATUS.PENDING
                ? 'bg-yellow-100 text-yellow-600'
                : row.getValue('status') === ORDER_STATUS.FAILED
                ? 'bg-red-100 text-red-600'
                : row.getValue('status') === ORDER_STATUS.CANCELED
                ? 'bg-red-100 text-red-600'
                : row.getValue('status') === ORDER_STATUS.REFUNDED
                ? 'bg-orange-100 text-orange-600'
                : row.getValue('status') === ORDER_STATUS.PENDING_REFUND
                ? 'bg-orange-100 text-orange-600'
                : row.getValue('status') === ORDER_STATUS.NO_SHOW
                ? 'bg-orange-100 text-orange-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {MAP_ORDER_STATUS[
              row.getValue('status') as keyof typeof MAP_ORDER_STATUS
            ].toUpperCase()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'paymentType',
    header: () => <div>Payment</div>,
    cell: ({ row }) => {
      return (
        <div>
          {
            MAP_PAYMENT_TYPE[
              row.getValue('paymentType') as keyof typeof MAP_PAYMENT_TYPE
            ]
          }
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      return <div>{format(row.getValue('createdAt'), 'dd/MM/yyyy')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell row={row} />,
    meta: { width: 'w-[80px]' },
  },
];
