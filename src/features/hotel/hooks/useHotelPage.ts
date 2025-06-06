import { useGetFindHotelsQuery } from '@/queries';
import { HOTEL_PARAMS, LIMIT } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks';
export const useHotelPage = () => {
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
  }, [searchParams]);
  return {
    hotels,
    pagination: hotelsData?.data?.data,
    isLoading: useDebounce({ initialValue: isLoading, delay: 500 }),
    queryStringDetail,
  };
};
