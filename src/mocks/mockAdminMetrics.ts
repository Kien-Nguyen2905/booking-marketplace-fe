import { DashboardMetricsResType } from '@/models/metric.model';

// Mock data for admin dashboard metrics
export const mockAdminMetrics: DashboardMetricsResType = {
  totalRevenue: 597850,
  totalRevenueInRange: [
    { date: '2025-06-01', revenue: 42500 },
    { date: '2025-06-02', revenue: 56750 },
    { date: '2025-06-03', revenue: 48960 },
    { date: '2025-06-04', revenue: 52340 },
    { date: '2025-06-05', revenue: 68720 },
    { date: '2025-06-06', revenue: 75680 },
    { date: '2025-06-07', revenue: 89450 },
    { date: '2025-06-08', revenue: 65320 },
    { date: '2025-06-09', revenue: 59780 },
    { date: '2025-06-10', revenue: 38347 },
  ],

  totalPartnerProfit: 418495.53,
  totalPartnerProfitInRange: [
    { date: '2025-06-01', partnerProfit: 29750 },
    { date: '2025-06-02', partnerProfit: 39725 },
    { date: '2025-06-03', partnerProfit: 34272 },
    { date: '2025-06-04', partnerProfit: 36638 },
    { date: '2025-06-05', partnerProfit: 48104 },
    { date: '2025-06-06', partnerProfit: 52976 },
    { date: '2025-06-07', partnerProfit: 62615 },
    { date: '2025-06-08', partnerProfit: 45724 },
    { date: '2025-06-09', partnerProfit: 41846 },
    { date: '2025-06-10', partnerProfit: 26843 },
  ],

  totalPlatformProfit: 179355,
  totalPlatformProfitInRange: [
    { date: '2025-06-01', profit: 12750 },
    { date: '2025-06-02', profit: 17025 },
    { date: '2025-06-03', profit: 14688 },
    { date: '2025-06-04', profit: 15702 },
    { date: '2025-06-05', profit: 20616 },
    { date: '2025-06-06', profit: 22704 },
    { date: '2025-06-07', profit: 26835 },
    { date: '2025-06-08', profit: 19596 },
    { date: '2025-06-09', profit: 17934 },
    { date: '2025-06-10', profit: 11504 },
  ],

  totalBooked: 428,
  hotels: [
    { hotelName: 'Grand Plaza Hotel', bookings: 87 },
    { hotelName: 'Seaside Resort', bookings: 65 },
    { hotelName: 'Mountain View Lodge', bookings: 52 },
    { hotelName: 'City Center Suites', bookings: 73 },
    { hotelName: 'Riverside Inn', bookings: 46 },
    { hotelName: 'Palm Beach Resort', bookings: 58 },
    { hotelName: 'Luxury Heights', bookings: 47 },
  ],
};
