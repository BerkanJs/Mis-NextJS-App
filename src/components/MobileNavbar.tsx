"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex md:hidden items-center space-x-2">
      {/* Tema Butonu */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2 text-[#0A1D37]"
      >
        <SunIcon className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Menü */}
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-[#0A1D37]">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[300px] bg-gradient-to-b from-[#0A1D37] to-[#FF8500] text-white"
        >
          <SheetHeader>
            <SheetTitle className="text-white text-xl font-bold tracking-wide">
              Menü
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start text-white hover:bg-white/10 rounded-lg"
              asChild
            >
              <Link href="/">
                <HomeIcon className="w-5 h-5" />
                Ana Sayfa
              </Link>
            </Button>

            {isSignedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start text-white hover:bg-white/10 rounded-lg"
                  asChild
                >
                  <Link href="/notifications">
                    <BellIcon className="w-5 h-5" />
                    Bildirimler
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start text-white hover:bg-white/10 rounded-lg"
                  asChild
                >
                  <Link href="/profile">
                    <UserIcon className="w-5 h-5" />
                    Profil
                  </Link>
                </Button>
                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start w-full text-white hover:bg-white/10 rounded-lg"
                  >
                    <LogOutIcon className="w-5 h-5" />
                    Çıkış Yap
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button className="w-full bg-white text-[#0A1D37] font-semibold hover:bg-yellow-300">
                  Giriş Yap
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
