import { Control } from 'react-hook-form';

export type TInputProps = {
  form: { control: Control<any> };
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  classNameInput?: string;
  className?: string;
  disabled?: boolean;
  min?: number | string;
  renderProp?: any;
  component?: React.ReactNode;
  required?: boolean;
  onChange?: (value: string | number) => void;
};
