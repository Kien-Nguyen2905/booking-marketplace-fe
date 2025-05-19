import { ResetPasswordPage } from '@/features';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  alternates: {
    canonical: '/reset-password',
  },
};
const Page = () => {
  return <ResetPasswordPage />;
};

export default Page;
