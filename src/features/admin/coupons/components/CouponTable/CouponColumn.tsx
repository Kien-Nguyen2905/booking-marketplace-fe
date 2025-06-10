import { createContext } from 'react';
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
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Eye,
  MoreHorizontal,
} from 'lucide-react';
import { TCouponTable } from '@/features/admin/coupons/components/CouponTable/type';
import { useCouponTable } from '@/features/admin/coupons/hooks';
declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData, TValue> {
    width?: string;
  }
}

export const CouponTableContext = createContext<TCouponTable>({
  setSelectedCoupon: () => {},
  setOpen: () => {},
});
const PercentageHeader = () => {
  const { orderBy, onOrderByChange, order } = useCouponTable();
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${
        orderBy === 'percentage' ? 'text-primary' : ''
      }`}
      onClick={() => onOrderByChange('percentage')}
    >
      Percent
      {orderBy === 'percentage' && order === 'asc' ? (
        <ChevronUp size={16} />
      ) : orderBy === 'percentage' && order === 'desc' ? (
        <ChevronDown size={16} />
      ) : (
        <ChevronsUpDown size={16} />
      )}
    </div>
  );
};

const AmountHeader = () => {
  const { orderBy, onOrderByChange, order } = useCouponTable();
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

const UsedCountHeader = () => {
  const { orderBy, onOrderByChange, order } = useCouponTable();
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${
        orderBy === 'usedCount' ? 'text-primary' : ''
      }`}
      onClick={() => onOrderByChange('usedCount')}
    >
      Used
      {orderBy === 'usedCount' && order === 'asc' ? (
        <ChevronUp size={16} />
      ) : orderBy === 'usedCount' && order === 'desc' ? (
        <ChevronDown size={16} />
      ) : (
        <ChevronsUpDown size={16} />
      )}
    </div>
  );
};
export const ActionsCell = ({ row }: { row: any }) => {
  const { setSelectedCoupon, setOpen } = useContext(CouponTableContext);
  const coupon = row.original;

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
              setSelectedCoupon(coupon);
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
export const couponColumns: ColumnDef<any>[] = [
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
    accessorKey: 'code',
    header: () => <div>Code</div>,
    cell: ({ row }) => (
      <div className="truncate line-clamp-1">{row.getValue('code')}</div>
    ),
    meta: { width: 'w-[100px]' },
  },
  {
    accessorKey: 'percentage',
    header: () => <PercentageHeader />,
    cell: ({ row }) => (
      <div className="truncate line-clamp-1">
        {Math.round(Number(row.getValue('percentage')) * 100)}%
      </div>
    ),
    meta: { width: 'w-[100px]' },
  },
  {
    accessorKey: 'amount',
    header: () => <AmountHeader />,
    cell: ({ row }) => <div>{row.getValue('amount')}</div>,
    meta: { width: 'w-[100px]' },
  },

  {
    accessorKey: 'usedCount',
    header: () => <UsedCountHeader />,
    cell: ({ row }) => <div>{row.getValue('usedCount')}</div>,
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
