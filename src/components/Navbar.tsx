import Link from "next/link";
import React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.action";
import { Layers } from "lucide-react";

const Navbar = async () => {
  const user = await currentUser();
  if (user) await syncUser();

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer select-none">
            <Layers
              size={32}
              className="text-orange-600 hover:text-orange-500 transition-colors duration-300"
            />
            <Link
              href="/"
              className="text-3xl font-extrabold font-sans tracking-widest uppercase text-transparent 
                         bg-gradient-to-br from-orange-500 to-orange-700 bg-clip-text 
                         hover:brightness-110 hover:scale-105 transition-all duration-300"
            >
              MIS APP
            </Link>
          </div>

          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
