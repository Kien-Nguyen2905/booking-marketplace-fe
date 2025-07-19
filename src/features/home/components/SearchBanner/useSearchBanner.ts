'use client';
import { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { OptionType } from '@/components/PeopleSelector/type';
import { PEOPLE_SELECTOR_OPTIONS, DEFAULT_PEOPLE_COUNT } from '@/constants';
import queryString from 'query-string';
import { formattedDateDisplay, formattedPeopleDisplay } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LIMIT_HOTEL, ROUTES } from '@/constants';
import { useGetProvincesQuery } from '@/queries';
import { LocationType } from '@/components/LocationSelector/type';
import { showToast } from '@/lib/toast';

export const useSearchBanner = () => {
  const { data: provincesData } = useGetProvincesQuery();
  const provinces =
    provincesData?.data?.data?.map((province) => ({
      id: province.code,
      name: province.name,
      code: province.code,
    })) || [];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = queryString.parse(searchParams.toString());
  const router = useRouter();
  // Refs for positioning dropdowns
  const locationContainerRef = useRef<HTMLDivElement>(null);
  const dateContainerRef = useRef<HTMLDivElement>(null);
  const peopleContainerRef = useRef<HTMLDivElement>(null);

  const [activeSelector, setActiveSelector] = useState<string | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(
    null,
  );
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);

  // Initialize people options from constants to ensure consistency
  const [selectedPeople, setSelectedPeople] = useState<OptionType[]>(() =>
    PEOPLE_SELECTOR_OPTIONS.map((option) => ({
      ...option,
      count:
        DEFAULT_PEOPLE_COUNT[option.id as keyof typeof DEFAULT_PEOPLE_COUNT] ||
        0,
    })),
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleLocationClick = () => {
    setActiveSelector(activeSelector === 'location' ? null : 'location');
  };

  const handleDateClick = () => {
    const newActiveSelector = activeSelector === 'date' ? null : 'date';
    setActiveSelector(newActiveSelector);
    
    // Find PromoCodeSlider div using querySelector
    const promoCodeSliderDiv = document.querySelector('[data-promo-code-slider]') as HTMLDivElement;
    console.log('promoCodeSliderDiv', promoCodeSliderDiv);
    
    if (promoCodeSliderDiv) {
      if (newActiveSelector === 'date') {
        promoCodeSliderDiv.classList.add('-z-10');
      } else {
        promoCodeSliderDiv.classList.remove('-z-10');
      }
    }
  };

  const handlePeopleClick = () => {
    setActiveSelector(activeSelector === 'people' ? null : 'people');
  };

  const handleLocationChange = (location: LocationType) => {
    setSelectedLocation(location);
    setActiveSelector(null);
  };

  const handleDateChange = (dateRange: DateRange | undefined) => {
    setSelectedDateRange(dateRange);
    if (dateRange?.to) {
      setActiveSelector(null);
    }
  };

  const handlePeopleChange = (people: OptionType[]) => {
    setSelectedPeople(people);
  };

  const handlePeopleDone = () => {
    setActiveSelector(null);
  };

  const closeSelectors = () => {
    setActiveSelector(null);
    // Remove -z-10 class when closing selectors
    const promoCodeSliderDiv = document.querySelector('[data-promo-code-slider]') as HTMLDivElement;
    if (promoCodeSliderDiv) {
      promoCodeSliderDiv.classList.remove('-z-10');
    }
  };

  const handleSearch = () => {
    const query: Record<string, any> = {};
    if (
      !selectedLocation?.code ||
      !selectedDateRange?.from ||
      !selectedDateRange?.to ||
      !selectedPeople
    )
      return;

    setIsLoading(true);
    if (selectedLocation?.code) {
      query.province = selectedLocation.code;
    }
    if (selectedLocation?.lat && selectedLocation?.lon) {
      query.lat = selectedLocation.lat;
      query.lon = selectedLocation.lon;
    }

    if (selectedDateRange?.from) {
      query.start = format(selectedDateRange.from, 'dd-MM-yyyy');
    }

    if (selectedDateRange?.to) {
      query.end = format(selectedDateRange.to, 'dd-MM-yyyy');
    }
    if (
      selectedDateRange?.from?.getTime() === selectedDateRange?.to?.getTime()
    ) {
      showToast({
        type: 'warning',
        message: 'Date invalid',
      });
      setIsLoading(false);
      return;
    }
    // Extract counts from selectedPeople
    const adults = selectedPeople.find((p) => p.id === 'adults')?.count || 0;
    const children =
      selectedPeople.find((p) => p.id === 'children')?.count || 0;
    const rooms = selectedPeople.find((p) => p.id === 'rooms')?.count || 0;

    if (adults) query.adult = adults;
    if (children) query.child = children;
    if (rooms) query.available = rooms;

    const queryStr = queryString.stringify({
      ...query,
      page: 1,
      limit: LIMIT_HOTEL,
    });

    // Navigate to hotel page with search parameters
    if (pathname === ROUTES.HOTEL) {
      // If already on hotel page, update URL without full page refresh
      router.push(`${ROUTES.HOTEL}?${queryStr}`, { scroll: false });
      // Clear loading state after navigation
      setTimeout(() => setIsLoading(false), 300);
    } else {
      // If coming from another page, navigate to hotel page
      router.push(`${ROUTES.HOTEL}?${queryStr}`);
    }
  };

  const handleSearchDetail = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (query.province) return;
    setIsLoading(true);

    // Set date parameters regardless of location
    if (selectedDateRange?.from) {
      params.set('start', format(selectedDateRange.from, 'dd-MM-yyyy'));
    }

    if (selectedDateRange?.to) {
      params.set('end', format(selectedDateRange.to, 'dd-MM-yyyy'));
    }
    // Extract counts from selectedPeople
    const adults = selectedPeople.find((p) => p.id === 'adults')?.count || 0;
    const children =
      selectedPeople.find((p) => p.id === 'children')?.count || 0;
    const rooms = selectedPeople.find((p) => p.id === 'rooms')?.count || 0;
    if (adults) params.set('adult', adults.toString());
    if (children > 0) {
      params.set('child', children.toString());
    } else {
      params.delete('child');
    }
    if (rooms) params.set('available', rooms.toString());

    // Create a new URL with the updated parameters
    const newUrl = `${pathname}?${params.toString()}`;

    // Navigate to the new URL
    router.push(newUrl);

    setTimeout(() => setIsLoading(false), 300);
  };

  const handleSearchHorizontalBar = query.province
    ? handleSearch
    : handleSearchDetail;

  useEffect(() => {
    if (pathname.includes(ROUTES.HOTEL)) {
      // Set location if available
      if (query.province && provinces.length > 0) {
        setSelectedLocation({
          code: +query.province,
          name:
            provinces?.find(
              (province: any) => province.code.toString() === query.province,
            )?.name || '',
          id:
            provinces?.find(
              (province: any) => province.code.toString() === query.province,
            )?.code || 0,
        });
      }

      // Parse dates using date-fns parse function
      if (query.start || query.end) {
        if (query.start === query.end) {
          router.push(ROUTES.HOME);
          return;
        }
        let from: Date | undefined = undefined;
        let to: Date | undefined = undefined;

        if (query.start) {
          // Convert dd-MM-yyyy to Date object
          const startParts = (query.start as string).split('-');
          if (startParts.length === 3) {
            const day = parseInt(startParts[0]);
            const month = parseInt(startParts[1]) - 1; // Month is 0-indexed
            const year = parseInt(startParts[2]);
            from = new Date(year, month, day);
          }
        }

        if (query.end) {
          // Convert dd-MM-yyyy to Date object
          const endParts = (query.end as string).split('-');
          if (endParts.length === 3) {
            const day = parseInt(endParts[0]);
            const month = parseInt(endParts[1]) - 1; // Month is 0-indexed
            const year = parseInt(endParts[2]);
            to = new Date(year, month, day);
          }
        }

        // Only set the date range if we have at least a from date
        if (from) {
          setSelectedDateRange({ from, to });
        }
      }

      // Set people options
      const newOptions = PEOPLE_SELECTOR_OPTIONS.map((option) => {
        let count =
          DEFAULT_PEOPLE_COUNT[
            option.id as keyof typeof DEFAULT_PEOPLE_COUNT
          ] || 0;

        // Override with URL params if available
        if (option.id === 'adults' && query.adult) {
          count = parseInt(query.adult as string) || count;
        }
        if (option.id === 'children' && query.child) {
          count = parseInt(query.child as string) || count;
        }
        if (option.id === 'rooms' && query.available) {
          count = parseInt(query.available as string) || count;
        }

        return {
          ...option,
          count,
        };
      });

      setSelectedPeople(newOptions);
    }
  }, [pathname, searchParams, provincesData]);

  // Set up click outside handler
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        activeSelector &&
        !locationContainerRef.current?.contains(e.target as Node) &&
        !dateContainerRef.current?.contains(e.target as Node) &&
        !peopleContainerRef.current?.contains(e.target as Node)
      ) {
        closeSelectors();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeSelector, closeSelectors]);
  return {
    activeSelector,
    selectedLocation,
    selectedDateRange,
    selectedPeople,
    dateDisplay: formattedDateDisplay(selectedDateRange),
    peopleDisplay: formattedPeopleDisplay(selectedPeople),
    handleLocationChange,
    handleDateChange,
    handlePeopleChange,
    handlePeopleDone,
    handleLocationClick,
    handleDateClick,
    handlePeopleClick,
    handleSearch,
    closeSelectors,
    locationContainerRef,
    dateContainerRef,
    peopleContainerRef,
    isLoading,
    query,
    handleSearchHorizontalBar,
  };
};
