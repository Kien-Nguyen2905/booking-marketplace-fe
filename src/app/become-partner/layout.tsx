import { BecomePartnerHeader } from '@/layouts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BecomePartnerHeader />
      <main>{children}</main>
    </>
  );
}
