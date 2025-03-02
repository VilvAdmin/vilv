import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

export function TopNav() {
    return (
      <nav className="flex items-center justify-between w-full text-center p-1 md:p-2 lg:p-4 text-xl font-semibold lg:px-16 border-b border-vilvBlue">
        <img src="/Vilv_no_bg.png" alt="Logo Vilv" className="hidden md:block object-contain"/>
        <img src="/VilvLogo.png" alt="Logo Vilv" className="block md:hidden object-contain"/>
        <div id="stats-container">
          <iframe src="https://www.vvdwprojects.be/vilv/data/stats-external-global.php" className="relative -left-4" width="220 md:250" height="85" title="History" style={{border: "none"}}>
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