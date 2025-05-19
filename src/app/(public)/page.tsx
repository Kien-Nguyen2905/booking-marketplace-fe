import { HomePage } from '@/features';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking',
  alternates: {
    canonical: '/',
  },
};
export default function Page() {
  return <HomePage />;
}
