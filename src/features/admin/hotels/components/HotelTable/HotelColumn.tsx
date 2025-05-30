import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronDown,
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
import React from 'react';
import Link from 'next/link';
import { HOTEL_STATUS, ROUTES } from '@/constants';
import { useHotelTable } from '@/features/admin/hotels/hooks';

const ReputationHeader = () => {
  const { onOrderByChange, orderBy } = useHotelTable();
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${
        orderBy === 'reputationScore' ? 'text-primary' : ''
      }`}
      onClick={() => onOrderByChange('reputationScore')}
    >
      Reputation
      <ArrowUpDown size={16} />
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
      <DropdownMenuContent align="end" className="w-56">
        <Link href={ROUTES.ADMIN.HOTELS + `/${hotel.id}`}>
          <DropdownMenuItem className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            <span>View details</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
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
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <div>{row.getValue('type')}</div>,
  },
  {
    accessorKey: 'hotelPhoneNumber',
    header: 'Phone',
    cell: ({ row }) => <div>{row.getValue('hotelPhoneNumber')}</div>,
  },
  {
    accessorKey: 'reputationScore',
    header: () => <ReputationHeader />,
    cell: ({ row }) => (
      <div className="pl-4">{row.getValue('reputationScore')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === HOTEL_STATUS.ACTIVE
                ? 'bg-green-100 text-green-800'
                : status === HOTEL_STATUS.PENDING
                ? 'bg-yellow-100 text-yellow-800'
                : status === HOTEL_STATUS.INACTIVE
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="hover:bg-transparent"
        >
          Date
          {column.getIsSorted() === 'asc' ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateValue = row.getValue('createdAt') as string;
      return <div>{format(new Date(dateValue), 'dd/MM/yyyy')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
