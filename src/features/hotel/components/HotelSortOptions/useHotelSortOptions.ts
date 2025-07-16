import { LIMIT_HOTEL, SORT_OPTIONS_HOTEL } from '@/constants';
import { setParamsDefault } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useHotelSortOptions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const orderBy = searchParams.get('orderBy');
  const order = searchParams.get('order');

  const [selectedSort, setSelectedSort] = useState<string>('');

  const onSortChange = (value: string) => {
    setSelectedSort(value);

    const selectedOption = SORT_OPTIONS_HOTEL.find(
      (opt) => opt.value === value,
    );

    if (!selectedOption) return;

    params.set('orderBy', selectedOption.orderBy);
    params.set('order', selectedOption.order);
    const newQueryString = setParamsDefault(params, LIMIT_HOTEL);

    router.push(`${pathname}?${newQueryString}`);
  };

  const onResetSort = () => {
    params.delete('orderBy');
    params.delete('order');
    const newQueryString = setParamsDefault(params, LIMIT_HOTEL);
    router.push(`${pathname}?${newQueryString}`);
    setSelectedSort('');
  };

  useEffect(() => {
    if (orderBy && order) {
      const sortKey = `${orderBy}-${order}`;
      const option = SORT_OPTIONS_HOTEL.find((opt) => opt.value === sortKey);
      if (option) {
        setSelectedSort(sortKey);
      }
    }
  }, [searchParams]);

  return {
    selectedSort,
    onSortChange,
    sortOptions: SORT_OPTIONS_HOTEL,
    onResetSort,
  };
};
