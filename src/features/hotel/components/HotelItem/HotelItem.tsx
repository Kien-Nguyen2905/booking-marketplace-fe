import { Card, CardContent } from '@/components/ui/card';
import { THotelItemProps } from '@/features/hotel/components/HotelItem/type';
import React, { FC } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  BadgePercent,
  CalendarFold,
  House,
  MapPinned,
  Tag,
} from 'lucide-react';
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
import { format } from 'date-fns';

const HotelItem: FC<THotelItemProps> = ({
  hotel,
  queryStringDetail,
  promotion,
}) => {
  return (
    <Link href={`${ROUTES.HOTEL}/${hotel.id}?${queryStringDetail}`}>
      <Card>
        <CardContent className="flex items-start justify-between">
          <div className="flex gap-3">
            {/* Image */}
            <div className="grid grid-cols-3 grid-rows-3 gap-1 w-[250px] h-[200px] overflow-hidden rounded-l-lg">
              <div className="col-span-3 relative row-span-2">
                <Image
                  src={hotel.images[0]}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                />
                {promotion && promotion?.percentage > 0 && (
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1 m-2 rounded-lg font-semibold flex items-center gap-1 shadow-sm">
                    <Tag size={14} />
                    Save {Math.round(promotion.percentage * 100)}% OFF
                  </div>
                )}
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
              {promotion && promotion?.percentage > 0 && (
                <div className="text-white mt-4 w-max text-xs rounded-2xl font-semibold flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 p-1 pr-2 cursor-pointer">
                  <BadgePercent size={20} />
                  {promotion?.title} from{' '}
                  {format(promotion?.validFrom, 'dd-MM-yyyy')} to{' '}
                  {format(promotion?.validUntil, 'dd-MM-yyyy')}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-primary p-1 cursor-pointer">
              <CalendarFold />
            </div>
            <div className="text-right">
              <div className="mb-2 flex flex-col items-end">
                {promotion && promotion?.percentage > 0 && (
                  <div className="text-gray-500 text-sm line-through mb-1">
                    {formatCurrency(hotel.room[0]?.price)}
                  </div>
                )}
                <div className="text-orange-500 text-xl font-bold">
                  {formatCurrency(
                    hotel.room[0]?.price * (1 - (promotion?.percentage || 0)),
                  )}
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
