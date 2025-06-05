'use client';
import { FC } from 'react';
import { Input } from '@/components/ui/input';
import { MapPin, Search } from 'lucide-react';
import { TLocationSelectorProps } from '@/components/LocationSelector/type';
import { useLocationSelector } from '@/components/LocationSelector/useLocationSelector';

const LocationSelector: FC<TLocationSelectorProps> = ({ onChange }) => {
  const {
    searchTerm,
    setSearchTerm,
    filteredProvinces,
    handleSelectLocation,
    isLoading,
    searchInputRef,
  } = useLocationSelector(onChange);
  return (
    <div className="grid gap-2">
      <div className="w-full p-0 bg-white rounded-md shadow-lg border">
        <div className="p-3 border-b">
          <div className="flex items-center space-x-2">
            <Search size={18} className="text-gray-400" />
            <Input
              ref={searchInputRef}
              placeholder="Search province/city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-1 p-4 focus-visible:ring-0"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="max-h-72 overflow-y-auto p-0">
          {isLoading ? (
            <div className="p-3 text-center text-sm text-gray-500">
              Loading...
            </div>
          ) : filteredProvinces.length > 0 ? (
            filteredProvinces.map((province) => (
              <div
                key={province.id}
                className="flex cursor-pointer items-start p-3 hover:bg-slate-50"
                onClick={() => handleSelectLocation(province)}
              >
                <div className="mt-0.5 mr-3">
                  <MapPin size={16} className="text-blue-500" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="font-medium truncate">{province.name}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-sm text-gray-500">
              Not found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
