'use client';
import { BellIcon, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDashboardHeader } from './useDashboardHeader';
import { motion, AnimatePresence } from 'motion/react';
import { useHeader } from '@/layouts/Header/useHeader';
import { DASHBOARD_NAV_LINKS } from '@/constants';
import Link from 'next/link';

const DashboardHeader = () => {
  const {
    isNotificationsOpen,
    notifications,
    notificationRef,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
    getUnreadCount,
  } = useDashboardHeader();

  const { isMenuOpen, toggleMenu, closeMenu, menuRef, handleLogout } =
    useHeader();
  const unreadCount = getUnreadCount();

  return (
    <header className="h-16 bg-white border-b flex items-center transition-all duration-200 fixed top-0 left-0 right-0 z-40">
      <div className={cn('flex justify-between items-center w-full px-4')}>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Notification Bell with Counter */}
            <div className="relative" ref={notificationRef}>
              <Button
                variant="ghost"
                className="relative"
                onClick={toggleNotifications}
              >
                <BellIcon size={24} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[var(--blue-primary)] text-white text-xs flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md border border-gray-200 z-50"
                  >
                    <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                      {unreadCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-[var(--blue-primary)] hover:text-[var(--blue-dark)]"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </Button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={cn(
                              'p-3 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50',
                              !notification.read && 'bg-blue-50',
                            )}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex justify-between mb-1">
                              <h4 className="text-sm font-medium">
                                {notification.title}
                              </h4>
                              {notification.read ? (
                                <span className="text-xs text-gray-400">
                                  {notification.time}
                                </span>
                              ) : (
                                <span className="text-xs font-medium text-[var(--blue-primary)]">
                                  {notification.time}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600">
                              {notification.message}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100">
                      <Button
                        variant="link"
                        size="sm"
                        className="w-full text-xs text-[var(--blue-primary)]"
                      >
                        View all notifications
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 rounded-full p-2 md:px-4"
              onClick={toggleMenu}
            >
              <Menu size={16} />
              <div className="h-7 w-7 rounded-full bg-gray-500 text-white flex items-center justify-center">
                <User size={14} />
              </div>
            </Button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-md rounded-md overflow-hidden border border-gray-200 z-50">
                {1 && (
                  <>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold">Admin</p>
                      <p className="text-xs text-gray-500">admin@gmail.com</p>
                    </div>
                    <div className="py-1">
                      {DASHBOARD_NAV_LINKS.map((link: any) =>
                        link.href === null ? (
                          <button
                            key={link.name}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                            onClick={() => {
                              handleLogout();
                              closeMenu();
                            }}
                          >
                            <link.icon size={14} className="mr-2" />
                            {link.name}
                          </button>
                        ) : (
                          <Link key={link.href} href={link.href}>
                            <button
                              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                              onClick={closeMenu}
                            >
                              <link.icon size={14} className="mr-2" />
                              {link.name}
                            </button>
                          </Link>
                        ),
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
