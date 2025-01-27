import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "FC Vilv Heverlee",
  description: "",
  icons: [{ rel: "icon", url: "/VilvLogo.png" }],
};


function TopNav() {
  return (
    <nav className="flex items-center justify-between w-full text-center p-4 text-xl font-semibold px-16 ">
      <img src="./Vilv_no_bg.png"/>
      <div id="stats-container">
        <iframe src="https://www.vvdwprojects.be/vilv/data/stats-external-global.php" width="250" height="85" title="History" style={{border: "none"}}>
        </iframe>
      </div>
      <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </div>
    </nav>
  )
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
