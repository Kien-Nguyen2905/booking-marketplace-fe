import { OrderType } from '@/models';

export type TAccountOrderItemReviewProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrder: OrderType;
};
