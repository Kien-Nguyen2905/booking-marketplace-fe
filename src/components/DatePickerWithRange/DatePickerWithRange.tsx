'use client';
import React, { FC } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { TDatePickerWithRangeProps } from './type';
import { useDatePickerWithRange } from '@/components/DatePickerWithRange/useDatePickerWithRange';

const DatePickerWithRange: FC<TDatePickerWithRangeProps> = ({
  onChange,
  defaultValue,
  disablePastDates = true,
}) => {
  const { date, handleSelect, disabledDays } = useDatePickerWithRange(
    onChange,
    defaultValue,
    disablePastDates,
  );

  return (
    <div className="grid gap-2 overflow-auto">
      <div className="w-full p-1 bg-white rounded-md shadow-lg border">
        <Calendar
          initialFocus
          mode="range"
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={2}
          disabled={disabledDays}
        />
      </div>
    </div>
  );
};

export default DatePickerWithRange;
