'use client';

import React, { FC } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import InputOTPCustom from '@/components/InputOTPCustom/InputOTPCustom';
import { LoadingButton } from '@/components';
import { TOtpCardProps } from '@/components/OtpCard/type';

const OtpCard: FC<TOtpCardProps> = ({
  handleSubmit,
  title,
  subtitle,
  otpValue,
  handleOtpChange,
  error,
  isSubmitting,
  handleGoBack,
  children,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-lg border-0">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-4 p-3 bg-blue-50 rounded-full">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            {subtitle && <p className="text-gray-500 max-w-sm">{subtitle}</p>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <InputOTPCustom
                value={otpValue}
                onChange={handleOtpChange}
                error={error}
              />
            </motion.div>
            <div className="text-center">
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full h-12 relative"
                  disabled={isSubmitting || otpValue.length !== 6}
                >
                  {isSubmitting ? <LoadingButton /> : 'Verify'}
                </Button>
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
                  {children}
                </div>
              </div>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default OtpCard;
