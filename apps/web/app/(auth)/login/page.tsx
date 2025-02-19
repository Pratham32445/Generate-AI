"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { signIn } from "next-auth/react";
import React from "react";

const Login = () => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="flex w-full min-h-screen justify-center items-center">
        <div>
          <div className="flex gap-2">
            <Brain />
            <span className="text-xl font-semibold">Generate.AI</span>
          </div>
          <br />
          <Button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
          >
            Login With Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
