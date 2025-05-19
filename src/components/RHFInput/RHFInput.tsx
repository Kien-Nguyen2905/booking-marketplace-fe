'use client';
import { TInputProps } from '@/components/RHFInput/tying';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { FC, useState } from 'react';

const RHFInput: FC<TInputProps> = ({
  form,
  label,
  name,
  type = 'text',
  className = '',
  renderProp,
  component,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {renderProp ? (
            renderProp(props, field)
          ) : (
            <div className="grid gap-1">
              <Label
                className="block text-sm font-medium text-gray-700"
                htmlFor={name}
              >
                {label}
              </Label>
              <div className="relative flex items-center gap-[30px]">
                <Input
                  id={name}
                  type={
                    type !== 'password'
                      ? type
                      : showPassword
                      ? 'text'
                      : 'password'
                  }
                  className={`w-full ${
                    type === 'password' && 'pr-9'
                  }  h-12 rounded-lg ${className}`}
                  {...field}
                  {...props}
                />
                {component}
                <button
                  type="button"
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 ${
                    type !== 'password' && 'hidden'
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
