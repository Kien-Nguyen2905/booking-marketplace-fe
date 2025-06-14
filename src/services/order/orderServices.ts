import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';
import {
  CreateOrderBodyType,
  CreateOrderResType,
  GetOrderByIdResType,
  GetOrdersByUserIdResType,
  GetOrdersResType,
} from '@/models/order.model';

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
  getMyOrders: () => {
    return instance.get<SuccessResponse<GetOrdersByUserIdResType>>(
      `/orders/me`,
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
};
export default orderService;
