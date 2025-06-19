export const REFUND_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
} as const;

export type RefundStatusType =
  (typeof REFUND_STATUS)[keyof typeof REFUND_STATUS];

export const REFUND_STATUS_LIST = Object.values(REFUND_STATUS).map((value) => ({
  value: value.toLowerCase(),
  label: value,
}));
