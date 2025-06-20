import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';
import {
  DashboardMetricsResType,
  PartnerDashboardMetricsResType,
} from '@/models/metric.model';

const metricServices = {
  getMetricsDashboard: (queryString: string = '') => {
    return instance.get<SuccessResponse<DashboardMetricsResType>>(
      `/metrics/dashboard${queryString ? `?${queryString}` : ''}`,
    );
  },
  getMetricsPartnerDashboard: (hotelId: string, queryString: string = '') => {
    return instance.get<SuccessResponse<PartnerDashboardMetricsResType>>(
      `/metrics/partner-dashboard/${hotelId}${
        queryString ? `?${queryString}` : ''
      }`,
    );
  },
};
export default metricServices;
