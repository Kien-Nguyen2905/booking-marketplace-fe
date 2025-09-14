import {
  EVENT,
  LOCAL_STORAGE,
  ORDER_STATUS,
  PAYMENT_TYPE,
  ROUTES,
  SUCCESS_MESSAGES,
} from '@/constants';
import { useAppContext } from '@/context/AppProvider';
import { showToast } from '@/lib/toast';
import { useGetOrderByIdQuery } from '@/queries/useOrder';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTimeCountdown } from '@/hooks/useTimeCountdown';
import { clearPaymentTimer } from '@/lib/utils';

// Banking payment timeout: 20 minutes
const PAYMENT_DURATION = 20 * 60;

export const usePaymentPage = () => {
  const router = useRouter();
  const { socket } = useAppContext();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const { data } = useGetOrderByIdQuery(orderId || '');
  const order = data?.data.data;

  const {
    time: timeRemaining,
    startTimer,
    formattedTime,
    isActive,
  } = useTimeCountdown({
    storageKey: orderId
      ? `${LOCAL_STORAGE.PAYMENT_TIMER}_${orderId}`
      : LOCAL_STORAGE.PAYMENT_TIMER,
    duration: PAYMENT_DURATION,
    onExpire: () => {
      clearPaymentTimer(orderId);
      router.push(ROUTES.HOME);
    },
  });

  useEffect(() => {
    if (!socket) return;

    const handlePaymentSuccess = () => {
      showToast({
        type: 'success',
        message: SUCCESS_MESSAGES.PAID_SUCCESS,
      });
      clearPaymentTimer(orderId);
      router.push(ROUTES.HOME);
    };

    socket.on(EVENT.PAYMENT_SUCCESS, handlePaymentSuccess);

    return () => {
      socket.off(EVENT.PAYMENT_SUCCESS, handlePaymentSuccess);
    };
  }, [socket, router, orderId]);

  useEffect(() => {
    if (!order) return;
    if (order.paymentType === PAYMENT_TYPE.PAY_AT_HOTEL) {
      router.push(ROUTES.HOME);
      return;
    }
    if (order.status !== ORDER_STATUS.PENDING) {
      router.push(ROUTES.HOME);
      return;
    }
    // Only start a new timer if one doesn't exist for this order
    if (!isActive) {
      // Check if there's already a timer in localStorage before starting a new one
      const storageKey = `${LOCAL_STORAGE.PAYMENT_TIMER}_${orderId}`;
      const storedExpiry = localStorage.getItem(storageKey);

      // Only start a new timer if one doesn't exist
      if (!storedExpiry) {
        startTimer();
      }
      // If a timer exists, the useTimeCountdown hook will use that automatically
    }
  }, [order, router, isActive, startTimer]);
  return {
    order,
    timeRemaining,
    formattedTime,
  };
};
