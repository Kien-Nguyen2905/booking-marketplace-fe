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
import { userColumns } from '@/features/admin/users/components/UserTable/UserColumn';
import { CPagination, LoadingTable, RHFInput, RHFPickDate } from '@/components';
import { PromotionTableContext } from '@/features/admin/promotions/components/PromotionTable/PromotionColumn';
import { usePromotionTable } from '@/features/admin/promotions/hooks';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { PromotionView } from '@/features/admin/promotions/components/PromotionView';
import { addDays } from 'date-fns';

const PromotionTable = () => {
  const {
    selectedPromotion,
    open,
    setSelectedPromotion,
    setOpen,
    isLoading,
    pagination,
    table,
    onReset,
    formQuery,
    onCloseModal,
    handleSubmit,
    form,
    onOpenModal,
    isSubmitting,
    handleDeletePromotion,
    isSubmittingDelete,
    onDateFromChange,
    onDateToChange,
    dateFromValue,
  } = usePromotionTable();
  return (
    <PromotionTableContext.Provider
      value={{
        setSelectedPromotion,
        setOpen,
      }}
    >
      <Form {...formQuery}>
        <div className="space-y-4">
          <PromotionView
            open={open}
            onOpenChange={onCloseModal}
            selectedPromotion={selectedPromotion}
            form={form}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            handleDelete={handleDeletePromotion}
            isSubmittingDelete={isSubmittingDelete}
          />
          <div className="flex justify-between">
            <div className="flex items-center w-[620px] gap-2">
              <RHFInput
                form={formQuery}
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
                form={formQuery}
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
            <Button variant="default" onClick={onOpenModal}>
              Add
            </Button>
          </div>

          <div className="rounded-md border">
            {isLoading ? <LoadingTable /> : <div className="h-[3px]"></div>}
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className={`w-[135px] ${
                          (header.column.columnDef.header === 'percentage' &&
                            'w-[180px]') ||
                          (header.column.columnDef.header === 'title' &&
                            'w-[220px]')
                        }`}
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
                      colSpan={userColumns?.length || 5}
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
                      colSpan={userColumns?.length || 5}
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
    </PromotionTableContext.Provider>
  );
};

export default PromotionTable;
