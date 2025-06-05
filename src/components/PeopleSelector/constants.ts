import { OptionType } from './type.d';

export const PEOPLE_SELECTOR_OPTIONS: Readonly<Omit<OptionType, 'count'>[]> = [
  {
    id: 'adults',
    label: 'Adult',
    min: 1,
    max: 30,
    description: 'Ages 18+',
  },
  {
    id: 'children',
    label: 'Child',
    min: 0,
    max: 30,
    description: 'Ages 1-12',
  },
  {
    id: 'rooms',
    label: 'Room',
    min: 1,
    max: 30,
  },
] as const;

export const DEFAULT_PEOPLE_COUNT = {
  adults: 1,
  children: 0,
  rooms: 1,
} as const;
