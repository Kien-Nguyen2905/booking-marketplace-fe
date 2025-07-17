'use client';

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
    isVerifying,
    isSending,
    time,
  } = useTwoFactorAuthPage();

  return (
    <OtpCard
      title="Verify 2FA"
      subtitle="Enter the 6-digit code from 2FA app"
      otpValue={otpValue}
      handleOtpChange={handleOtpChange}
      error={error}
      isSubmitting={isVerifying}
      handleGoBack={handleGoBack}
      handleSubmit={handleSubmit}
    >
      <Button
        onClick={handleForgot2FA}
        type="button"
        disabled={isSending || time > 0}
        className="min-w-[110px] h-10 relative"
      >
        {isSending ? (
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
