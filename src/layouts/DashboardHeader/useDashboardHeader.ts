import { TNotification } from '@/layouts/DashboardHeader/type';
import { useState, useRef, useEffect } from 'react';

export const useDashboardHeader = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<TNotification[]>([
    {
      id: '1',
      title: 'Booking Confirmed',
      message: 'Your booking at Grand Hotel has been confirmed.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      title: 'Special Offer',
      message: 'New discount available for your next booking!',
      time: '5 hours ago',
      read: false,
    },
    {
      id: '3',
      title: 'Payment Received',
      message: 'We have received your payment for reservation #12345.',
      time: '1 day ago',
      read: false,
    },
    {
      id: '4',
      title: 'Booking Reminder',
      message: 'Your stay at Ocean View Resort is tomorrow.',
      time: '1 day ago',
      read: true,
    },
    {
      id: '5',
      title: 'Rate Your Stay',
      message: 'How was your recent stay at Mountain Lodge?',
      time: '3 days ago',
      read: true,
    },
    {
      id: '6',
      title: 'Account Update',
      message: 'Your profile information has been updated successfully.',
      time: '5 days ago',
      read: true,
    },
  ]);

  const notificationRef = useRef<HTMLDivElement>(null);

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

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    );
  };

  const getUnreadCount = () => {
    return notifications.filter((notification) => !notification.read).length;
  };

  return {
    isNotificationsOpen,
    notifications,
    notificationRef,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
    getUnreadCount,
  };
};
