import { ROUTES } from '@/constants/routes';
import {
  ArrowRightLeft,
  Bed,
  Bell,
  BookUser,
  Calendar,
  CalendarFold,
  DollarSign,
  Grid2x2Plus,
  Handshake,
  Heart,
  Hotel,
  ListPlus,
  LogOut,
  PanelsTopLeft,
  Percent,
  ReceiptText,
  Star,
  TicketPercent,
  User,
} from 'lucide-react';
import { ComponentType } from 'react';

interface DashboardLink {
  href: string | null;
  name: string;
  icon: ComponentType<{ className?: string }>;
}

interface DashboardConfig {
  [key: string]: DashboardLink;
}
interface Dashboard {
  [key: string]: DashboardConfig;
}

export const MANAGEMENT_NAV_LINKS: Dashboard = {
  ADMIN: {
    ROOT: {
      href: ROUTES.ADMIN.ROOT,
      name: 'Dashboard',
      icon: PanelsTopLeft,
    },
    USERS: {
      href: ROUTES.ADMIN.USERS,
      name: 'Users',
      icon: User,
    },
    CUSTOMERS: {
      href: ROUTES.ADMIN.CUSTOMERS,
      name: 'Customers',
      icon: BookUser,
    },
    PARTNERS: {
      href: ROUTES.ADMIN.PARTNERS,
      name: 'Partners',
      icon: Handshake,
    },
    HOTELS: {
      href: ROUTES.ADMIN.HOTELS,
      name: 'Hotels',
      icon: Hotel,
    },
    ORDERS: {
      href: ROUTES.ADMIN.ORDERS,
      name: 'Orders',
      icon: CalendarFold,
    },
    COUPONS: {
      href: ROUTES.ADMIN.COUPONS,
      name: 'Coupons',
      icon: TicketPercent,
    },
    PROMOTIONS: {
      href: ROUTES.ADMIN.PROMOTIONS,
      name: 'Promotions',
      icon: Percent,
    },
    TRANSACTIONS: {
      href: ROUTES.ADMIN.TRANSACTIONS,
      name: 'Transactions',
      icon: ReceiptText,
    },
    REFUNDS: {
      href: ROUTES.ADMIN.REFUNDS,
      name: 'Refunds',
      icon: ArrowRightLeft,
    },
    REVIEWS: {
      href: ROUTES.ADMIN.REVIEWS,
      name: 'Reviews',
      icon: Star,
    },
    NOTIFICATIONS: {
      href: ROUTES.ADMIN.NOTIFICATIONS,
      name: 'Notifications',
      icon: Bell,
    },
  },
  PARTNER: {
    ROOT: {
      href: ROUTES.PARTNER.ROOT,
      name: 'Dashboard',
      icon: PanelsTopLeft,
    },
    HOTEL: {
      href: ROUTES.PARTNER.HOTEL,
      name: 'Hotel',
      icon: Hotel,
    },
    AMENITIES: {
      href: ROUTES.PARTNER.AMENITIES,
      name: 'Amenities',
      icon: Grid2x2Plus,
    },
    ROOM_TYPES: {
      href: ROUTES.PARTNER.ROOM_TYPES,
      name: 'Room Types',
      icon: ListPlus,
    },
    ROOMS: {
      href: ROUTES.PARTNER.ROOMS,
      name: 'Rooms',
      icon: Bed,
    },
    ORDERS: {
      href: ROUTES.PARTNER.ORDERS,
      name: 'Orders',
      icon: CalendarFold,
    },
    NOTIFICATIONS: {
      href: ROUTES.PARTNER.NOTIFICATIONS,
      name: 'Notifications',
      icon: Bell,
    },
  },
  EMPLOYEE: {
    ROOT: {
      href: ROUTES.PARTNER.ROOT,
      name: 'Dashboard',
      icon: PanelsTopLeft,
    },
    ROOMS: {
      href: ROUTES.PARTNER.ROOMS,
      name: 'Rooms',
      icon: Bed,
    },
    ORDERS: {
      href: ROUTES.PARTNER.ORDERS,
      name: 'Orders',
      icon: CalendarFold,
    },
  },
};

export const NAV_LINKS = [
  {
    href: ROUTES.ACCOUNT.PROFILE,
    name: 'Profile',
    icon: User,
  },
  {
    href: ROUTES.ACCOUNT.WISH_LIST,
    name: 'Wish List',
    icon: Heart,
  },
  {
    href: ROUTES.ACCOUNT.ORDER,
    name: 'Order',
    icon: Calendar,
  },
  {
    href: ROUTES.ACCOUNT.REFUND,
    name: 'Refund',
    icon: DollarSign,
  },
  {
    href: null,
    name: 'Logout',
    icon: LogOut,
  },
];

export const DASHBOARD_NAV_LINKS: Record<string, DashboardLink[]> = {
  ADMIN: [
    {
      href: ROUTES.ADMIN.PROFILE,
      name: 'Profile',
      icon: User,
    },
    {
      href: null,
      name: 'Logout',
      icon: LogOut,
    },
  ],
  PARTNER: [
    {
      href: ROUTES.PARTNER.PROFILE,
      name: 'Profile',
      icon: User,
    },
    {
      href: null,
      name: 'Logout',
      icon: LogOut,
    },
  ],
  EMPLOYEE: [
    {
      href: null,
      name: 'Logout',
      icon: LogOut,
    },
  ],
};
