"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSession } from "next-auth/react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const ModelData = [
  {
    title: "Generate Image",
    description: "total cost to Generate a Image",
    price: "$0.4",
    free: false,
  },
  {
    title: "Train Model",
    description: "total cost to Train a Image",
    price: "$4.0",
    free: false,
  },
  {
    title: "Download Image",
    description: "total cost to download a Image",
    free: true,
  },
];

const AddCredit = () => {
  const [user, setUser] = useState<{ credits: number } | null>(null);
  const IMAGE_GENERATE_COST = 0.4;

  useEffect(() => {
    const getUser = async () => {
      const session = await getSession();
      if (!session || !session.user) return;
      const tokenData = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/token?email=${session.user.email}`
      );
      const userData = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.data.token}`,
          },
        }
      );

      setUser(userData.data.user);
    };
    getUser();
  }, []);

  if (!user) {
    <div className="flex flex-col justify-center items-center">
      <LoaderCircle className="animate-spin" />
      <p>Loading...</p>
    </div>;
  }

  const classesNames =
    user && user.credits > 2
      ? "border-2 border-neutral-800/50 p-6 border-green-700 bg-green-500/10"
      : "bg-red-600/25 border-2 border-neutral-800/50  border-red-600";
  return (
    user && (
      <div className="p-8 opacity-0 animate-fade-up  [animation-delay:400ms]">
        <div className="md:flex gap-4">
          <Card
            className={`rounded-2xl p-6 transition-all duration-300  gap-4 h-full md:w-1/2 items-center justify-center group ${classesNames} cursor-pointer`}
          >
            <CardHeader>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Total Credit
              </h3>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                ${user?.credits}
              </h4>
            </CardHeader>
            <CardContent>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                You can Generate{" "}
                {user && Math.floor(user.credits! / IMAGE_GENERATE_COST)} Photos
                by your Credit
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() =>
                  toast("We are currently working on the payments")
                }
              >
                Add Credit
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
          {ModelData.map((model) => (
            <Card
              key={Date.now()}
              className={`col-span-1 bg-teal-500/5 border-2 border-neutral-800/50 rounded-2xl p-6 hover:border-teal-700 hover:bg-teal-500/10 transition-all duration-300 flex flex-col gap-12 w-full`}
            >
              <CardHeader>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  {model.title}
                </h3>
                <p className="my-4 text-neutral-500 text-xs">
                  {model.description}
                </p>
                {model.free ? (
                  <Button>Free</Button>
                ) : (
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    {model.price}
                  </h4>
                )}
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  );
};

export default AddCredit;
