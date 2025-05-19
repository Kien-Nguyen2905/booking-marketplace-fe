'use client';

import { useForgotPassword } from '@/components/ForgotPassword/useChangePassword';
import { LoadingButton } from '@/components/LoadingButton';
import { RHFInput } from '@/components/RHFInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import React from 'react';

const ForgotPassword = () => {
  const { form, handleSendOTP, isLoadingOTP } = useForgotPassword();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSendOTP)} className="space-y-5">
        <RHFInput
          form={form}
          label="Email"
          name="email"
          placeholder="Enter your email"
        />
        <Button
          type="submit"
          disabled={isLoadingOTP}
          className="w-full h-12 bg-primary relative"
        >
          {isLoadingOTP ? <LoadingButton /> : 'Verify'}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPassword;
