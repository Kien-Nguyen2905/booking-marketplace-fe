import { Control } from 'react-hook-form';

export type TInputProps = {
  form: { control: Control<any> };
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  min?: number;
  renderProp?: any;
  component?: React.ReactNode;
};
