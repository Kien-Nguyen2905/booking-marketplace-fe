import { useGetNotifiesByRecipientIdQuery } from '@/queries';
import { LIMIT } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { NotifyType } from '@/models/notify.model';
import { useState } from 'react';
import { notificationColumns } from '@/features/partner/notifications/components/NotificationTable/NotificationColumn';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useReadNotifyMutation } from '@/queries';
import { handleErrorApi } from '@/lib/helper';

export const usePartnerNotification = () => {
  const searchParams = useSearchParams();
  const { data: allNotificationData, isLoading } =
    useGetNotifiesByRecipientIdQuery(
      searchParams.toString() || `limit=${LIMIT}&page=1`,
    );
  const { mutateAsync: readNotify, isPending } = useReadNotifyMutation();

  const [selectedNotification, setSelectedNotification] =
    useState<NotifyType | null>(null);
  const [open, setOpen] = useState(false);

  const table = useReactTable({
    data: allNotificationData?.data.data.data || [],
    columns: notificationColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  const handleReadNotify = async (id: string) => {
    try {
      await readNotify(id);
    } catch (error) {
      handleErrorApi({ error });
    }
  };
  return {
    isLoading,
    selectedNotification,
    open,
    setOpen,
    setSelectedNotification,
    pagination: allNotificationData?.data.data,
    table,
    handleReadNotify,
    isPending,
  };
};
