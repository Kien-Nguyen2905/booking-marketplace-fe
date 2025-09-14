'use client';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LocationSelector, PeopleSelector } from '@/components';
import { Search, MapPin, Calendar, Users, X, Loader2 } from 'lucide-react';
import { useSearchBanner } from './useSearchBanner';
import Image from 'next/image';
// Dynamically import DatePickerWithRange to avoid SSR issues
const DatePickerWithRange = dynamic(
  () => import('@/components/DatePickerWithRange/DatePickerWithRange'),
  {
    ssr: false,
  },
);

const SearchBanner = () => {
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
    <div className="w-full relative h-[550px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[650px] xl:w-[850px]">
        <h1 className="text-center text-2xl lg:text-3xl font-bold mb-8 text-white drop-shadow-sm">
          SEE THE WORLD FOR MORE
        </h1>
        <div className="bg-white relative rounded-xl shadow-lg px-6 pt-6 pb-12">
          <div className="flex flex-col gap-3 lg:gap-6">
            <div className="relative" ref={locationContainerRef}>
              <div
                className={cn(
                  'flex items-center bg-white border rounded-lg p-3 cursor-pointer group transition-all',
                  activeSelector === 'location'
                    ? 'border-blue-500 ring-2 ring-blue-100'
                    : 'border-gray-300 hover:border-blue-300',
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
            <div className="grid md:grid-cols-3 gap-3 lg:gap-6">
              <div
                className="relative md:col-start-1 md:col-end-3"
                ref={dateContainerRef}
              >
                <div
                  className={cn(
                    'flex items-center bg-white border rounded-lg p-3 cursor-pointer group transition-all',
                    activeSelector === 'date'
                      ? 'border-blue-500 ring-2 ring-blue-100'
                      : 'border-gray-300 hover:border-blue-300',
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
              <div className="relative" ref={peopleContainerRef}>
                <div
                  className={cn(
                    'flex items-center bg-white border rounded-lg p-3 cursor-pointer group transition-all',
                    activeSelector === 'people'
                      ? 'border-blue-500 ring-2 ring-blue-100'
                      : 'border-gray-300 hover:border-blue-300',
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
                  <div className="absolute w-full right-0 mt-2 z-50 bg-white shadow-xl rounded-lg overflow-hidden">
                    <PeopleSelector
                      options={selectedPeople}
                      onChange={handlePeopleChange}
                      onDone={handlePeopleDone}
                    />
                  </div>
                )}
              </div>
            </div>
            <Button
              className="w-[200px] absolute -bottom-1/5 md:-bottom-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60px] mx-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium text-base shadow-md transition-all"
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
      </div>
      <div className="w-full h-full">
        <Image
          className="min-w-full h-full object-cover -z-10"
          src="/images/banner.jpg"
          alt="Featured accommodation"
          layout="fill"
        />
      </div>
    </div>
  );
};

export default SearchBanner;
