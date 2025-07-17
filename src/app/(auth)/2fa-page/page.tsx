import { TwoFactorAuthPage } from '@/features';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Two-Factor Authentication',
  alternates: {
    canonical: '/2fa-page',
  },
};

const Page = () => {
  return <TwoFactorAuthPage />;
};

export default Page;
