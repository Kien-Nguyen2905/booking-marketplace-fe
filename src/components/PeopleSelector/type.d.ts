// Define options for people selector
export type OptionType = {
  id: string;
  label: string;
  count: number;
  min: number;
  max: number;
  description?: string;
};

export type TPeopleSelectorProps = {
  options: OptionType[];
  onChange: (options: OptionType[]) => void;
  onDone: () => void;
  className?: string;
};
