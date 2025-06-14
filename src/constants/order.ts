export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  FAILED: 'FAILED',
  CANCELED: 'CANCELED',
  REFUNDED: 'REFUNDED',
} as const;

export type OrderStatusType = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const ORDER_STATUS_LIST = Object.values(ORDER_STATUS).map((value) => ({
  value: value.toLowerCase(),
  label: value,
}));

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
  PAY_AT_HOTEL: 'Hotel',
};
export const PREFIX_CONTENT_ORDER = {
  PAY: 'BKP',
  REFUND: 'BKF',
};
