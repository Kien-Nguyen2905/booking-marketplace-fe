'use client';

import { flexRender } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LoadingTable, RHFInput, RHFPickDate } from '@/components';
import { Form } from '@/components/ui/form';
import { useRevenueTable } from '@/features/admin/revenue/hooks';
import { revenueColumns } from '@/features/admin/revenue/components/RevenueTable/RevenueColumn';
import { addDays } from 'date-fns';

const RevenueTable = () => {
  const {
    form,
    isLoading,
    onReset,
    table,
    onDateFromChange,
    onDateToChange,
    dateFromValue,
    handleExportExcel,
  } = useRevenueTable();

  return (
    <Form {...form}>
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="flex items-center w-[620px] gap-2">
            <RHFInput
              form={form}
              name="dateFrom"
              placeholder="Date from"
              required
              className="w-full"
              renderProp={(props: any, field: any) => (
                <RHFPickDate
                  field={field}
                  {...props}
                  disabled={false}
                  className="!h-9"
                  onChange={onDateFromChange}
                />
              )}
            />
            <RHFInput
              form={form}
              name="dateTo"
              placeholder="Date to"
              required
              className="w-full"
              renderProp={(props: any, field: any) => (
                <RHFPickDate
                  field={field}
                  {...props}
                  disabled={(date) =>
                    dateFromValue && date < addDays(dateFromValue, 1)
                  }
                  className="!h-9"
                  onChange={onDateToChange}
                  disabledInput={!dateFromValue}
                />
              )}
            />
            <Button variant="default" onClick={onReset}>
              Reset
            </Button>
          </div>
          <Button onClick={handleExportExcel}>Export</Button>
        </div>
        <div className="rounded-md border">
          {isLoading ? <LoadingTable /> : <div className="h-[3px]"></div>}
          <Table className="table-fixed min-w-[1000px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={
                        header.column.columnDef.meta?.width || 'w-full'
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={revenueColumns?.length + 1 || 5}
                    className="h-24 text-center"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={revenueColumns?.length + 1 || 5}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Form>
  );
};

export default RevenueTable;
