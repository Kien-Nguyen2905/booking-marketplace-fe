import React, { FC } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { TComboboxAmenityProps } from './type';

const ComboboxAmenity: FC<TComboboxAmenityProps> = ({
  addAmenity,
  allAmenities,
  filteredAvailableAmenities,
  open,
  setOpen,
}) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {searchValue
            ? allAmenities.find((amenity) => amenity.name === searchValue)?.name
            : 'Select amenity'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-72 p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandGroup className="max-h-72 overflow-auto">
            {filteredAvailableAmenities.map((amenity) => (
              <CommandItem
                key={amenity.id}
                value={amenity.name}
                onSelect={(currentValue) => {
                  setSearchValue(
                    currentValue === searchValue ? '' : currentValue,
                  );
                  addAmenity(amenity);
                  setOpen(false);
                  setSearchValue('');
                }}
                className="w-full flex justify-between cursor-pointer"
              >
                <span>{amenity.name}</span>
                <span className="w-[70px] text-sm text-muted-foreground">
                  {amenity.category}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboboxAmenity;
