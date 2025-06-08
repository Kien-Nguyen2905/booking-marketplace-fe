import { useGetWishlistsByUserIdQuery } from '@/queries';
import { useDeleteWishlistMutation } from '@/queries';
import { useState } from 'react';
import { handleErrorApi } from '@/lib/helper';
import { useAppContext } from '@/context/AppProvider';

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
        await deleteWishlist(selectedWishlistId.toString());
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
