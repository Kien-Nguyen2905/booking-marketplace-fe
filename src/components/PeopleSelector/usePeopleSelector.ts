import { OptionType } from '@/components/PeopleSelector/type';

export const usePeopleSelector = (
  initialOptions: OptionType[],
  onChange: (options: OptionType[]) => void,
  onDone: () => void,
) => {
  const handleIncrement = (id: string) => {
    const newOptions = initialOptions.map((option) => {
      if (option.id === id && option.count < option.max) {
        return { ...option, count: option.count + 1 };
      }
      return option;
    });
    onChange(newOptions);
  };
  const handleDecrement = (id: string) => {
    const newOptions = initialOptions.map((option) => {
      if (option.id === id && option.count > option.min) {
        return { ...option, count: option.count - 1 };
      }
      return option;
    });
    onChange(newOptions);
  };
  const handleDone = () => {
    if (onDone) {
      onDone();
    }
  };
  return {
    handleIncrement,
    handleDecrement,
    handleDone,
  };
};
