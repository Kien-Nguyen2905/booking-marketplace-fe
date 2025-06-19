import { RefundType } from '@/models';

export type TRefundViewProps = {
  selectedRefund: RefundType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
