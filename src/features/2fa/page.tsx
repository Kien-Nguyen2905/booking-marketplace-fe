'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { LoadingButton, OtpCard } from '@/components';
import { useTwoFactorAuthPage } from '@/features/2fa/hooks';

const TwoFactorAuthPage = () => {
  const {
    otpValue,
    error,
    handleOtpChange,
    handleSubmit,
    handleGoBack,
    handleForgot2FA,
    isSubmitting,
    isForgot2FA,
    time,
  } = useTwoFactorAuthPage();

  return (
    <OtpCard
      title="Verify OTP"
      subtitle="Enter the 6-digit code from your email"
      otpValue={otpValue}
      handleOtpChange={handleOtpChange}
      error={error}
      isSubmitting={isSubmitting}
      handleGoBack={handleGoBack}
      handleSubmit={handleSubmit}
    >
      <Button
        onClick={handleForgot2FA}
        type="button"
        disabled={isForgot2FA || time > 0}
        className="min-w-[110px] h-10 relative"
      >
        {isForgot2FA ? (
          <LoadingButton />
        ) : time > 0 ? (
          `Forgot 2FA ${time}s`
        ) : (
          'Forgot 2FA'
        )}
      </Button>
    </OtpCard>
  );
};

export default TwoFactorAuthPage;
