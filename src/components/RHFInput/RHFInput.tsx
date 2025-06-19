'use client';
import { RequiredField } from '@/components/RequiredField';
import { TInputProps } from '@/components/RHFInput/type';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { FC, useState } from 'react';

const RHFInput: FC<TInputProps> = ({
  form,
  type = 'text',
  classNameInput = '',
  className = '',
  renderProp,
  component,
  onChange,
  required,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={className}>
          {renderProp ? (
            renderProp(props, field)
          ) : (
            <div className={`grid ${props.label ? 'gap-1' : ''}`}>
              {props.label && (
                <FormLabel
                  className="block text-sm font-medium text-gray-700"
                  htmlFor={props.name}
                >
                  {props.label}
                  <RequiredField required={required} />
                </FormLabel>
              )}
              <div className="relative flex items-center gap-4">
                <FormControl>
                  <Input
                    id={props.name}
                    type={
                      type !== 'password'
                        ? type
                        : showPassword
                        ? 'text'
                        : 'password'
                    }
                    className={`w-full ${
                      type === 'password' && 'pr-9'
                    }  h-12 rounded-lg ${classNameInput}`}
                    {...field}
                    {...props}
                    onChange={(e) => {
                      const value =
                        type === 'number'
                          ? e.target.valueAsNumber
                          : e.target.value;
                      field.onChange(value);
                      if (onChange) {
                        onChange(value);
                      }
                    }}
                  />
                </FormControl>
                {component}
                <button
                  type="button"
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 ${
                    type !== 'password' && 'hidden'
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              <FormMessage />
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default RHFInput;
