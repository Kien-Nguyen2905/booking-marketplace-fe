import { LIMIT_HOTEL } from '@/constants';
import { setParamsDefault } from '@/lib/utils';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const useHotelSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const selectedType = searchParams.get('type') || '';
  const selectedRating = searchParams.get('rating') || '';

  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedType === value) {
      params.delete('type');
    } else {
      params.set('type', value);
    }

    const newQueryString = setParamsDefault(params, LIMIT_HOTEL);
    router.push(`${pathname}?${newQueryString}`);
  };

  const handleRatingChange = (value: string) => {
    if (selectedRating === value) {
      params.delete('rating');
    } else {
      params.set('rating', value);
    }

    const newQueryString = setParamsDefault(params, LIMIT_HOTEL);
    router.push(`${pathname}?${newQueryString}`);
  };

  const resetTypeFilter = () => {
    params.delete('type');
    const newQueryString = setParamsDefault(params, LIMIT_HOTEL);
    router.push(`${pathname}?${newQueryString}`);
  };

  const resetRatingFilter = () => {
    params.delete('rating');
    const newQueryString = setParamsDefault(params, LIMIT_HOTEL);
    router.push(`${pathname}?${newQueryString}`);
  };

  const resetAllFilters = () => {
    params.delete('type');
    params.delete('rating');
    const newQueryString = setParamsDefault(params, LIMIT_HOTEL);
    router.push(`${pathname}?${newQueryString}`);
  };

  // Check if any filters are active
  const isActiveFilters = selectedType || selectedRating;

  return {
    selectedType,
    selectedRating,
    handleTypeChange,
    handleRatingChange,
    resetTypeFilter,
    resetRatingFilter,
    resetAllFilters,
    isActiveFilters,
  };
};
