import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const useHotelSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const selectedType = searchParams.get('type') || '';
  const selectedRating = searchParams.get('rating') || '';

  const handleTypeChange = (value: string) => {
    // Create a new URLSearchParams object with the current query parameters
    const params = new URLSearchParams(searchParams.toString());

    // If clicking the already selected checkbox, uncheck it
    if (selectedType === value) {
      params.delete('type');
    } else {
      // Otherwise set the new type (previous one is automatically unselected)
      params.set('type', value);
    }

    // Navigate to the updated URL
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleRatingChange = (value: string) => {
    // If clicking the already selected checkbox, uncheck it
    if (selectedRating === value) {
      params.delete('rating');
    } else {
      // Otherwise set the new rating (previous one is automatically unselected)
      params.set('rating', value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const resetTypeFilter = () => {
    params.delete('type');
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetRatingFilter = () => {
    params.delete('rating');
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetAllFilters = () => {
    // Remove only filter parameters, keep sorting and pagination
    params.delete('type');
    params.delete('rating');
    router.push(`${pathname}?${params.toString()}`);
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
