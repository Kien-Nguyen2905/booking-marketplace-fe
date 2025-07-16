import React, { FC } from 'react';
import { motion } from 'motion/react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Trash2 } from 'lucide-react';
import { MAP_HOTEL_TYPE } from '@/constants';
import { StartRating } from '@/components';
import { getHotelUrl } from '@/lib/utils';
import Link from 'next/link';
import { TWishlistItemProps } from '@/features/wishlist/components/WishlistItem/type';

const WishlistItem: FC<TWishlistItemProps> = ({
  wishlist,
  handleOpenDeleteDialog,
}) => {
  return (
    <motion.div
      key={wishlist.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card className="overflow-hidden pt-0 h-full flex flex-col hover:shadow-md transition-shadow duration-300">
        <CardHeader className="p-0 relative">
          <div className="absolute top-2 right-2 z-10">
            <Button
              variant="destructive"
              size="icon"
              className="rounded-full bg-white hover:bg-red-50 text-red-500 h-8 w-8"
              onClick={() => handleOpenDeleteDialog(wishlist.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
          <Link
            href={getHotelUrl({
              hotelId: wishlist.hotelId || '',
            })}
          >
            <img
              src={wishlist.hotel.images[0]}
              alt={wishlist.hotel.name}
              className="w-full h-48 object-cover"
            />
          </Link>
        </CardHeader>
        <CardContent className="pt-4 space-y-2">
          <h3 className="font-bold text-lg line-clamp-2">
            {wishlist.hotel.name}
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <StartRating size={16} rating={wishlist.hotel.rating} />
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-1 text-blue-primary" />
            <span className="line-clamp-1">{wishlist.hotel.address}</span>
          </div>
          <div className="">
            <span className="bg-blue-light text-blue-dark text-xs font-medium px-2 py-1 rounded">
              {MAP_HOTEL_TYPE[wishlist.hotel.type]}
            </span>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Link
            href={getHotelUrl({
              hotelId: wishlist.hotelId || '',
            })}
          >
            <Button
              variant="outline"
              className="w-full border-blue-primary text-blue-primary hover:bg-blue-light hover:text-blue-dark"
            >
              View detail
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default WishlistItem;
