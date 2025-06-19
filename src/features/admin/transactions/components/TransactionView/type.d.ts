import { TransactionType } from '@/models';

export type TTransactionViewProps = {
  selectedTransaction: TransactionType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
