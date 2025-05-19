'use client';
import { TInputOTPCustomProps } from '@/components/InputOTPCustom/type';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import React, { FC, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const InputOTPCustom: FC<TInputOTPCustomProps> = ({
  value,
  onChange,
  error,
  className,
}) => {
  // Add auto-focus to the first input on component mount
  useEffect(() => {
    // Use a small delay to ensure the DOM is fully rendered
    const timer = setTimeout(() => {
      const input = document.querySelector('input') as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={cn('space-y-3', className)}>
      <InputOTP
        maxLength={6}
        value={value}
        onChange={onChange}
        containerClassName="gap-3 justify-center"
        className="w-12 h-14 text-center text-xl font-semibold"
      >
        <InputOTPGroup className="flex items-center gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
            >
              <InputOTPSlot index={i} className="h-12 w-12" />
            </motion.div>
          ))}
        </InputOTPGroup>
      </InputOTP>
      {error && (
        <p className="text-sm mx-auto max-w-fit font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputOTPCustom;
