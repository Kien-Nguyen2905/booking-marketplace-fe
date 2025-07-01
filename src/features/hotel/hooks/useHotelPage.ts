import {
  useGetFindHotelsQuery,
  useGetPromotionsByValidFromQuery,
} from '@/queries';
import { HOTEL_PARAMS, LIMIT, ROUTES } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
export const useHotelPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [queryString, setQueryString] = useState(
    searchParams.toString() || `limit=${LIMIT}&page=1`,
  );

  const queryStringEnabled = HOTEL_PARAMS.some((param) =>
    queryString.includes(param),
  )
    ? queryString
    : '';

  const { data: hotelsData, isLoading } =
    useGetFindHotelsQuery(queryStringEnabled);
  const hotels = hotelsData?.data?.data?.data || [];

  // Extract and prepare essential booking parameters for hotel detail page
  const detailParams = new URLSearchParams();

  // Get essential booking parameters
  const start = searchParams.get('start');
  const end = searchParams.get('end');
  const adult = searchParams.get('adult');
  const child = searchParams.get('child');
  const available = searchParams.get('available');

  const queryStringPromotion = `validFrom=${start}&validUntil=${end}`;
  const { data: promotionsData } =
    useGetPromotionsByValidFromQuery(queryStringPromotion);

  const promotionToday = promotionsData?.data.data.todayPromotions;

  const promotionNotToday = promotionsData?.data.data.promotions[0];
  // Add them to the detail params if they exist
  if (start) detailParams.set('start', start);
  if (end) detailParams.set('end', end);
  if (adult) detailParams.set('adult', adult);
  if (child) detailParams.set('child', child);
  if (available) detailParams.set('available', available);

  const queryStringDetail = detailParams.toString();

  useEffect(() => {
    if (typeof window !== 'undefined' && searchParams) {
      const params = searchParams.toString();
      setQueryString(params);
    }
    if (!start || !end || !adult || !available) {
      router.push(ROUTES.HOME);
    }
  }, [searchParams]);
  return {
    hotels,
    pagination: hotelsData?.data?.data,
    isLoading,
    queryStringDetail,
    promotion: promotionToday || promotionNotToday,
  };
};
