export type TDialogRoomQuantityProps = {
  openQuantity: boolean;
  setOpenQuantity: (open: boolean) => void;
  valueRoom: string;
  roomQuantity: number;
  setRoomQuantity: (quantity: number) => void;
  onCancelAddRoomBed: () => void;
  onAddRoomBed: () => void;
};
