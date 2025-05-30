import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronUp, Eye, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';
import { PartnerStatus, ROUTES } from '@/constants';
import Link from 'next/link';

export const ActionsCell = ({ row }: { row: any }) => {
  const partner = row.original;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <Link href={ROUTES.ADMIN.PARTNERS + `/${partner.id}`}>
          <DropdownMenuItem className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            <span>View details</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const partnerColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: () => {
      return <div className="pl-4">ID</div>;
    },
    cell: ({ row }) => <div className="pl-4">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
    cell: ({ row }) => <div>{row.getValue('fullName')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => <div>{row.getValue('phoneNumber')}</div>,
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
              status === PartnerStatus.ACCEPTED
                ? 'bg-green-100 text-green-800'
                : status === PartnerStatus.PENDING
                ? 'bg-yellow-100 text-yellow-800'
                : status === PartnerStatus.REJECTED
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
