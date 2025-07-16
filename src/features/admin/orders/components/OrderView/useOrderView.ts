import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { useCreateRefundMutation } from '@/queries';
import { useGetOrderByIdQuery } from '@/queries/useOrder';

export const useOrderView = (
  id?: string | number,
  onOpenChange?: () => void,
) => {
  const { data: orderData } = useGetOrderByIdQuery(id as number);
  const order = orderData?.data.data;
  const { mutateAsync: createRefund, isPending } = useCreateRefundMutation();

  const handleCreateRefund = async () => {
    if (!order) return;
    if (
      !order.user.accountNumber ||
      !order.user.bankAccount ||
      !order.user.bankName
    ) {
      showToast({
        type: 'error',
        message: ERROR_MESSAGES.USER_BANK_INFO_INCOMPLETE,
      });
      return;
    }
    try {
      const { data } = await createRefund({
        orderId: order.id,
        amount: order.totalPrice,
        reason: order.reason || 'Refund',
      });
      if (data.data.id) {
        showToast({
          type: 'success',
          message: SUCCESS_MESSAGES.CREATED,
        });
        onOpenChange?.();
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return {
    order,
    handleCreateRefund,
    isPending,
  };
};
