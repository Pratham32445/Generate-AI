"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const Signout = () => {
  return (
    <div>
      <Button
        className="bg-[#DEFF00] w-full"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Logout
      </Button>
    </div>
  );
};

export default Signout;
