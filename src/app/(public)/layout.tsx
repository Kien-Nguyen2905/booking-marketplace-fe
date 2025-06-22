import { Chatbot, Footer, Header } from '@/layouts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Chatbot />
      <Footer />
    </>
  );
}
