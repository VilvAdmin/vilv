import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { TopNav } from "./_components/TopNav";
import { SideNav } from "./_components/SideNav";

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
        <body>
          <TopNav />
          <div className="flex">
            <SideNav />
            <div className="w-4/5 p-4 flex flex-col">
            {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
