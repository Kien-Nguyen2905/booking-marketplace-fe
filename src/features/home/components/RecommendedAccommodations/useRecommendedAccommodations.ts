import { useState } from 'react';
import { POPULAR_ACCOMMODATION_LIST } from '@/constants';
import {
  useGetHotelsByProvinceCodeQuery,
  useGetPromotionsByValidFromQuery,
} from '@/queries';
import { useRef } from 'react';

export const useRecommendedAccommodations = () => {
  const [activeTab, setActiveTab] = useState<string>(
    POPULAR_ACCOMMODATION_LIST[0]?.provinceCode || '',
  );

  const { data: hotelsData } = useGetHotelsByProvinceCodeQuery(activeTab);
  const hotels = hotelsData?.data.data || [];

  const { data: promotionsData } = useGetPromotionsByValidFromQuery();

  const promotionToday = promotionsData?.data.data.todayPromotions;

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  // @ts-ignore
  const [_swiper, setSwiper] = useState<any>(null);

  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  return {
    promotionToday,
    activeTab,
    setActiveTab,
    setIsBeginning,
    isBeginning,
    setIsEnd,
    isEnd,
    setSwiper,
    hotelsData,
    nextBtnRef,
    prevBtnRef,
    hotels,
  };
};
