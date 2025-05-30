export const PartnerStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
} as const;

export type PartnerStatusType =
  (typeof PartnerStatus)[keyof typeof PartnerStatus];

export const PARTNER_STATUS_LIST = Object.values(PartnerStatus).map(
  (value) => ({
    value: value.toLowerCase(),
    label: value,
  }),
);
