import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData, TValue> {
    width?: string;
  }
}
import { Eye, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
            <span>View detail</span>
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
    meta: { width: 'w-[90px]' },
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
    cell: ({ row }) => (
      <div className="truncate line-clamp-1">{row.getValue('fullName')}</div>
    ),
    meta: { width: 'w-[200px]' },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="truncate line-clamp-1">{row.getValue('email')}</div>
    ),
    meta: { width: 'w-[200px]' },
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone',
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
                ? 'bg-green-100 text-green-600'
                : status === PartnerStatus.PENDING
                ? 'bg-yellow-100 text-yellow-600'
                : status === PartnerStatus.REJECTED
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600'
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
    header: 'Date',
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
