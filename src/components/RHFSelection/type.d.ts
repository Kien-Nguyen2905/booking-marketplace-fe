export type TRHFSelectionProps = {
  form: any;
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  list: { value: string; label: string }[];
  className?: string;
  isSearch?: boolean;
  disabled?: boolean;
};
