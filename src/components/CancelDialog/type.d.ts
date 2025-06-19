export type TCancelDialogProps = {
  showActionDialog: boolean;
  setShowActionDialog: (open: boolean) => void;
  actionType: 'CANCELED' | 'PENDING_REFUND';
  cancelReason: string;
  setCancelReason: (reason: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
  handleSubmit: (value: any) => Promise<void>;
  handleCloseDialog: () => void;
};
