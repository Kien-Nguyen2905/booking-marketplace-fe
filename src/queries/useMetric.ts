import { useQuery } from '@tanstack/react-query';
import metricService from '@/services/metric/metricServices';

export const useGetMetricsDashboardQuery = (queryString: string = '') => {
  return useQuery({
    queryKey: ['metrics-dashboard', queryString],
    queryFn: () => metricService.getMetricsDashboard(queryString),
  });
};

export const useGetMetricsPartnerDashboardQuery = (
  hotelId: string,
  queryString: string = '',
) => {
  return useQuery({
    queryKey: ['metrics-partner-dashboard', hotelId, queryString],
    queryFn: () =>
      metricService.getMetricsPartnerDashboard(hotelId, queryString),
    enabled: !!hotelId,
  });
};
