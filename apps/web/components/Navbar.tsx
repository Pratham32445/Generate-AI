"use client";
import React from "react";
import { Button } from "./ui/button";
import { Brain } from "lucide-react";
import { DarkModeToggle } from "./Darkmodetoggle";
import Link from "next/link";
import { useSession } from "next-auth/react";
const Navbar = () => {
  const { data } = useSession();
  return (
    <nav className="absolute w-full container mx-auto flex items-center justify-between px-4 py-6">
      <Link href={"/"}>
        <div className="flex items-center gap-2 opacity-0 animate-fade-left [animation-delay:200ms]">
          <Brain />
          <span className="text-xl font-semibold">Generate.AI</span>
        </div>
      </Link>

      <div className="hidden items-center gap-8 opacity-0 animate-fade-in [animation-delay:400ms] md:flex">
        <Link href="#" className="text-sm hover:text-gray-600">
          How it works?
        </Link>
        <Link href="#" className="text-sm hover:text-gray-600">
          Features
        </Link>
        <Link href="/pricing" className="text-sm hover:text-gray-600">
          Pricing
        </Link>
        <Link href="#" className="text-sm hover:text-gray-600">
          Contact
        </Link>
      </div>

      <div className="flex items-center gap-4 opacity-0 animate-fade-left [animation-delay:600ms]">
        {!data ? (
          <Link href={"/login"}>
            <Button variant="ghost" className="hidden md:inline-flex">
              Login
            </Button>
          </Link>
        ) : (
          data &&
          data.user && (
            <Link href={"/dashboard"}>
              <Button className="bg-black text-white hover:bg-black/90">
                Dashboard
              </Button>
            </Link>
          )
        )}
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
