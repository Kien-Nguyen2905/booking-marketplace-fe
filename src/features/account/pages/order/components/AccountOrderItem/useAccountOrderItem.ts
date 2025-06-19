import { useRouter } from 'next/navigation';
import { ORDER_STATUS, PAYMENT_TYPE } from '@/constants';
import { useTimeCountdown } from '@/hooks';
import { LOCAL_STORAGE } from '@/constants';
import { ROUTES } from '@/constants';
import { OrderType } from '@/models';

export const useAccountOrderItem = ({ order }: { order: OrderType }) => {
  const router = useRouter();

  // Initialize countdown timer for pending banking payments
  const isPendingBanking =
    order.status === ORDER_STATUS.PENDING &&
    order.paymentType === PAYMENT_TYPE.BANKING;

  const { formattedTime, isActive } = useTimeCountdown({
    storageKey: isPendingBanking
      ? `${LOCAL_STORAGE.PAYMENT_TIMER}_${order.id}`
      : undefined,
  });

  // Handler for continuing to payment page
  const handleContinuePayment = () => {
    router.push(`${ROUTES.PAYMENT}?id=${order.id}`);
  };
  return {
    isPendingBanking,
    formattedTime,
    isActive,
    handleContinuePayment,
  };
};
