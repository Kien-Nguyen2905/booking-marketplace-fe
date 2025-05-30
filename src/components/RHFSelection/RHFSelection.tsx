'use client';
import { RequiredField } from '@/components/RequiredField';
import { RHFInput } from '@/components/RHFInput';
import { TRHFSelectionProps } from '@/components/RHFSelection/type';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check } from 'lucide-react';
import React, { useState } from 'react';
import { FC } from 'react';

const RHFSelection: FC<TRHFSelectionProps> = ({
  form,
  name,
  label,
  required,
  placeholder,
  list,
  className,
  isSearch = false,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  return (
    <RHFInput
      form={form}
      name={name}
      className={className}
      renderProp={(props: any, field: any) => {
        return (
          <div className="grid gap-1">
            <FormLabel className="block text-sm font-medium text-gray-700">
              {label}
              {required && <RequiredField required={required} />}
            </FormLabel>
            <Select
              onValueChange={(value) => {
                if (value) {
                  field?.onChange(value);
                }
              }}
              value={field.value}
              {...props}
              autoComplete="off"
              open={open}
              onOpenChange={handleOpenChange}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger className="w-full h-12!">
                  {field.value ? (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{field.value}</span>
                    </div>
                  ) : (
                    <SelectValue placeholder={placeholder} />
                  )}
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <Command>
                  {isSearch && (
                    <CommandInput placeholder="Search..." className="h-9" />
                  )}
                  <CommandList className="max-h-[200px] overflow-auto">
                    <CommandEmpty>No result found</CommandEmpty>
                    <CommandGroup>
                      {list.map((item) => (
                        <CommandItem
                          key={item.value}
                          value={item.label}
                          disabled={item.value === field.value}
                          onSelect={() => {
                            field?.onChange(item.value);
                            setOpen(false);
                          }}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <span>{item.label}</span>
                          {item.value === field.value && (
                            <Check className="h-4 w-4" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </SelectContent>
            </Select>
            <FormMessage />
          </div>
        );
      }}
    />
  );
};

export default RHFSelection;
