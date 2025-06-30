import { formatCurrency } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData, TValue> {
    width?: string;
  }
}

export const revenueColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'partnerName',
    header: () => {
      return <div className="pl-4">Partner</div>;
    },
    cell: ({ row }) => (
      <div className="pl-4 truncate line-clamp-1">
        {row.getValue('partnerName')}
      </div>
    ),
    meta: { width: 'w-[200px]' },
  },
  {
    accessorKey: 'hotelName',
    header: 'Hotel',
    cell: ({ row }) => (
      <div className="truncate line-clamp-1">{row.getValue('hotelName')}</div>
    ),
    meta: { width: 'w-[200px]' },
  },
  {
    accessorKey: 'countOrder',
    header: 'Order',
    cell: ({ row }) => <div>{row.getValue('countOrder')}</div>,
    meta: { width: 'w-[70px]' },
  },
  {
    accessorKey: 'totalOrderValue',
    header: 'Total',
    cell: ({ row }) => (
      <div>{formatCurrency(row.getValue('totalOrderValue'))}</div>
    ),
  },
  {
    accessorKey: 'partnerProfit',
    header: 'Partner',
    cell: ({ row }) => (
      <div>{formatCurrency(row.getValue('partnerProfit'))}</div>
    ),
  },
  {
    accessorKey: 'totalBankingPayment',
    header: 'Paid Banking',
    cell: ({ row }) => (
      <div>{formatCurrency(row.getValue('totalBankingPayment'))}</div>
    ),
  },
  {
    accessorKey: 'totalHotelPayment',
    header: 'Paid Hotel',
    cell: ({ row }) => (
      <div>{formatCurrency(row.getValue('totalHotelPayment'))}</div>
    ),
  },
  {
    accessorKey: 'transferAmount',
    header: 'Transfer',
    cell: ({ row }) => (
      <div>{formatCurrency(row.getValue('transferAmount'))}</div>
    ),
  },
];
