import { GetUserProfileResType } from '@/models';

export type TUserViewProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: GetUserProfileResType;
};
