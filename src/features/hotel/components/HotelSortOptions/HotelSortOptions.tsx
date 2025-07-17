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
    <div className="">
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
        <Button onClick={onResetSort}>Reset</Button>
      </div>
    </div>
  );
};

export default HotelSortOptions;
