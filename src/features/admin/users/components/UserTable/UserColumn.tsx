import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData, TValue> {
    width?: string;
  }
}
import { ChevronDown, ChevronUp, Eye, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { createContext, useContext } from 'react';
import { TUserTable } from '@/features/admin/users/components/UserTable/type';

export const UserTableContext = createContext<TUserTable>({
  setSelectedUser: () => {},
  setOpen: () => {},
});

// Create a wrapper component that follows React's rules of hooks
export const ActionsCell = ({ row }: { row: any }) => {
  const { setSelectedUser, setOpen } = useContext(UserTableContext);
  const user = row.original;

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
              setSelectedUser(user);
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

export const userColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'fullName',
    header: () => {
      return <div className="pl-4">Full Name</div>;
    },
    cell: ({ row }) => (
      <div className="pl-4 truncate line-clamp-1">
        {row.getValue('fullName')}
      </div>
    ),
    meta: { width: 'w-[220px]' },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="truncate line-clamp-1">{row.getValue('email')}</div>
    ),
    meta: { width: 'w-[260px]' },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const roleValue = row.getValue('role');
      let role: string;
      if (roleValue === null || roleValue === undefined) {
        role = '-';
      } else if (
        typeof roleValue === 'object' &&
        roleValue !== null &&
        'name' in roleValue
      ) {
        role = String(roleValue.name || '');
      } else {
        role = String(roleValue);
      }

      return (
        <div className="capitalize">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              role === 'ADMIN'
                ? 'bg-blue-100 text-blue-800'
                : role === 'PARTNER'
                ? 'bg-purple-100 text-purple-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {role}
          </span>
        </div>
      );
    },
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
              status === 'ACTIVE'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
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
