'use client';
import { TAddressSelectionProps } from '@/components/AddressSelection/type';
import { RHFInput } from '@/components/RHFInput';
import { FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { FC } from 'react';
import { useAddressSelection } from '@/components/AddressSelection/useAddressSelection';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Check } from 'lucide-react';
import { RequiredField } from '@/components/RequiredField';

const AddressSelection: FC<TAddressSelectionProps> = ({
  form,
  disabled,
  required,
}) => {
  const {
    provinces,
    districts,
    wards,
    isLoadingProvinces,
    isLoadingDistricts,
    isLoadingWards,
    handleProvinceChange,
    handleDistrictChange,
    openProvince,
    openDistrict,
    openWard,
    handleOpenChangeProvince,
    handleOpenChangeDistrict,
    handleOpenChangeWard,
    handleWardChange,
  } = useAddressSelection(form);
  return (
    <div className="flex justify-between gap-4">
      <div className="w-1/3">
        <RHFInput
          form={form}
          label="Province"
          name="provinceCode"
          placeholder="Select province"
          disabled={disabled || isLoadingProvinces}
          renderProp={(props: any, field: any) => {
            return (
              <>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  Province
                  {required && <RequiredField required />}
                </FormLabel>
                <div className="w-full">
                  <Select
                    value={field.value}
                    {...props}
                    open={openProvince}
                    onOpenChange={handleOpenChangeProvince}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-12!">
                        {field.value && provinces.length > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-black">
                              {
                                provinces.find((p) => p.value === field.value)
                                  ?.label
                              }
                            </span>
                          </div>
                        ) : (
                          <SelectValue placeholder="Select province" />
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <Command>
                        <CommandInput placeholder="Search..." className="h-9" />
                        <CommandList className="max-h-[200px] overflow-auto">
                          <CommandEmpty>No result found</CommandEmpty>
                          <CommandGroup>
                            {provinces?.map((item) => (
                              <CommandItem
                                key={item.value}
                                value={item.label.toString()}
                                disabled={item.value === field.value}
                                onSelect={() => {
                                  field?.onChange(item.value);
                                  handleProvinceChange(item.value.toString());
                                }}
                                className="flex items-center justify-between cursor-pointer"
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
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </>
            );
          }}
        />
      </div>
      <div className="w-1/3">
        <RHFInput
          form={form}
          label="District"
          name="districtCode"
          required
          placeholder="Select district"
          disabled={
            disabled || isLoadingDistricts || !form.watch('provinceCode')
          }
          renderProp={(props: any, field: any) => {
            return (
              <>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  District
                  {required && <RequiredField required />}
                </FormLabel>
                <div className="w-full">
                  <Select
                    {...props}
                    value={field.value}
                    open={openDistrict}
                    onOpenChange={handleOpenChangeDistrict}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-12!">
                        {field.value && districts.length > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-black">
                              {districts.find((d) => d.value === field.value)
                                ?.label || ''}
                            </span>
                          </div>
                        ) : (
                          <SelectValue placeholder="Select district" />
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <Command>
                        <CommandInput placeholder="Search..." className="h-9" />
                        <CommandList className="max-h-[200px] overflow-auto">
                          <CommandEmpty>No result found</CommandEmpty>
                          <CommandGroup>
                            {districts?.map((item) => (
                              <CommandItem
                                key={item.value}
                                value={item.label.toString()}
                                disabled={item.value === field.value}
                                onSelect={() => {
                                  field?.onChange(item.value);
                                  handleDistrictChange(item.value.toString());
                                }}
                                className="flex items-center justify-between cursor-pointer"
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
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </>
            );
          }}
        />
      </div>
      <div className="w-1/3">
        <RHFInput
          form={form}
          label="Ward"
          name="wardCode"
          required
          placeholder="Select ward"
          disabled={disabled || isLoadingWards || !form.watch('districtCode')}
          renderProp={(props: any, field: any) => {
            return (
              <>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  Ward
                  {required && <RequiredField required />}
                </FormLabel>
                <div className="w-full">
                  <Select
                    value={field.value}
                    {...props}
                    open={openWard}
                    onOpenChange={handleOpenChangeWard}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-12!">
                        {field.value && wards.length > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-black">
                              {wards.find((w) => w.value === field.value)
                                ?.label || ''}
                            </span>
                          </div>
                        ) : (
                          <SelectValue placeholder="Select ward" />
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <Command>
                        <CommandInput placeholder="Search..." className="h-9" />
                        <CommandList className="max-h-[200px] overflow-auto">
                          <CommandEmpty>No result found</CommandEmpty>
                          <CommandGroup>
                            {wards?.map((item) => (
                              <CommandItem
                                key={item.value}
                                value={item.label.toString()}
                                disabled={item.value === field.value}
                                onSelect={() => {
                                  field?.onChange(item.value);
                                  handleWardChange();
                                }}
                                className="flex items-center justify-between cursor-pointer"
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
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </>
            );
          }}
        />
      </div>
    </div>
  );
};

export default AddressSelection;
