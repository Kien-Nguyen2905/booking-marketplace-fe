'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { WishlistItem } from '@/features/wishlist/components';
import { useWishListPage } from '@/features/wishlist/hooks';

const WishlistPage = () => {
  const {
    wishlists,
    isLoading,
    showDeleteConfirm,
    setShowDeleteConfirm,
    handleOpenDeleteDialog,
    handleDeleteWishlist,
    isPending,
  } = useWishListPage();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-gray-500">Your favorite hotels saved for later</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!isLoading &&
          wishlists &&
          wishlists.length > 0 &&
          wishlists?.map((wishlist) => (
            <WishlistItem
              key={wishlist.id}
              wishlist={wishlist}
              handleOpenDeleteDialog={handleOpenDeleteDialog}
            />
          ))}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden h-[380px] pt-0">
              <CardHeader className="p-0">
                <Skeleton className="w-full h-48" />
              </CardHeader>
              <CardContent className="pt-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && wishlists?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Heart size={64} className="text-[var(--blue-primary)] mx-auto" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Start exploring hotels and save your favorites to build your
            wishlist.
          </p>
        </div>
      )}

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Remove from Wishlist"
        description="Are you sure you want to remove this hotel from your wishlist?"
        confirmText="Remove"
        handleConfirm={handleDeleteWishlist}
        isLoading={isPending}
        variant="destructive"
      />
    </div>
  );
};

export default WishlistPage;
