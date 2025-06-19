'use client';

import React from 'react';
import { flexRender } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CPagination, LoadingTable, RHFInput, RHFPickDate } from '@/components';
import { Form } from '@/components/ui/form';
import { addDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TRANSACTION_TYPE_LIST } from '@/constants';
import {
  transactionColumns,
  TransactionTableContext,
} from '@/features/admin/transactions/components/TransactionTable/TransactionColumn';
import { useTransactionTable } from '@/features/admin/transactions/hooks';
import { TransactionView } from '@/features/admin/transactions/components/TransactionView';

const TransactionTable = () => {
  const {
    formQuery,
    onDateFromChange,
    onDateToChange,
    onTypeChange,
    onReset,
    onCloseModal,
    selectedTransaction,
    open,
    setOpen,
    setSelectedTransaction,
    isLoading,
    pagination,
    table,
    dateFromValue,
  } = useTransactionTable();
  return (
    <TransactionTableContext.Provider
      value={{
        setOpen,
        setSelectedTransaction,
      }}
    >
      <TransactionView
        selectedTransaction={selectedTransaction}
        open={open}
        onOpenChange={onCloseModal}
      />
      <Form {...formQuery}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center w-[520px] gap-2">
              <RHFInput
                form={formQuery}
                name="dateFrom"
                placeholder="From"
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
                form={formQuery}
                name="dateTo"
                placeholder="To"
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
            </div>
            <div className="flex justify-end">
              <div className="flex items-center gap-2">
                <RHFInput
                  form={formQuery}
                  name="type"
                  renderProp={(props: any, field: any) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        onTypeChange();
                      }}
                      value={field.value}
                      {...props}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {TRANSACTION_TYPE_LIST.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Button onClick={onReset}>Reset</Button>
              </div>
            </div>
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
                      colSpan={transactionColumns?.length + 1}
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
                      colSpan={transactionColumns?.length + 1}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {!isLoading && (
            <CPagination
              currentPage={pagination?.page as number}
              totalPages={pagination?.totalPages as number}
              totalItems={pagination?.totalItems as number}
              itemsPerPage={pagination?.limit as number}
            />
          )}
        </div>
      </Form>
    </TransactionTableContext.Provider>
  );
};

export default TransactionTable;
