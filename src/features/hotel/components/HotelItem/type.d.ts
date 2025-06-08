import { FindHotelResType } from '@/models/hotel.model';
import { PromotionType } from '@/models/promotion.model';

export type THotelItemProps = {
  hotel: FindHotelResType;
  queryStringDetail: string;
  promotion: PromotionType | null;
};
