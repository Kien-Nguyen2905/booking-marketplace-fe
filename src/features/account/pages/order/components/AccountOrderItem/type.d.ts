import { OrderType, ReviewType } from '@/models';

export type TAccountOrderItemProps = {
  order: OrderType & { review: ReviewType };
  onViewDetails?: (order: OrderType) => void;
  onOpenReview?: (order: OrderType) => void;
};
