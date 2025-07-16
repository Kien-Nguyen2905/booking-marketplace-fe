import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';

export const useDatePickerWithRange = (
  onChange?: (date: DateRange | undefined) => void,
  defaultValue?: DateRange,
  disablePastDates = true,
) => {
  const [date, setDate] = useState<DateRange | undefined>(defaultValue);
  useEffect(() => {
    if (defaultValue) {
      setDate(defaultValue);
    } else {
      // no pre-selected range to allow picking any start date
      setDate(undefined);
    }
  }, [defaultValue]);
  // Configure disabled days based on prop
  const disabledDays = disablePastDates ? { before: new Date() } : undefined;

  const handleSelect = (selectedRange: DateRange | undefined) => {
    if (date?.from && date?.to) {
      if (
        selectedRange?.from &&
        selectedRange?.from.getTime() < date?.from.getTime()
      ) {
        setDate({ from: selectedRange?.from, to: undefined });
        onChange?.({ from: selectedRange?.from, to: undefined });
        return;
      }
      setDate({ from: selectedRange?.to, to: undefined });
      onChange?.({ from: selectedRange?.to, to: undefined });
      return;
    }
    setDate(selectedRange);
    onChange?.(selectedRange);
  };

  return {
    date,
    handleSelect,
    disabledDays,
  };
};
