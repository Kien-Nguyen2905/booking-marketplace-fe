'use client';
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
    closeSelectors,
    locationContainerRef,
    dateContainerRef,
    peopleContainerRef,
    isLoading,
    query,
    handleSearchHorizontalBar,
  } = useSearchBanner();

  return (
    <div className="w-full md:max-auto lg:max-w-none h-max bg-transparent md:bg-white md:border-t md:shadow-lg lg:p-2 md:fixed md:top-[76px] md:left-0 md:right-0 md:z-30">
      <div
        className={`flex h-[80px] px-4 pt-[15px] gap-2 md:gap-0 md:flex-row flex-col items-center justify-between mx-auto relative container ${
          query.province ? 'w-full' : 'md:w-full lg:w-[960px]'
        }`}
      >
        {/* Location Input */}
        {query.province && (
          <div
            className="relative w-full md:w-[380px] lg:w-[420px] 2xl:w-[26%]"
            ref={locationContainerRef}
          >
            <div
              className={cn(
                'flex rounded-lg items-center bg-white border md:rounded-r-none md:rounded-l-lg p-2 cursor-pointer group transition-all',
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
        )}

        {/* Date Range Picker */}
        <div
          className={`relative w-full md:w-[380px] lg:w-[540px] ${
            query.province ? '2xl:w-[34%]' : 'w-full'
          }`}
          ref={dateContainerRef}
        >
          <div
            className={cn(
              'flex rounded-lg md:border-x-0 md:rounded-none border items-center bg-white md:border-y p-2 cursor-pointer group transition-all',
              !query.province && 'md:border-l md:rounded-l-lg',
            )}
            onClick={handleDateClick}
          >
            <Calendar className="h-5 w-5 text-gray-400 group-hover:text-blue-500 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-500 mb-0.5">
                Check-in - Check-out
              </div>
              <div className="text-sm font-medium text-gray-900 truncate line-clamp-1">
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
        <div
          className={`relative w-full md:w-[290px] lg:w-[270px] ${
            query.province ? '2xl:w-[22%]' : 'w-[490px]'
          }`}
          ref={peopleContainerRef}
        >
          <div
            className={cn(
              'flex items-center bg-white border rounded-lg md:rounded-none p-2 cursor-pointer group transition-all',
            )}
            onClick={handlePeopleClick}
          >
            <Users className="h-5 w-5 text-gray-400 group-hover:text-blue-500 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-medium text-gray-500 mb-0.5">
                Guests
              </div>
              <div className="text-sm font-medium truncate line-clamp-1 text-gray-900">
                {peopleDisplay}
              </div>
            </div>
            {activeSelector === 'people' && (
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 rounded-full absolute right-2 top-1/2 -translate-y-1/2"
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
          className="w-full rounded-lg md:text-xs lg:text-base md:w-[100px] lg:w-[150px] 2xl:w-[18%] flex items-center md:rounded-l-none h-[56px] text-white py-3 px-6 font-medium text-base"
          onClick={handleSearchHorizontalBar}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Search className="mr-2 md:mr-1 lg:mr-2 h-4 w-4 md:hidden lg:block" />
              SEARCH
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchHorizontalBar;
