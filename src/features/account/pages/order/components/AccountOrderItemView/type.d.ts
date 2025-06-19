import { OrderType } from '@/models';

export type TAccountOrderItemViewProps = {
  selectedOrder: OrderType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
