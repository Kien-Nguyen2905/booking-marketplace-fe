'use client';
import React, { FC, useState } from 'react';
import { FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { TRHFPickDateProps } from '@/components/RHFPickDate/type';
import { RequiredField } from '@/components/RequiredField';

const RHFPickDate: FC<TRHFPickDateProps> = ({
  name,
  label,
  required,
  placeholder,
  field,
  className = '',
  onChange,
  disabledInput = false,
  fromYear = new Date().getFullYear(),
  toYear = new Date().getFullYear() + 50,
  disabled = (date: Date) => date > new Date(),
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid gap-1">
      <FormLabel
        className="block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
        <RequiredField required={required} />
      </FormLabel>
      <Popover modal={true} open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="h-12!">
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-full pl-3 text-left font-normal',
                !field.value && 'text-slate-500',
                className,
              )}
              disabled={disabledInput}
            >
              {field.value ? (
                format(field.value, 'dd/MM/yyyy')
              ) : (
                <span>{placeholder}</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" side="bottom">
          <Calendar
            mode="single"
            selected={field.value || undefined}
            onSelect={(value) => {
              field.onChange(value);
              onChange?.(value);
              setOpen(false);
            }}
            disabled={disabled}
            initialFocus
            captionLayout="dropdown-buttons"
            defaultMonth={field.value || new Date()}
            fromYear={fromYear}
            toYear={toYear}
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </div>
  );
};

export default RHFPickDate;
