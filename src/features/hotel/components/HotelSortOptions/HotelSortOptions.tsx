import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useHotelSortOptions } from './useHotelSortOptions';

export const HotelSortOptions = () => {
  const { selectedSort, onSortChange, sortOptions } = useHotelSortOptions();
  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-sm font-medium">Sort by:</span>
      <Select value={selectedSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a sort option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
