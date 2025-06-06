import { GetWishlistsByUserIdResType } from '@/models/wishlist.model';

export type TWishlistItemProps = {
  wishlist: GetWishlistsByUserIdResType['0'];
  handleOpenDeleteDialog: (wishlistId: number) => void;
};
