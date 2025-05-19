'use client';
import { Button } from '@/components/ui/button';
import { LoadingButton, RHFInput } from '@/components';
import { Form } from '@/components/ui/form';
import { useLogin } from '@/components/LoginModal/useLogin';

const LoginModal = () => {
  const { form, handleLogin, isLoading } = useLogin();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
        <RHFInput
          form={form}
          label="Email"
          name="email"
          placeholder="Enter your email"
        />
        <div className="relative">
          <RHFInput
            form={form}
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <Button
          disabled={isLoading}
          className="h-12 bg-primary relative w-full"
          type="submit"
        >
          {isLoading ? <LoadingButton /> : 'Login'}
        </Button>
      </form>
    </Form>
  );
};

export default LoginModal;
