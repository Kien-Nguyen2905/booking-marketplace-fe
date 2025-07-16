import { useGetWishlistsByUserIdQuery } from '@/queries';
import { useDeleteWishlistMutation } from '@/queries';
import { useState } from 'react';
import { handleErrorApi } from '@/lib/helper';
import { useAppContext } from '@/context/AppProvider';
import { showToast } from '@/lib/toast';
import { SUCCESS_MESSAGES } from '@/constants';

export const useWishListPage = () => {
  const { profile } = useAppContext();
  const { data: wishlistData, isLoading } = useGetWishlistsByUserIdQuery(
    !!profile?.id,
  );
  const wishlists = wishlistData?.data.data;

  const { mutateAsync: deleteWishlist, isPending } =
    useDeleteWishlistMutation();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedWishlistId, setSelectedWishlistId] = useState<number | null>(
    null,
  );

  const handleOpenDeleteDialog = (wishlistId: number) => {
    setSelectedWishlistId(wishlistId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteWishlist = async () => {
    try {
      if (selectedWishlistId) {
        const { data } = await deleteWishlist(selectedWishlistId.toString());
        if (data?.data) {
          showToast({
            type: 'success',
            message: SUCCESS_MESSAGES.DELETED,
          });
        }
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };
  return {
    wishlists,
    isLoading,
    showDeleteConfirm,
    setShowDeleteConfirm,
    handleOpenDeleteDialog,
    handleDeleteWishlist,
    isPending,
  };
};
