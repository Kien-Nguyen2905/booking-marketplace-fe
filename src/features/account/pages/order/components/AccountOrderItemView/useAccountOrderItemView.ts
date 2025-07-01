import {
  ERROR_MESSAGES,
  ORDER_STATUS,
  POLICY_TYPE,
  SUCCESS_MESSAGES,
} from '@/constants';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { useUpdateMyOrderMutation } from '@/queries';
import { useGetOrderByIdQuery } from '@/queries/useOrder';
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
    typeof ORDER_STATUS.PENDING_REFUND | typeof ORDER_STATUS.CANCELED | null
  >(null);

  const handleOpenDialog = () => {
    if (order && order.room.policy === POLICY_TYPE.FREE_CANCELLATION) {
      setActionType(ORDER_STATUS.PENDING_REFUND);
    } else {
      setActionType(ORDER_STATUS.CANCELED);
    }
    setShowActionDialog(true);
  };

  const handleCloseDialog = () => {
    setShowActionDialog(false);
    setCancelReason('');
    setActionType(null);
  };

  const handleUpdateMyOrder = async (
    status: typeof ORDER_STATUS.PENDING_REFUND | typeof ORDER_STATUS.CANCELED,
  ) => {
    if (!order) return;
    if (actionType === ORDER_STATUS.PENDING_REFUND)
      if (
        !order.user.accountNumber ||
        !order.user.bankAccount ||
        !order.user.bankName
      ) {
        showToast({
          type: 'warning',
          message: ERROR_MESSAGES.BANK_INFO,
        });
        return;
      }
    try {
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
    if (order && order.room.policy === POLICY_TYPE.FREE_CANCELLATION) {
      setActionType(ORDER_STATUS.PENDING_REFUND);
    } else {
      setActionType(ORDER_STATUS.CANCELED);
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
