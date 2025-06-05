'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LocationSelector, PeopleSelector } from '@/components';
import { Search, MapPin, Calendar, Users, X, Loader2 } from 'lucide-react';
import { useSearchBanner } from '@/features/home/components/SearchBanner/useSearchBanner';

// Dynamically import DatePickerWithRange to avoid SSR issues
const DatePickerWithRange = dynamic(
  () => import('@/components/DatePickerWithRange/DatePickerWithRange'),
  {
    ssr: false,
  },
);

const SearchHorizontalBar = () => {
  const {
    activeSelector,
    selectedLocation,
    selectedDateRange,
    selectedPeople,
    dateDisplay,
    peopleDisplay,
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
  } = useSearchBanner();

  return (
    <div className="w-full h-max bg-white border-t shadow-lg p-2 fixed top-[76px] left-0 right-0 z-50">
      <div className="flex h-[80px] items-center justify-center mx-auto relative container">
        {/* Location Input */}
        <div className="relative w-[380px]" ref={locationContainerRef}>
          <div
            className={cn(
              'flex items-center bg-white border rounded-l-lg p-3 cursor-pointer group transition-all',
            )}
            onClick={handleLocationClick}
          >
            <MapPin className="h-5 w-5 text-gray-400 group-hover:text-blue-500 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-500 mb-0.5">
                Destination
              </div>
              <div className="text-sm font-medium truncate text-gray-900">
                {selectedLocation
                  ? selectedLocation.name
                  : 'Where are you going?'}
              </div>
            </div>
            {activeSelector === 'location' && (
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  closeSelectors();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {activeSelector === 'location' && (
            <div className="absolute left-0 right-0 mt-2 z-50 bg-white shadow-xl rounded-lg overflow-hidden">
              <LocationSelector onChange={handleLocationChange} />
            </div>
          )}
        </div>

        {/* Date Range Picker */}
        <div className="relative w-[540px]" ref={dateContainerRef}>
          <div
            className={cn(
              'flex items-center bg-white border-y p-3 cursor-pointer group transition-all',
            )}
            onClick={handleDateClick}
          >
            <Calendar className="h-5 w-5 text-gray-400 group-hover:text-blue-500 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-500 mb-0.5">
                Check-in - Check-out
              </div>
              <div className="text-sm font-medium text-gray-900">
                {dateDisplay}
              </div>
            </div>
            {activeSelector === 'date' && (
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  closeSelectors();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {activeSelector === 'date' && (
            <div className="absolute left-0 right-0 mt-2 z-50">
              <DatePickerWithRange
                onChange={handleDateChange}
                defaultValue={selectedDateRange}
              />
            </div>
          )}
        </div>

        {/* People Selector */}
        <div className="relative w-[220px]" ref={peopleContainerRef}>
          <div
            className={cn(
              'flex items-center bg-white border p-3 cursor-pointer group transition-all',
            )}
            onClick={handlePeopleClick}
          >
            <Users className="h-5 w-5 text-gray-400 group-hover:text-blue-500 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-500 mb-0.5">
                Guests
              </div>
              <div className="text-sm font-medium text-gray-900">
                {peopleDisplay}
              </div>
            </div>
            {activeSelector === 'people' && (
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  closeSelectors();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {activeSelector === 'people' && (
            <div className="absolute w-full right-0 mt-2 z-50 bg-white shadow-xl overflow-hidden">
              <PeopleSelector
                options={selectedPeople}
                onChange={handlePeopleChange}
                onDone={handlePeopleDone}
              />
            </div>
          )}
        </div>

        {/* Search Button */}
        <Button
          className="w-full flex-1 flex items-center rounded-l-none h-[64px] text-white py-3 px-6 font-medium text-base"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              SEARCH
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchHorizontalBar;
