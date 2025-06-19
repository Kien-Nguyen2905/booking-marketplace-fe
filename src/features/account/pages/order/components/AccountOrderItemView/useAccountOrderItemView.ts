import { POLICY_TYPE, SUCCESS_MESSAGES } from '@/constants';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { useUpdateMyOrderMutation } from '@/queries';
import { useGetOrderByIdQuery } from '@/queries/useOrder';
import { addHours, isBefore, startOfDay } from 'date-fns';
import { useEffect, useState } from 'react';

export const useAccountOrderItemView = (id?: string | number) => {
  const { data: orderData } = useGetOrderByIdQuery(id as number);
  const order = orderData?.data.data;
  const { mutateAsync: updateMyOrder, isPending } = useUpdateMyOrderMutation(
    id as number,
  );
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [actionType, setActionType] = useState<
    'PENDING_REFUND' | 'CANCELED' | null
  >(null);
  const handleOpenDialog = (type: 'PENDING_REFUND' | 'CANCELED') => {
    setActionType(type);
    setShowActionDialog(true);
  };

  const handleCloseDialog = () => {
    setShowActionDialog(false);
    setCancelReason('');
    setActionType(null);
  };

  const handleUpdateMyOrder = async (status: 'PENDING_REFUND' | 'CANCELED') => {
    if (!order) return;
    if (
      !order.user.accountNumber ||
      !order.user.bankAccount ||
      !order.user.bankName
    ) {
      showToast({
        type: 'warning',
        message: 'Please update profile bank information',
      });
      return;
    }

    try {
      if (order.room.policy === POLICY_TYPE.FREE_CANCELLATION) {
        const currentDate = new Date();
        const currentDateUTC7 = new Date(
          currentDate.toLocaleString('en-US', {
            timeZone: 'Asia/Ho_Chi_Minh',
          }),
        );

        const checkinDate = addHours(order.checkinDate, 7);

        const today = startOfDay(currentDateUTC7);

        if (!isBefore(today, checkinDate)) {
          showToast({
            type: 'error',
            message: 'Cannot request refund after check-in date',
          });
          return;
        }
      }
      const { data } = await updateMyOrder({
        status,
        reason: cancelReason,
      });
      if (data.data.id) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.CANCELED_SUCCESS,
        });
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  useEffect(() => {
    if (!order) return;
    if (order.room.policy === POLICY_TYPE.FREE_CANCELLATION) {
      setActionType('PENDING_REFUND');
    } else {
      setActionType('CANCELED');
    }
  }, [order]);
  return {
    order,
    handleUpdateMyOrder,
    isPending,
    actionType,
    setShowActionDialog,
    showActionDialog,
    handleCloseDialog,
    handleOpenDialog,
    cancelReason,
    setCancelReason,
    isSubmitting,
    setIsSubmitting,
  };
};
