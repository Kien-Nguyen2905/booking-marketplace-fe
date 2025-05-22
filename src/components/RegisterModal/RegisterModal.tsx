'use client';

import { LoadingButton } from '@/components/LoadingButton';
import { useRegister } from '@/components/RegisterModal/useRegister';
import { RHFInput } from '@/components/RHFInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const RegisterModal = () => {
  const {
    form,
    time,
    handleRegister,
    handleSendOTP,
    isLoadingRegister,
    isLoadingOTP,
  } = useRegister();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-5">
        <RHFInput
          form={form}
          label="Email"
          name="email"
          placeholder="Enter your email"
        />
        <div className="flex flex-col md:flex-row w-full gap-[30px]">
          <div className="relative md:w-1/2">
            <RHFInput
              form={form}
              label="Password"
              type={'password'}
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="relative md:w-1/2">
            <RHFInput
              form={form}
              label="Confirm Password"
              type={'password'}
              name="confirmPassword"
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="flex-1 w-full">
            <RHFInput
              form={form}
              label="OTP"
              name="code"
              type="text"
              placeholder="Enter otp code"
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
        </div>

        <Button
          type="submit"
          disabled={isLoadingRegister}
          className="w-full h-12 relative"
        >
          {isLoadingRegister ? <LoadingButton /> : 'Register'}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterModal;
