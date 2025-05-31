'use client';
import {
  AddressSelection,
  Loading,
  LoadingButton,
  RHFInput,
  RHFPickDate,
  RHFSelection,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { BANK_ACCOUNT, GENDER_VALUE } from '@/constants';
import React, { FC } from 'react';
import { usePartnerInformation } from '@/components/PartnerInformation/usePartnerInformation';
import { TPartnerInformationProps } from '@/components/PartnerInformation/type';
const PartnerInformation: FC<TPartnerInformationProps> = ({ partner }) => {
  const {
    form,
    handleCreatePartner,
    isLoading,
    handleSendOTP,
    time,
    isLoadingOTP,
    handleUpdatePartner,
    isLoadingUpdate,
    isLoadingNavigate,
  } = usePartnerInformation({
    partner,
  });
  if (isLoadingNavigate) return <Loading />;
  return (
    <div>
      <Card className="border-0 shadow-none">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                partner ? handleUpdatePartner : handleCreatePartner,
                (errors) => console.log('Form validation errors:', errors),
              )}
              className="space-y-6"
            >
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <RHFInput
                    form={form}
                    label="Full Name"
                    name="fullName"
                    required
                    placeholder="Enter your full name"
                    className="w-1/3"
                  />
                  <RHFInput
                    form={form}
                    label="Email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="w-1/3"
                  />
                  <RHFInput
                    form={form}
                    label="OTP"
                    name="code"
                    type="text"
                    required
                    placeholder="Enter otp code"
                    className="w-1/3"
                    component={
                      <Button
                        onClick={handleSendOTP}
                        type="button"
                        className="min-w-[100px] h-12 relative"
                        disabled={isLoadingOTP || time > 0}
                      >
                        {isLoadingOTP ? (
                          <LoadingButton />
                        ) : time > 0 ? (
                          `Send OTP ${time}s`
                        ) : (
                          'Send OTP'
                        )}
                      </Button>
                    }
                  />
                </div>
                <div className="flex items-start gap-4">
                  <RHFInput
                    form={form}
                    label="Phone number"
                    name="phoneNumber"
                    required
                    placeholder="Enter your phone number"
                    className="w-1/3"
                  />
                  <RHFInput
                    form={form}
                    name="birth"
                    label="Birthday"
                    required
                    placeholder="Pick your birthday"
                    className="w-1/3"
                    renderProp={(props: any, field: any) => (
                      <RHFPickDate field={field} {...props} />
                    )}
                  />
                  <RHFSelection
                    form={form}
                    name="gender"
                    label="Gender"
                    required
                    placeholder="Select gender"
                    list={GENDER_VALUE}
                    className="w-1/3"
                  />
                </div>
                <div className="flex items-start gap-4">
                  <RHFInput
                    form={form}
                    label="ID Card"
                    name="idCard"
                    required
                    placeholder="Enter your ID card"
                    className="w-1/2"
                  />
                  <RHFInput
                    form={form}
                    label="Company Name"
                    name="companyName"
                    placeholder="Enter your company name"
                    className="w-1/2"
                  />
                </div>
                <div className="flex items-start gap-4">
                  <RHFInput
                    form={form}
                    label="Account Number"
                    name="accountNumber"
                    required
                    placeholder="Enter your account number"
                    className="w-1/3"
                  />
                  <RHFSelection
                    form={form}
                    name="bankAccount"
                    label="Bank Account"
                    required
                    placeholder="Select bank account"
                    list={BANK_ACCOUNT}
                    isSearch
                    className="w-1/3"
                  />
                  <RHFInput
                    form={form}
                    label="Bank Name"
                    name="bankName"
                    required
                    placeholder="Enter your bank name"
                    className="w-1/3"
                  />
                </div>
                <RHFInput
                  form={form}
                  label="Address"
                  name="address"
                  required
                  placeholder="Enter your address"
                />
                <AddressSelection form={form} />
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={isLoading || isLoadingUpdate}
                  className="min-w-[120px] h-12 relative"
                >
                  {isLoading || isLoadingUpdate ? (
                    <LoadingButton />
                  ) : partner ? (
                    'Update'
                  ) : (
                    'Save'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerInformation;
