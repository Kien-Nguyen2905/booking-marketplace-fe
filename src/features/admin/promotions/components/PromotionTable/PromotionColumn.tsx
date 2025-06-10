import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData, TValue> {
    width?: string;
  }
}
import {
  Bell,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Eye,
  MoreHorizontal,
} from 'lucide-react';
import { format } from 'date-fns';
import { usePromotionTable } from '@/features/admin/promotions/hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { createContext, useContext } from 'react';
import { TPromotionTable } from '@/features/admin/promotions/components/PromotionTable/type';

export const PromotionTableContext = createContext<TPromotionTable>({
  setSelectedPromotion: () => {},
  setOpen: () => {},
});

const PercentageHeader = () => {
  const { orderBy, onOrderByChange, order } = usePromotionTable();
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

const SharePercentageHeader = () => {
  const { orderBy, onOrderByChange, order } = usePromotionTable();
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${
        orderBy === 'sharePercentage' ? 'text-primary' : ''
      }`}
      onClick={() => onOrderByChange('sharePercentage')}
    >
      Share
      {orderBy === 'sharePercentage' && order === 'asc' ? (
        <ChevronUp size={16} />
      ) : orderBy === 'sharePercentage' && order === 'desc' ? (
        <ChevronDown size={16} />
      ) : (
        <ChevronsUpDown size={16} />
      )}
    </div>
  );
};

const ValidFromHeader = () => {
  const { orderBy, onOrderByChange, order } = usePromotionTable();
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${
        orderBy === 'validFrom' ? 'text-primary' : ''
      }`}
      onClick={() => onOrderByChange('validFrom')}
    >
      Valid From
      {orderBy === 'validFrom' && order === 'asc' ? (
        <ChevronUp size={16} />
      ) : orderBy === 'validFrom' && order === 'desc' ? (
        <ChevronDown size={16} />
      ) : (
        <ChevronsUpDown size={16} />
      )}
    </div>
  );
};

const ValidUntilHeader = () => {
  const { orderBy, onOrderByChange, order } = usePromotionTable();
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${
        orderBy === 'validUntil' ? 'text-primary' : ''
      }`}
      onClick={() => onOrderByChange('validUntil')}
    >
      Valid Until
      {orderBy === 'validUntil' && order === 'asc' ? (
        <ChevronUp size={16} />
      ) : orderBy === 'validUntil' && order === 'desc' ? (
        <ChevronDown size={16} />
      ) : (
        <ChevronsUpDown size={16} />
      )}
    </div>
  );
};

export const ActionsCell = ({ row }: { row: any }) => {
  const { setSelectedPromotion, setOpen } = useContext(PromotionTableContext);
  const { handleCreateNotify } = usePromotionTable();
  const promotion = row.original;

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
              setSelectedPromotion(promotion);
              setOpen(true);
            }, 0);
          }}
          className="cursor-pointer"
        >
          <Eye className="mr-2 h-4 w-4" />
          <span>View details</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            // Use setTimeout to ensure the state update has time to process
            setTimeout(() => {
              handleCreateNotify(promotion);
            }, 0);
          }}
          className="cursor-pointer"
        >
          <Bell className="mr-2 h-4 w-4" />
          <span>Notify</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const promotionColumns: ColumnDef<any>[] = [
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
    meta: { width: 'w-[250px]' },
  },
  {
    accessorKey: 'percentage',
    header: () => <PercentageHeader />,
    cell: ({ row }) => <div>{Number(row.getValue('percentage')) * 100}%</div>,
    meta: { width: 'w-[150px]' },
  },
  {
    accessorKey: 'sharePercentage',
    header: () => <SharePercentageHeader />,
    cell: ({ row }) => (
      <div>{Number(row.getValue('sharePercentage')) * 100}%</div>
    ),
    meta: { width: 'w-[150px]' },
  },
  {
    accessorKey: 'validFrom',
    header: () => <ValidFromHeader />,
    cell: ({ row }) => {
      const dateValue = row.getValue('validFrom') as string;
      return <div>{format(new Date(dateValue), 'dd/MM/yyyy')}</div>;
    },
  },
  {
    accessorKey: 'validUntil',
    header: () => <ValidUntilHeader />,
    cell: ({ row }) => {
      const dateValue = row.getValue('validUntil') as string;
      return <div>{format(new Date(dateValue), 'dd/MM/yyyy')}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const dateValue = row.getValue('createdAt') as string;
      return <div>{format(new Date(dateValue), 'dd/MM/yyyy')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell row={row} />,
    meta: { width: 'w-[80px]' },
  },
];
