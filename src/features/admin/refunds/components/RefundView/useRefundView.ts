import { EVENT } from '@/constants';
import { useAppContext } from '@/context/AppProvider';
import { useGetRefundByIdQuery } from '@/queries';
import { showToast } from '@/lib/toast';
import { useEffect } from 'react';
import { useRefundTable } from '@/features/admin/refunds/hooks';

export const useRefundView = (id?: number | string) => {
  const { socket } = useAppContext();
  const { data: refundData, refetch } = useGetRefundByIdQuery(id || 0);
  const { refetchAllRefunds } = useRefundTable();
  const refund = refundData?.data.data;
  useEffect(() => {
    if (!socket) return;

    const handleNotification = () => {
      showToast({
        type: 'success',
        message: 'Refund success',
      });
      refetch();
      refetchAllRefunds();
    };

    socket.on(EVENT.ORDER_REFUNDED, handleNotification);
    return () => {
      socket.off(EVENT.ORDER_REFUNDED, handleNotification);
    };
  }, [socket, refetch]);
  return { refund };
};
