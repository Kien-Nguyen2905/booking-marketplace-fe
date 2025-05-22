'use client';
import { Loading, LoadingButton, RHFInput } from '@/components';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useResetPasswordPage } from '@/features/reset-password/hooks';
import React from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { ArrowLeft, RotateCcw } from 'lucide-react';

const ResetPasswordPage = () => {
  const {
    form,
    time,
    handleChangePassword,
    handleSendOTP,
    isLoadingPassword,
    isLoadingOTP,
    handleGoBack,
    email,
  } = useResetPasswordPage();

  if (!email) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-lg border-0">
          <div className="flex flex-col items-center text-center mb-4">
            <div className="mb-4 p-3 bg-blue-50 rounded-full">
              <RotateCcw className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
            <p className="text-gray-500 max-w-sm">Reset your password</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleChangePassword)}
              className="space-y-8"
            >
              <RHFInput
                form={form}
                label="New Password"
                type="password"
                name="newPassword"
                placeholder="Enter your password"
              />
              <RHFInput
                form={form}
                label="Confirm New Password"
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm your password"
              />
              <RHFInput
                form={form}
                label="OTP Code"
                name="code"
                type="text"
                placeholder="Enter otp code"
              />
              <Button
                type="submit"
                disabled={isLoadingPassword}
                className="w-full h-12 relative"
              >
                {isLoadingPassword ? <LoadingButton /> : 'Reset Password'}
              </Button>
            </form>
          </Form>
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoBack}
              className="min-w-[110px] h-10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button
              onClick={handleSendOTP}
              type="button"
              className="min-w-[110px] h-10 relative"
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
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
