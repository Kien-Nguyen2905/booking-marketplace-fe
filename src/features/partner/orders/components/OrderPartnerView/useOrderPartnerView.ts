import {
  ERROR_ORDER_MESSAGES,
  ORDER_STATUS,
  SUCCESS_ORDER_MESSAGES,
} from '@/constants';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from '@/queries/useOrder';
import { useState } from 'react';

export const useOrderPartnerView = (id?: string | number) => {
  const { data: orderData } = useGetOrderByIdQuery(id as number);
  const { mutateAsync: updateOrder } = useUpdateOrderMutation(id as number);
  const order = orderData?.data.data;

  const [showActionDialog, setShowActionDialog] = useState(false);
  const [actionType, setActionType] = useState<'CANCEL' | 'REFUND' | null>(
    null,
  );
  const [cancelReason, setCancelReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenDialog = (type: 'CANCEL' | 'REFUND') => {
    setActionType(type);
    setShowActionDialog(true);
  };

  const handleCloseDialog = () => {
    setShowActionDialog(false);
    setCancelReason('');
    setActionType(null);
  };

  const handleCheckout = async () => {
    if (!order) return;
    try {
      const { data } = await updateOrder({
        status: ORDER_STATUS.CHECKOUT,
      });

      if (data.data.id) {
        showToast({
          type: 'success',
          message: SUCCESS_ORDER_MESSAGES.CHECKOUT_SUCCESS,
        });
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const handleCancel = async (cancelReason?: string) => {
    if (!order) return;

    if (!cancelReason?.trim()) {
      showToast({
        type: 'error',
        message: ERROR_ORDER_MESSAGES.reason.required,
      });
      return;
    }

    try {
      const { data } = await updateOrder({
        status: ORDER_STATUS.CANCELED,
        reason: cancelReason || '',
      });
      if (data.data.id) {
        showToast({
          type: 'success',
          message: SUCCESS_ORDER_MESSAGES.CANCELED_SUCCESS,
        });
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const handleRefund = async (cancelReason?: string) => {
    if (!order) return;

    if (!cancelReason?.trim()) {
      showToast({
        type: 'error',
        message: ERROR_ORDER_MESSAGES.reason.required,
      });
      return;
    }

    try {
      const { data } = await updateOrder({
        status: ORDER_STATUS.PENDING_REFUND,
        reason: cancelReason || '',
      });
      if (data.data.id) {
        showToast({
          type: 'success',
          message: 'Order refunded successfully',
        });
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const handleNoShow = async () => {
    if (!order) return;

    try {
      const { data } = await updateOrder({ status: ORDER_STATUS.NO_SHOW });
      if (data.data.id) {
        showToast({
          type: 'success',
          message: 'Order marked as no-show successfully',
        });
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return {
    order,
    handleCheckout,
    handleNoShow,
    handleCancel,
    handleRefund,
    showActionDialog,
    setShowActionDialog,
    actionType,
    handleOpenDialog,
    handleCloseDialog,
    cancelReason,
    setCancelReason,
    isSubmitting,
    setIsSubmitting,
  };
};
