import { useGetQuantityHotelsByProvinceCodeQuery } from '@/queries';
import { COUNT_DESTINATION_LIST, DESTINATIONS } from '@/constants';
import { useRef, useState } from 'react';

export const useDestinationShowcase = () => {
  const { data } = useGetQuantityHotelsByProvinceCodeQuery({
    provinceCodes: COUNT_DESTINATION_LIST,
  });
  const destinationsData = data?.data.data;
  const destinations = destinationsData?.map((destination) => {
    const destinationItem = DESTINATIONS.find(
      (d) => d.provinceCode === destination.provinceCode,
    );
    if (destinationItem) {
      destinationItem.accommodations = destination.quantity;
    }
    return destinationItem;
  });
  const [isBeginning, setIsBeginning] = useState(true);
  const [_swiper, setSwiper] = useState<any>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);

  return {
    destinations,
    setIsBeginning,
    isBeginning,
    setSwiper,
    paginationRef,
    nextBtnRef,
    prevBtnRef,
  };
};
