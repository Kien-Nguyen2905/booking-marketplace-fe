import { DateRange } from 'react-day-picker';

export type TDatePickerWithRangeProps = {
  onChange?: (date: DateRange | undefined) => void;
  defaultValue?: DateRange;
  disablePastDates?: boolean; // if true, block dates before today
};
