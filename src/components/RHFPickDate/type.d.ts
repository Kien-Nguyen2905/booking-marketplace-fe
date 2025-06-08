export type TRHFPickDateProps = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  field: any;
  disabled?: (date: Date) => boolean;
  disabledInput?: boolean;
  className?: string;
  onChange?: (value: Date | undefined) => void;
  fromYear?: number;
  toYear?: number;
};
