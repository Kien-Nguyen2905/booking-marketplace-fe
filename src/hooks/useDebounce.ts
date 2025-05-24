import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export const useDebounce = ({
  initialValue,
  delay,
}: {
  initialValue: boolean;
  delay: number;
}) => {
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const setLoadingToFalse = debounce(() => {
      setDebouncedValue(initialValue);
    }, delay);

    // If loading starts, immediately set debounced loading to true
    if (initialValue) {
      setDebouncedValue(initialValue);
    } else {
      // If loading stops, schedule setting debounced loading to false
      setLoadingToFalse();
    }

    // Cleanup function to cancel the debounce when component unmounts or dependencies change
    return () => setLoadingToFalse.cancel();
  }, [initialValue, delay]);

  return debouncedValue;
};
