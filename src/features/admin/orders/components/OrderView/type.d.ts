export type TOrderViewProps = {
  selectedOrder: OrderType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
