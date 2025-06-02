export const ROOM_BED_TYPE = {
  KING: 'KING',
  QUEEN: 'QUEEN',
  DOUBLE: 'DOUBLE',
  TWIN: 'TWIN',
  SINGLE: 'SINGLE',
  BUNK: 'BUNK',
} as const;

export type RoomBedType = (typeof ROOM_BED_TYPE)[keyof typeof ROOM_BED_TYPE];

export const ROOM_BED_TYPE_LIST = Object.values(ROOM_BED_TYPE).map((value) => ({
  value: value,
  label: value.toLowerCase(),
}));
