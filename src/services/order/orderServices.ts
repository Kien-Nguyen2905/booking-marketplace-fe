import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';
import {
  CreateOrderBodyType,
  CreateOrderResType,
  ExportPartnerRevenueResType,
  GetOrderByIdResType,
  GetOrdersByUserIdResType,
  GetOrdersResType,
  UpdateOrderBodyType,
} from '@/models';

const orderService = {
  getOrders: (queryString: string = '') => {
    return instance.get<SuccessResponse<GetOrdersResType>>(
      `/orders${queryString ? `?${queryString}` : ''}`,
    );
  },
  getOrderByOrderId: (orderId: string | number) => {
    return instance.get<SuccessResponse<GetOrderByIdResType>>(
      `/orders/${orderId}`,
    );
  },
  getMyOrders: (queryString: string = '') => {
    return instance.get<SuccessResponse<GetOrdersByUserIdResType>>(
      `/orders/me${queryString ? `?${queryString}` : ''}`,
    );
  },
  getOrderByHotelId: (hotelId: string | number) => {
    return instance.get<SuccessResponse<GetOrdersResType>>(
      `/orders/hotel/${hotelId}`,
    );
  },
  createOrder: (body: CreateOrderBodyType) => {
    return instance.post<SuccessResponse<CreateOrderResType>>(`/orders`, body);
  },
  updateStatusOrder: (orderId: string | number, body: UpdateOrderBodyType) => {
    return instance.put<SuccessResponse<GetOrderByIdResType>>(
      `/orders/status/${orderId}`,
      body,
    );
  },
  updateStatusMyOrder: (
    orderId: string | number,
    body: UpdateOrderBodyType,
  ) => {
    return instance.put<SuccessResponse<GetOrderByIdResType>>(
      `/orders/status/me/${orderId}`,
      body,
    );
  },
  exportPartnerRevenue: (queryString: string = '') => {
    return instance.get<SuccessResponse<ExportPartnerRevenueResType>>(
      `/orders/export-partner-revenue${queryString ? `?${queryString}` : ''}`,
    );
  },
};
export default orderService;
