import { Card, CardContent } from '@/components/ui/card';
import { THotelItemProps } from '@/features/hotel/components/HotelItem/type';
import React, { FC } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CalendarFold, House, MapPinned } from 'lucide-react';
import { MAP_HOTEL_TYPE } from '@/constants';
import { StartRating } from '@/components';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/constants';
import { formatCurrency } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const HotelItem: FC<THotelItemProps> = ({ hotel, queryStringDetail }) => {
  return (
    <Link href={`${ROUTES.HOTEL}/${hotel.id}?${queryStringDetail}`}>
      <Card>
        <CardContent className="flex items-start justify-between">
          <div className="flex gap-3">
            {/* Image */}
            <div className="grid grid-cols-3 grid-rows-3 gap-1 w-[250px] h-[200px] overflow-hidden rounded-l-lg">
              <div className="col-span-3 row-span-2 relative">
                <Image
                  src={hotel.images[0]}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                />
              </div>

              {hotel.images.map((image, index) =>
                index === 0 ? null : (
                  <div key={image} className="col-span-1 row-span-1 relative">
                    <Image
                      src={image}
                      alt={hotel.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ),
              )}
            </div>
            {/* Info */}
            <div className="space-y-3 max-w-[410px]">
              <h2 className="font-bold text-xl">{hotel.name}</h2>
              <div className="flex items-center gap-2">
                <Badge className="text-primary" variant="outline">
                  <House /> {MAP_HOTEL_TYPE[hotel.type]}
                </Badge>
                <StartRating size={15} rating={hotel.rating} />
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPinned size={15} />
                <p className="line-clamp-1">{hotel.address}</p>
              </div>
              <div className="flex items-center gap-1">
                {hotel.hotelAmenity.map(
                  (amenity, index) =>
                    index < 4 && (
                      <Badge
                        variant="secondary"
                        className="text-[10px]"
                        key={amenity.amenity.id}
                      >
                        {amenity.amenity.name}
                      </Badge>
                    ),
                )}
                {hotel.hotelAmenity.length > 4 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="secondary" className="text-[10px]">
                        +{hotel.hotelAmenity.length - 4}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[250px] bg-white text-black shadow-md border border-gray-200">
                      <div className="text-xs p-1">
                        {hotel.hotelAmenity
                          .slice(4)
                          .map((amenity) => amenity.amenity.name)
                          .join(', ')}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-primary p-1 cursor-pointer">
              <CalendarFold />
            </div>
            <div className="text-right">
              <div className="mb-2 flex flex-col items-end">
                <div className="text-gray-500 text-sm line-through mb-1">
                  {formatCurrency(hotel.roomType[0].room[0].price * 1.2)}
                </div>
                <div className="text-orange-500 text-xl font-bold">
                  {formatCurrency(hotel.roomType[0].room[0].price)}
                </div>
                <div className="text-xs text-gray-500">
                  Exclude taxes & fees
                </div>
              </div>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Book now
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HotelItem;
