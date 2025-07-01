'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React, { FC } from 'react';
import { TPartnerFormProps } from './type';
import {
  AddressSelection,
  LoadingButton,
  RHFInput,
  RHFPickDate,
  RHFSelection,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { BANK_ACCOUNT, GENDER_VALUE } from '@/constants';

const PartnerForm: FC<TPartnerFormProps> = ({
  open,
  onClose,
  form,
  onSubmit,
  isSubmitting,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Partner Information</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
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
                  label="Email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-1/2"
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
                  name="birthday"
                  label="Birthday"
                  required
                  placeholder="Pick your birthday"
                  className="w-1/3"
                  renderProp={(props: any, field: any) => (
                    <RHFPickDate
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      field={field}
                      {...props}
                    />
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
                disabled={isSubmitting}
                className="min-w-[120px] h-12 relative"
              >
                {isSubmitting ? <LoadingButton /> : 'Update'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerForm;
