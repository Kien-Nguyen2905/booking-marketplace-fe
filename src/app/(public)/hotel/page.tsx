import { HotelPage } from '@/features';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking',
  alternates: {
    canonical: '/hotel',
  },
};
export default function Page() {
  return <HotelPage />;
}
