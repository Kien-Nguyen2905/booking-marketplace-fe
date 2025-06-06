import { instance } from '@/services/interceptor';
import { SuccessResponse } from '@/services/type';

import {
  GetWishlistsByUserIdResType,
  CreateWishlistBodyType,
  CreateWishlistResType,
  DeleteWishlistResType,
} from '@/models/wishlist.model';

const wishlistServices = {
  getWishlistsByUserId: () => {
    return instance.get<SuccessResponse<GetWishlistsByUserIdResType>>(
      `/wishlists`,
    );
  },

  createWishlist: (body: CreateWishlistBodyType) => {
    return instance.post<SuccessResponse<CreateWishlistResType>>(
      `/wishlists`,
      body,
    );
  },

  deleteWishlist: (wishlistId: string | number) => {
    return instance.delete<SuccessResponse<DeleteWishlistResType>>(
      `/wishlists/${wishlistId}`,
    );
  },
};

export default wishlistServices;
