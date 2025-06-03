import { GetRoomTypeByIdResType } from '@/models/room-type.model';

export type TRoomDetailModalProps = {
  open: boolean;
  roomType: GetRoomTypeByIdResType;
  onOpenChange: (open: boolean) => void;
};
