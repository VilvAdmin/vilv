import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { TopNav } from "./_components/TopNav";
import { SideNav, SideNavMobile } from "./_components/SideNav";

export const metadata: Metadata = {
  title: "FC Vilv Heverlee",
  description: "",
  icons: [{ rel: "icon", url: "/VilvLogo.png" }],
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="flex flex-col h-screen">
          <TopNav />
          <div className="hidden lg:flex flex-1">
            <SideNav />
            <main className="w-4/5 p-4 flex-1 flex-col">
            {children}
            </main>
          </div>
          <div className="flex lg:hidden flex-col">
            <SideNavMobile />
            <main className="w-full p-4 flex-1 flex-col">
            {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
