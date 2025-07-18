import { ReactNode } from 'react';

export type TConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
  handleConfirm: () => void;
  title: string;
  description?: string | ReactNode;
  confirmText: string;
  variant:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  descriptionComponent?: string | ReactNode;
};
