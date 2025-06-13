import '~/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { TopNav } from './_components/TopNav';
import { SideNav, SideNavMobile } from './_components/SideNav';

export const metadata: Metadata = {
  title: 'FC Vilv Heverlee',
  description: '',
  icons: [{ rel: 'icon', url: '/VilvLogo.png' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="flex h-screen flex-col">
          <TopNav />
          <div className="hidden flex-1 lg:flex">
            <SideNav />
            <main className="w-4/5 flex-1 flex-col p-4">{children}</main>
          </div>
          <div className="flex flex-col lg:hidden">
            <SideNavMobile />
            <main className="w-full flex-1 flex-col p-4">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
