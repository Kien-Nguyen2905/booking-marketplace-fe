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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CPagination, LoadingTable, RHFInput } from '@/components';
import { Search } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { PARTNER_STATUS_LIST } from '@/constants';
import { usePartnerTable } from '@/features/admin/partners/hooks';
import { partnerColumns } from '@/features/admin/partners/components/PartnerTable/PartnerColumn';

const PartnerTable = () => {
  const {
    form,
    onSearch,
    isLoading,
    onStatusChange,
    pagination,
    onReset,
    table,
  } = usePartnerTable();

  return (
    <Form {...form}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative">
            <RHFInput
              onChange={(value) => onSearch(value as string)}
              form={form}
              name="search"
              placeholder="Search"
              classNameInput="!py-[3px] pr-[20px] 2xl:!py-[9px] !h-9"
            />
            <div className="absolute text-gray-400 w-[17px] h-[17px] 2xl:w-[30px] 2xl:h-[30px] flex justify-center items-center right-1 -translate-y-1/2 top-1/2">
              <Search size={30} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <RHFInput
              form={form}
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
                    {PARTNER_STATUS_LIST.map((item) => (
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
                    colSpan={partnerColumns?.length + 1 || 5}
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
                    colSpan={partnerColumns?.length + 1 || 5}
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
  );
};

export default PartnerTable;
