import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import NextTopLoader from 'nextjs-toploader';
import { QueryClientWrapper } from '@/queries';
import { AppProvider } from '@/context';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Booking',
  description: 'Booking Website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader color={'var(--blue-primary)'} showSpinner={false} />
        <QueryClientWrapper>
          <AppProvider>
            <ToastContainer />
            {children}
          </AppProvider>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
