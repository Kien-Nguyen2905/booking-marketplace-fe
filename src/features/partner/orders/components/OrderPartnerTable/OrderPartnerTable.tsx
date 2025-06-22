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
import {
  MAP_ORDER_STATUS,
  MAP_PAYMENT_TYPE,
  ORDER_STATUS_LIST,
  PAYMENT_TYPE_LIST,
} from '@/constants';
import { Search } from 'lucide-react';
import { useOrderPartnerTable } from '@/features/partner/orders/hooks';
import { OrderPartnerView } from '@/features/partner/orders/components/OrderPartnerView';
import {
  orderPartnerColumns,
  OrderPartnerTableContext,
} from '@/features/partner/orders/components/OrderPartnerTable/OrderColumn';

const OrderPartnerTable = () => {
  const {
    setSelectedOrder,
    setOpen,
    isLoading,
    pagination,
    table,
    formQuery,
    onDateFromChange,
    onDateToChange,
    dateFromValue,
    onStatusChange,
    onPaymentTypeChange,
    onReset,
    onSearch,
    open,
    selectedOrder,
    onCloseModal,
  } = useOrderPartnerTable();
  return (
    <OrderPartnerTableContext.Provider
      value={{
        setSelectedOrder,
        setOpen,
      }}
    >
      <Form {...formQuery}>
        <div className="space-y-4">
          <OrderPartnerView
            open={open}
            onOpenChange={onCloseModal}
            selectedOrder={selectedOrder}
          />
          <div className="flex justify-between items-center">
            <div className="relative">
              <RHFInput
                onChange={(value) => onSearch(value as string)}
                form={formQuery}
                name="search"
                placeholder="Search by id"
                classNameInput="!py-[3px] pr-[20px] 2xl:!py-[9px] !h-9"
                type="number"
              />
              <div className="absolute text-gray-400 w-[17px] h-[17px] 2xl:w-[30px] 2xl:h-[30px] flex justify-center items-center right-1 -translate-y-1/2 top-1/2">
                <Search size={30} />
              </div>
            </div>
            <div className="flex items-center w-[520px] gap-2">
              <RHFInput
                form={formQuery}
                name="dateFrom"
                placeholder="Checkin"
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
                placeholder="Checkout"
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
                  name="paymentType"
                  renderProp={(props: any, field: any) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        onPaymentTypeChange();
                      }}
                      value={field.value}
                      {...props}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Payment" />
                      </SelectTrigger>
                      <SelectContent>
                        {PAYMENT_TYPE_LIST.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {
                              MAP_PAYMENT_TYPE[
                                item.label as keyof typeof MAP_PAYMENT_TYPE
                              ]
                            }
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <RHFInput
                  form={formQuery}
                  name="status"
                  placeholder="Status"
                  renderProp={(props: any, field: any) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        onStatusChange();
                      }}
                      value={field.value}
                      {...props}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {ORDER_STATUS_LIST.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {
                              MAP_ORDER_STATUS[
                                item.label as keyof typeof MAP_ORDER_STATUS
                              ]
                            }
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
                      colSpan={orderPartnerColumns?.length + 2}
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
                      colSpan={orderPartnerColumns?.length + 1}
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
    </OrderPartnerTableContext.Provider>
  );
};

export default OrderPartnerTable;
