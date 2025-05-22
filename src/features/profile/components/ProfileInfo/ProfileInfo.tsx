'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LoadingButton, RHFInput } from '@/components';
import { Label } from '@/components/ui/label';
import { BANK_ACCOUNT, GENDER_VALUE } from '@/constants';
import { useProfileInfo } from './useProfilePage';

const ProfileInfo = () => {
  const { form, handleUpdateProfile, isLoading } = useProfileInfo();
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="p-4 lg:p-6 border-0 shadow-none">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateProfile)}
          className="space-y-6"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <div className="w-1/2">
                <RHFInput
                  form={form}
                  label="Full Name"
                  name="fullName"
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="w-1/2">
                <RHFInput
                  form={form}
                  label="Phone number"
                  name="phoneNumber"
                  required
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="w-1/2">
                <RHFInput
                  form={form}
                  label="Gender"
                  name="gender"
                  placeholder="Enter your gender"
                  renderProp={(props: any, field: any) => (
                    <>
                      <Label htmlFor="gender">Gender</Label>
                      <div className="w-full">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          {...props}
                        >
                          <FormControl>
                            <SelectTrigger className="border-slate-200 w-full h-12! focus:ring-[var(--brand)]/30">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {GENDER_VALUE.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value}
                                disabled={item.value === field.value}
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </>
                  )}
                />
              </div>
              <div className="w-1/2">
                <RHFInput
                  form={form}
                  label="Birthday"
                  name="birthday"
                  placeholder="Enter your birthday"
                  renderProp={(props: any, field: any) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-slate-700">Birthday</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild className="h-12!">
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-slate-500',
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'dd/MM/yyyy')
                              ) : (
                                <span>Pick a birthday</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                            captionLayout="dropdown-buttons"
                            fromYear={1900}
                            toYear={2025}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="w-1/3">
                <RHFInput
                  form={form}
                  label="Account Number"
                  name="accountNumber"
                  placeholder="Enter your account number"
                  type="number"
                />
              </div>
              <div className="w-1/3">
                <RHFInput
                  form={form}
                  name="bankAccount"
                  renderProp={(props: any, field: any) => {
                    const filteredBankAccounts = BANK_ACCOUNT.filter((item) =>
                      item.label
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
                    );
                    return (
                      <>
                        <Label>Bank Account</Label>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          {...props}
                          onOpenChange={(open) => {
                            if (!open) setSearchTerm('');
                          }}
                        >
                          <FormControl>
                            <SelectTrigger className="border-slate-200 w-full h-12! focus:ring-[var(--brand)]/30">
                              {field.value ? (
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {field.value}
                                  </span>
                                </div>
                              ) : (
                                <SelectValue placeholder="Select bank account" />
                              )}
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <div className="px-2 py-2">
                              <Input
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-8 border-slate-200"
                                onKeyDown={(e) => {
                                  e.stopPropagation();
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                autoComplete="off"
                              />
                            </div>
                            <div className="max-h-[200px] overflow-auto">
                              {filteredBankAccounts.length > 0 ? (
                                filteredBankAccounts.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                    disabled={item.value === field.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))
                              ) : (
                                <div className="p-2 text-center text-sm text-slate-500">
                                  No banks found
                                </div>
                              )}
                            </div>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </>
                    );
                  }}
                />
              </div>
              <div className="w-1/3">
                <RHFInput
                  form={form}
                  label="Bank Name"
                  name="bankName"
                  placeholder="Enter your bank name"
                />
              </div>
            </div>
            <RHFInput
              form={form}
              label="Address"
              name="address"
              placeholder="Enter your address"
            />
          </div>
          <div className="flex justify-end">
            <Button
              disabled={isLoading}
              className="min-w-[110px] h-10 relative"
              type="submit"
            >
              {isLoading ? <LoadingButton /> : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default ProfileInfo;
