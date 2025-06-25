import { EVENT, ROUTES } from '@/constants';
import { useAppContext } from '@/context/AppProvider';
import { handleErrorApi } from '@/lib/helper';
import { showToast } from '@/lib/toast';
import { NotifyType } from '@/models/notify.model';
import {
  useGetNotifiesByRecipientIdQuery,
  useReadNotifyMutation,
} from '@/queries';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export const useDashboardHeader = () => {
  const { profile, socket } = useAppContext();
  const { data, refetch } = useGetNotifiesByRecipientIdQuery('');
  const notifications = data?.data.data.data || [];
  const { mutateAsync: readNotify, isPending } = useReadNotifyMutation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const originalTitleRef = useRef<string>('');

  const pageName = usePathname();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<NotifyType | null>(null);

  const confirmAction = () => {
    try {
      if (!selectedNotification) return;
      readNotify(selectedNotification.id);
      refetch();
      setSelectedNotification(null);
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const onOpenModal = (notification: NotifyType) => {
    setSelectedNotification(notification);
    setIsConfirmModalOpen(true);
  };

  // Handle click outside to close notifications dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        isNotificationsOpen &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationsOpen]);

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const getUnreadCount = () => {
    return notifications.filter((notification) => !notification.readAt).length;
  };

  const hrefLink =
    profile?.role.name === 'ADMIN'
      ? ROUTES.ADMIN.NOTIFICATIONS
      : ROUTES.PARTNER.NOTIFICATIONS;

  useEffect(() => {
    if (!socket) return;

    const handleNotification = () => {
      showToast({
        type: 'info',
        message: 'You have a new notification',
      });
      refetch();
    };

    const handleOrder = () => {
      showToast({
        type: 'info',
        message: 'You have a new order',
      });
      refetch();
    };

    socket.on(EVENT.NOTIFY, handleNotification);
    socket.on(EVENT.ORDER_CREATED, handleOrder);
    return () => {
      socket.off(EVENT.NOTIFY, handleNotification);
      socket.off(EVENT.ORDER_CREATED, handleOrder);
    };
  }, [socket, refetch]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set original title once on mount
    if (originalTitleRef.current === '') {
      originalTitleRef.current = document.title;
    }

    const unreadCount = getUnreadCount();
    const originalTitle = originalTitleRef.current;

    if (unreadCount > 0) {
      document.title = `(${unreadCount}) ${originalTitle}`;
    } else {
      document.title = originalTitle;
    }
  }, [notifications, pageName]);

  return {
    isNotificationsOpen,
    notifications,
    notificationRef,
    toggleNotifications,
    getUnreadCount,
    profile,
    onOpenModal,
    isConfirmModalOpen,
    confirmAction,
    isPending,
    selectedNotification,
    setIsConfirmModalOpen,
    hrefLink,
  };
};
