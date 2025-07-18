import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useHotelSortOptions } from './useHotelSortOptions';
import { Button } from '@/components/ui/button';

const HotelSortOptions = () => {
  const { selectedSort, onSortChange, sortOptions, onResetSort } =
    useHotelSortOptions();
  return (
    <div className="flex items-center gap-1 justify-between w-full md:justify-end md:gap-2">
      <span className="hidden md:block text-sm font-medium">Sort by:</span>
      <Select value={selectedSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-full md:w-[180px]">
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
      <Button onClick={onResetSort}>Reset</Button>
    </div>
  );
};

export default HotelSortOptions;
