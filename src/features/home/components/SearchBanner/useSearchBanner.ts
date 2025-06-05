'use client';
import { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { OptionType } from '@/components/PeopleSelector/type';
import {
  PEOPLE_SELECTOR_OPTIONS,
  DEFAULT_PEOPLE_COUNT,
} from '@/components/PeopleSelector/constants';
import queryString from 'query-string';
import { formattedDateDisplay, formattedPeopleDisplay } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { LIMIT } from '@/constants';

export const useSearchBanner = () => {
  const router = useRouter();
  // Refs for positioning dropdowns
  const locationContainerRef = useRef<HTMLDivElement>(null);
  const dateContainerRef = useRef<HTMLDivElement>(null);
  const peopleContainerRef = useRef<HTMLDivElement>(null);

  const [activeSelector, setActiveSelector] = useState<string | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
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

  const handleLocationClick = () => {
    setActiveSelector(activeSelector === 'location' ? null : 'location');
  };

  const handleDateClick = () => {
    setActiveSelector(activeSelector === 'date' ? null : 'date');
  };

  const handlePeopleClick = () => {
    setActiveSelector(activeSelector === 'people' ? null : 'people');
  };

  const handleLocationChange = (location: any) => {
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

    if (selectedLocation?.code) {
      query.province = selectedLocation.code;
    }

    if (selectedDateRange?.from) {
      query.start = format(selectedDateRange.from, 'dd-MM-yyyy');
    }

    if (selectedDateRange?.to) {
      query.end = format(selectedDateRange.to, 'dd-MM-yyyy');
    }

    // Extract counts from selectedPeople
    const adults = selectedPeople.find((p) => p.id === 'adults')?.count || 0;
    const children =
      selectedPeople.find((p) => p.id === 'children')?.count || 0;
    const rooms = selectedPeople.find((p) => p.id === 'rooms')?.count || 0;

    if (adults) query.adult = adults;
    if (children) query.child = children;
    if (rooms) query.available = rooms;

    const queryStr = queryString.stringify({ ...query, page: 1, limit: LIMIT });

    router.push(`hotels?${queryStr}`);
  };

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
  };
};
