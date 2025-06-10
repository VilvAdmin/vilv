import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b border-vilvBlue px-4 py-1 text-center text-xl font-semibold md:py-2 lg:px-16 lg:py-4">
      <a href="/">
        <img src="/Vilv_no_bg.png" alt="Logo Vilv" className="hidden object-contain md:block" />
      </a>
      <a href="/">
        <img src="/VilvLogo.png" alt="Logo Vilv" className="block object-contain md:hidden" />
      </a>
      <div id="stats-container">
        <iframe
          src="https://www.vvdwprojects.be/vilv/data/stats-external-global.php"
          className="relative -left-4"
          width="220 md:250"
          height="85"
          title="History"
          style={{ border: 'none' }}
        ></iframe>
      </div>
      <div>
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
