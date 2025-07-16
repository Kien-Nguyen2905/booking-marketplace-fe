import { PartnerDashboardMetricsResType } from '@/models/metric.model';

// Mock data for partner dashboard metrics
export const mockPartnerMetrics: PartnerDashboardMetricsResType = {
  totalProfit: 215780,
  totalRevenue: 332450,
  totalBooked: 124,
  totalCanceled: 18,
  totalRefunded: 7,
  totalNoShowBanking: 3,
  totalNoShowPayAtHotel: 5,
  totalCheckout: 91,
  totalProfitInRange: [
    { date: '2025-06-01', profit: 950 },
    { date: '2025-06-02', profit: 1120 },
    { date: '2025-06-03', profit: 890 },
    { date: '2025-06-04', profit: 1450 },
    { date: '2025-06-05', profit: 1680 },
    { date: '2025-06-06', profit: 2150 },
    { date: '2025-06-07', profit: 2450 },
    { date: '2025-06-08', profit: 1890 },
    { date: '2025-06-09', profit: 1750 },
    { date: '2025-06-10', profit: 1450 },
  ],
  roomTypes: [
    { roomTypeName: 'Deluxe Suite', bookings: 32 },
    { roomTypeName: 'Standard Room', bookings: 45 },
    { roomTypeName: 'Family Room', bookings: 28 },
    { roomTypeName: 'Executive Suite', bookings: 19 },
  ],
};
