import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import React from 'react';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData, TValue> {
    width?: string;
  }
}

export const customerColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: () => {
      return <div className="pl-4">ID</div>;
    },
    cell: ({ row }) => <div className="pl-4">{row.getValue('id')}</div>,
    meta: { width: 'w-[100px]' },
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
    cell: ({ row }) => <div>{row.getValue('fullName')}</div>,
    meta: { width: 'w-[200px]' },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
    meta: { width: 'w-[300px]' },
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => <div>{row.getValue('phoneNumber')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const dateValue = row.getValue('createdAt') as string;
      return <div>{format(new Date(dateValue), 'dd/MM/yyyy')}</div>;
    },
  },
];
