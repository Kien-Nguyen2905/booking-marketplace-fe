'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoadingButton, RHFInput } from '@/components';
import { useProfileSecurity } from './useProfileSecurity';

const ProfileSecurity = () => {
  const { form, handleChangePassword, isLoading } = useProfileSecurity();
  return (
    <div className="p-4 lg:p-6 border-0 shadow-none">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleChangePassword)}
          className="space-y-6"
        >
          <div className="grid gap-6">
            <RHFInput
              form={form}
              label="Current Password"
              name="password"
              type="password"
              placeholder="Enter your current password"
            />
            <div className="flex items-start justify-between gap-4">
              <div className="w-1/2">
                <RHFInput
                  form={form}
                  label="New Password"
                  name="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                />
              </div>
              <div className="w-1/2">
                <RHFInput
                  form={form}
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  type="password"
                  placeholder="Confirm your new password"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              disabled={isLoading}
              className="min-w-[110px] h-10 relative"
              type="submit"
            >
              {isLoading ? <LoadingButton /> : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileSecurity;
