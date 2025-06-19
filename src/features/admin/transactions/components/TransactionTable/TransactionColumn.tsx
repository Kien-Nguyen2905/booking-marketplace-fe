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
import { useTransactionTable } from '@/features/admin/transactions/hooks/useTransactionTable';
import { formatCurrency } from '@/lib/utils';
import { TTransactionTable } from '@/features/admin/transactions/components/TransactionTable/type';

export const TransactionTableContext = createContext<TTransactionTable>({
  setSelectedTransaction: () => {},
  setOpen: () => {},
});

const AmountHeader = () => {
  const { orderBy, onOrderByChange, order } = useTransactionTable();
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
  const { setSelectedTransaction, setOpen } = useContext(
    TransactionTableContext,
  );
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
              setSelectedTransaction(order);
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

export const transactionColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: () => {
      return <div className="pl-4">ID</div>;
    },
    cell: ({ row }) => (
      <span className="pl-4 truncate line-clamp-1">{row.getValue('id')}</span>
    ),
    meta: { width: 'w-[200px]' },
  },
  {
    accessorKey: 'amount',
    header: () => <AmountHeader />,
    cell: ({ row }) => {
      return <div>{formatCurrency(row.getValue('amount'))}</div>;
    },
    meta: { width: 'w-[230px]' },
  },
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => <div>{row.getValue('code')}</div>,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <div>{row.getValue('type')}</div>,
  },
  {
    accessorKey: 'transactionDate',
    header: 'Date',
    cell: ({ row }) => (
      <div>{format(row.getValue('transactionDate'), 'dd/MM/yyyy HH:mm')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell row={row} />,
    meta: { width: 'w-[80px]' },
  },
];
