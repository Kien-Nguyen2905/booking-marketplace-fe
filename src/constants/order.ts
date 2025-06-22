export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  FAILED: 'FAILED',
  CANCELED: 'CANCELED',
  PENDING_REFUND: 'PENDING_REFUND',
  REFUNDED: 'REFUNDED',
  CHECKOUT: 'CHECKOUT',
  NO_SHOW: 'NO_SHOW',
} as const;

export type OrderStatusType = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const ORDER_STATUS_LIST = Object.values(ORDER_STATUS).map((value) => ({
  value: value.toLowerCase(),
  label: value,
}));

export const MAP_ORDER_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  FAILED: 'Failed',
  CANCELED: 'Canceled',
  PENDING_REFUND: 'Pending Refund',
  REFUNDED: 'Refunded',
  CHECKOUT: 'Checkout',
  NO_SHOW: 'No Show',
};

export const PAYMENT_TYPE = {
  BANKING: 'BANKING',
  PAY_AT_HOTEL: 'PAY_AT_HOTEL',
} as const;

export type PaymentType = (typeof PAYMENT_TYPE)[keyof typeof PAYMENT_TYPE];

export const PAYMENT_TYPE_LIST = Object.values(PAYMENT_TYPE).map((value) => ({
  value: value.toLowerCase(),
  label: value,
}));

export const MAP_PAYMENT_TYPE = {
  BANKING: 'Banking',
  PAY_AT_HOTEL: 'Pay at Hotel',
};

export const TRANSACTION_TYPE = {
  IN: 'IN',
  OUT: 'OUT',
} as const;

export type TransactionTypeType =
  (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

export const TRANSACTION_TYPE_LIST = Object.values(TRANSACTION_TYPE).map(
  (value) => ({
    value: value.toLowerCase(),
    label: value,
  }),
);

export const MAP_TRANSACTION_TYPE = {
  IN: 'Inbound',
  OUT: 'Outbound',
};
export const PREFIX_CONTENT_ORDER = {
  PAY: 'BKP',
  REFUND: 'BKR',
};
