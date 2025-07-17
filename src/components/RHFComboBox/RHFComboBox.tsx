'use client';
import { RHFInput } from '@/components/RHFInput';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronDown } from 'lucide-react';
import { FC } from 'react';
import { TRHFComboBoxProps } from './type';
import { useRHFComboBox } from '@/components/RHFComboBox/useRHFComboBox';
import { RequiredField } from '@/components/RequiredField';

const RHFComboBox: FC<TRHFComboBoxProps> = ({
  form,
  name,
  label,
  required,
  placeholder,
  list,
  className,
}) => {
  const { open, setOpen, handleOpenChange } = useRHFComboBox();
  return (
    <RHFInput
      form={form}
      name={name}
      className={className}
      renderProp={(props: any, field: any) => {
        return (
          <div className="grid gap-1">
            <FormLabel
              className="block text-sm font-medium text-gray-700"
              htmlFor={name}
            >
              {label}
              <RequiredField required={required} />
            </FormLabel>
            <Popover open={open} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full h-12 justify-between font-normal bg-white"
                    {...props}
                  >
                    {field.value ? (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{field.value}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        {placeholder}
                      </span>
                    )}
                    <ChevronDown
                      size={24}
                      className="shrink-0 size-4 opacity-50 text-[var(--muted-foreground)]"
                    />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search..." className="h-9" />
                  <CommandList className="max-h-[200px] overflow-auto">
                    <CommandEmpty>No bank found</CommandEmpty>
                    <CommandGroup>
                      {list.map((item) => (
                        <CommandItem
                          key={item.value}
                          value={item.value}
                          disabled={item.value === field.value}
                          onSelect={() => {
                            field?.onChange(item.value);
                            setOpen(false);
                          }}
                          className="flex items-center justify-between"
                        >
                          <span>{item.label}</span>
                          {item.value === field.value && (
                            <Check className="h-4 w-4" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </div>
        );
      }}
    />
  );
};

export default RHFComboBox;
