import { GridIcon, BellIcon, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import { currentUser } from "@clerk/nextjs/server";

async function DesktopNavbar() {
  const user = await currentUser();

  const orangeColor = "#FF6A00"; // Turuncu tonu

  return (
    <div className="hidden md:flex items-center  space-x-6 px-6 py-3 ">
      <ModeToggle />

      {/* Home */}
      <Button
        variant="ghost"
        asChild
        className="flex items-center gap-2 text-orange-500 hover:text-orange-600 hover:tracking-widest transition-all duration-300 rounded-md px-3 py-2 font-semibold"
      >
        <Link href="/">
          <GridIcon className="w-5 h-5" stroke={orangeColor} />
          <span className="hidden lg:inline">Ana Sayfa</span>
        </Link>
      </Button>

      {user ? (
        <>
          {/* Notifications */}
          <Button
            variant="ghost"
            asChild
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 hover:tracking-widest transition-all duration-300 rounded-md px-3 py-2 font-semibold"
          >
            <Link href="/notifications">
              <BellIcon className="w-5 h-5" stroke={orangeColor} />
              <span className="hidden lg:inline">Bildirimler</span>
            </Link>
          </Button>

          {/* Profile */}
          <Button
            variant="ghost"
            asChild
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 hover:tracking-widest transition-all duration-300 rounded-md px-3 py-2 font-semibold"
          >
            <Link
              href={`/profile/${
                user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <User2Icon className="w-5 h-5" stroke={orangeColor} />
              <span className="hidden lg:inline">Profil</span>
            </Link>
          </Button>

          {/* User Avatar */}
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "ring-2 ring-orange-500 hover:ring-white transition",
              },
            }}
          />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button
            variant="default"
            className="bg-orange-600 text-white font-semibold tracking-wide hover:bg-orange-700 transition-colors"
          >
            Giriş Yap
          </Button>
        </SignInButton>
      )}
    </div>
  );
}

export default DesktopNavbar;
