import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';

// Define custom column meta type with width property
declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData, TValue> {
    width?: string;
  }
}
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
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
import React from 'react';
import Link from 'next/link';
import {
  HOTEL_STATUS,
  HotelTypeType,
  MAP_HOTEL_TYPE,
  ROUTES,
} from '@/constants';
import { useHotelTable } from '@/features/admin/hotels/hooks';

const ReputationHeader = () => {
  const { onOrderByChange, orderBy, order } = useHotelTable();
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${
        orderBy === 'reputationScore' ? 'text-primary' : ''
      }`}
      onClick={() => onOrderByChange('reputationScore')}
    >
      Reputation
      {orderBy === 'reputationScore' && order === 'asc' ? (
        <ChevronUp size={16} />
      ) : orderBy === 'reputationScore' && order === 'desc' ? (
        <ChevronDown size={16} />
      ) : (
        <ChevronsUpDown size={16} />
      )}
    </div>
  );
};

export const ActionsCell = ({ row }: { row: any }) => {
  const hotel = row.original;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      {hotel.status !== HOTEL_STATUS.PENDING && (
        <DropdownMenuContent align="end" className="w-56">
          <Link href={ROUTES.ADMIN.HOTELS + `/${hotel.id}`}>
            <DropdownMenuItem className="cursor-pointer">
              <Eye className="mr-2 h-4 w-4" />
              <span>View detail</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export const hotelColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: () => {
      return <div className="pl-4">Name</div>;
    },
    cell: ({ row }) => <div className="pl-4">{row.getValue('name')}</div>,
    meta: { width: 'w-[250px]' },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <div>{MAP_HOTEL_TYPE[row.getValue('type') as HotelTypeType]}</div>
    ),
  },
  {
    accessorKey: 'hotelPhoneNumber',
    header: () => {
      return <div>Phone</div>;
    },
    cell: ({ row }) => <div>{row.getValue('hotelPhoneNumber')}</div>,
  },
  {
    accessorKey: 'reputationScore',
    header: () => <ReputationHeader />,
    cell: ({ row }) => {
      return (
        <span
          className={`flex justify-center px-2 py-1 rounded-full text-xs font-medium ${
            Number(row.getValue('reputationScore')) > 100
              ? 'bg-green-100 text-green-600'
              : Number(row.getValue('reputationScore')) > 50
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {row.getValue('reputationScore')}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              row.getValue('status') === HOTEL_STATUS.ACTIVE
                ? 'bg-green-100 text-green-600'
                : row.getValue('status') === HOTEL_STATUS.PENDING
                ? 'bg-yellow-100 text-yellow-600'
                : row.getValue('status') === HOTEL_STATUS.INACTIVE
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {row.getValue('status')}
          </span>
        </div>
      );
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
