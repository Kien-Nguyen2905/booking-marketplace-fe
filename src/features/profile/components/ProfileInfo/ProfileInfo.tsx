'use client';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  LoadingButton,
  RHFInput,
  RHFPickDate,
  RHFSelection,
} from '@/components';
import { BANK_ACCOUNT, GENDER_VALUE } from '@/constants';
import { useProfileInfo } from './useProfilePage';

const ProfileInfo = () => {
  const { form, handleUpdateProfile, isLoading } = useProfileInfo();
  return (
    <div className="p-4 lg:p-6 border-0 shadow-none">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateProfile)}
          className="space-y-6"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <RHFInput
                form={form}
                label="Full Name"
                name="fullName"
                required
                placeholder="Enter your full name"
                className="w-1/2"
              />
              <RHFInput
                form={form}
                label="Phone number"
                name="phoneNumber"
                placeholder="Enter your phone number"
                className="w-1/2"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <RHFSelection
                form={form}
                name="gender"
                label="Gender"
                placeholder="Select gender"
                list={GENDER_VALUE}
                className="w-1/2"
              />
              <RHFInput
                form={form}
                name="birthday"
                label="Birthday"
                required
                placeholder="Pick your birthday"
                className="w-1/2"
                renderProp={(props: any, field: any) => (
                  <RHFPickDate
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    field={field}
                    {...props}
                  />
                )}
              />
            </div>
            <div className="flex w-full gap-3 flex-col lg:flex-row items-start lg:gap-4">
              <RHFInput
                form={form}
                label="Account Number"
                name="accountNumber"
                placeholder="Enter your account number"
                className="w-full lg:w-1/3"
              />
              <RHFSelection
                form={form}
                name="bankAccount"
                label="Bank Account"
                placeholder="Select bank account"
                list={BANK_ACCOUNT}
                isSearch
                className="w-full lg:w-1/3"
              />
              <RHFInput
                form={form}
                label="Bank Name"
                name="bankName"
                placeholder="Enter your bank name"
                className="w-full lg:w-1/3"
              />
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
