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
import { CPagination, LoadingTable } from '@/components';
import { CouponTableContext } from '@/features/admin/coupons/components/CouponTable/CouponColumn';
import { useCouponTable } from '@/features/admin/coupons/hooks';
import { CouponView } from '@/features/admin/coupons/components/CouponView';
import { Button } from '@/components/ui/button';

const CouponTable = () => {
  const {
    isLoading,
    open,
    setOpen,
    setSelectedCoupon,
    pagination,
    table,
    selectedCoupon,
    onOpenModal,
    form,
    handleSubmit,
    isSubmitting,
    handleDeleteCoupon,
    isSubmittingDelete,
  } = useCouponTable();
  return (
    <CouponTableContext.Provider
      value={{
        setSelectedCoupon,
        setOpen,
      }}
    >
      {open && (
        <CouponView
          open={open}
          onOpenChange={setOpen}
          selectedCoupon={selectedCoupon}
          form={form}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          handleDelete={handleDeleteCoupon}
          isSubmittingDelete={isSubmittingDelete}
        />
      )}
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button variant="default" onClick={() => onOpenModal()}>
            Add
          </Button>
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
                    colSpan={userColumns?.length + 1 || 5}
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
                    colSpan={userColumns?.length + 1 || 5}
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
    </CouponTableContext.Provider>
  );
};

export default CouponTable;
