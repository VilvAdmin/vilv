import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b border-vilvBlue px-4 py-1 text-center text-xl font-semibold md:py-2 lg:px-16 lg:py-4">
      <Link href="/">
        <img src="/Vilv_no_bg.png" alt="Logo Vilv" className="hidden object-contain md:block" />
      </Link>
      <Link href="/">
        <img src="/VilvLogo.png" alt="Logo Vilv" className="block object-contain md:hidden" />
      </Link>
      <div id="stats-container" className="flex flex-grow justify-center">
        <iframe
          src="https://www.vvdwprojects.be/vilv/data/stats-external-global.php"
          className="relative -left-4"
          width="220 md:250"
          height="85"
          title="History"
          style={{ border: 'none' }}
        ></iframe>
      </div>
      <div className="flex items-center justify-center">
        <SignedOut>
          <SignInButton>
            <button className="rounded-lg border-2 border-vilvBlue px-4 py-2 font-semibold text-vilvBlue">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
