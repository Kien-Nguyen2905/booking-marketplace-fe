'use client';

import React from 'react';
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
import {
  userColumns,
  UserTableContext,
} from '@/features/admin/users/components/UserTable/UserColumn';
import { CPagination, LoadingTable, RHFInput } from '@/components';
import { Search } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { useUserTable } from '@/features/admin/users/hooks';
import { ROLE_VALUE, STATUS_VALUE } from '@/constants';
import { UserView } from '@/features/admin/users/components/UserView';

const UserTable = () => {
  const {
    form,
    onSearch,
    selectedUser,
    open,
    onOpenChange,
    setSelectedUser,
    setOpen,
    isLoading,
    onStatusChange,
    onRoleChange,
    pagination,
    onReset,
    table,
  } = useUserTable();

  return (
    <UserTableContext.Provider
      value={{
        setSelectedUser,
        setOpen,
      }}
    >
      <Form {...form}>
        <div className="space-y-4">
          {selectedUser && (
            <UserView
              open={open}
              onOpenChange={onOpenChange}
              selectedUser={selectedUser}
            />
          )}
          <div className="flex items-center justify-between">
            <div className="relative">
              <RHFInput
                onChange={onSearch}
                form={form}
                name="search"
                placeholder="Search"
                className="!py-[3px] pr-[20px] 2xl:!py-[9px] h-9"
              />
              <div className="absolute text-gray-400 w-[17px] h-[17px] 2xl:w-[30px] 2xl:h-[30px] flex justify-center items-center right-1 -translate-y-1/2 top-1/2">
                <Search size={30} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <RHFInput
                form={form}
                name="role"
                renderProp={(props: any, field: any) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      onRoleChange();
                    }}
                    value={field.value}
                    {...props}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_VALUE.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
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
                      {STATUS_VALUE.map((item) => (
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
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
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
    </UserTableContext.Provider>
  );
};

export default UserTable;
