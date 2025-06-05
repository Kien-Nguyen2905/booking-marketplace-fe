import { LocationType } from '@/components/LocationSelector/type';
import { OptionType } from '@/components/PeopleSelector/type';
import { DateRange } from 'react-day-picker';

export type TTab = {
  id: string;
  label: string;
  icon?: React.ElementType;
  badge?: string;
};

export type TSearchFormValues = {
  location?: LocationType;
  dateRange?: DateRange;
  people?: OptionType[];
};

export type TSearchBannerProps = {
  onSearch?: (values: SearchFormValues) => void;
};
