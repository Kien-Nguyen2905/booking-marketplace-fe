'use client';

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
import { NotificationTableContext } from '@/features/partner/notifications/components/NotificationTable/NotificationColumn';
import { usePartnerNotification } from '@/features/partner/notifications/hooks';
import { NotificationView } from '@/features/partner/notifications/components/NotificationView';

const NotificationTable = () => {
  const {
    isLoading,
    open,
    setOpen,
    setSelectedNotification,
    pagination,
    table,
    selectedNotification,
    handleReadNotify,
  } = usePartnerNotification();
  return (
    <NotificationTableContext.Provider
      value={{
        setSelectedNotification,
        setOpen,
      }}
    >
      {open && (
        <NotificationView
          open={open}
          setOpen={setOpen}
          selectedNotification={selectedNotification}
          handleReadNotify={handleReadNotify}
        />
      )}
      <div className="space-y-4">
        <div className="flex justify-between"></div>

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
                      <TableCell
                        key={cell.id}
                        className={
                          !cell.row.original.readAt
                            ? 'bg-primary/5 text-primary'
                            : ''
                        }
                      >
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
    </NotificationTableContext.Provider>
  );
};

export default NotificationTable;
