import { MainNav } from '@/src/components/main-nav';
import { Toaster } from '@/src/components/ui/toaster';
import '@/src/styles/globals.css';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import Footer from '../components/footer';
import './globals.css';
import { Providers } from './providers';

const robotoSans = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  weight: ['300', '400', '500', '700'],
});
export const metadata: Metadata = {
  title: 'Work Hive - Job Portal',
  description: 'Find your next career opportunity',
  keywords: ['jobs', 'career', 'employment', 'job portal'],
  authors: [{ name: 'Job Portal Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${robotoSans.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <MainNav />
            <main className="container mx-auto px-3 md:px-0 lg:px-0">
              {children}
            </main>
            <Footer />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
