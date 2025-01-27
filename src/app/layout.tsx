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
    <nav className="flex items-center justify-between w-full text-center p-1 md:p-2 lg:p-4 text-xl font-semibold lg:px-16 border-b border-vilvBlue">
      <img src="./Vilv_no_bg.png" alt="Logo Vilv"/>
      <div id="stats-container">
        <iframe src="https://www.vvdwprojects.be/vilv/data/stats-external-global.php" width="250" height="85" title="History" style={{border: "none"}}>
        </iframe>
      </div>
      <div>
      <SignedOut>
        <SignInButton>
          <button className="text-vilvBlue border-2 border-vilvBlue font-semibold py-2 px-4 rounded-lg">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </div>
    </nav>
  )
}

function SideNav() {
  return (
    <nav className="flex items-end flex-col w-1/4 p-4 text-lg border-r border-vilvBlue">
      <p className="text-vilvBlue font-semibold">De Club</p>
      <a href="/nieuws">Nieuws</a>
      <a href="/integriteit">Club-API</a>
      <a href="/locatie">Locatie</a>
      <a href="/historiek">Historiek</a>
      <a href="/sponsors">Sponsors</a>
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
          <div className="flex">
            <SideNav />
            <div className="w-3/4 p-4 flex flex-col">
            {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
