"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { getSession } from "next-auth/react";
import { LoaderCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

export default function CreditsInfo() {
  const [credits, setCredits] = React.useState<null | string>(null);
  const [Images, setImages] = React.useState([]);
  const GENERATE_IMAGE = 0.4;
  const TRAIN_MODEL = 4.0;

  React.useEffect(() => {
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
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/images`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.data.token}`,
          },
        }
      );
      setImages([
        ...(response.data.withModels as []),
        ...(response.data.withoutModels as []),
      ]);
      setCredits(userData.data.user.credits);
    };
    getUser();
  }, []);

  if (!credits) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <LoaderCircle className="animate-spin" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Card className="bg-green-500/5 border-2 border-neutral-800/50 rounded-2xl  border-green-700 hover:bg-green-500/10 transition-all duration-300 h-full w-full">
      <CardContent className="flex-1 p-4">
        <div>
          <p className="text-neutral-300">Credits : {Number(credits).toFixed(2)}</p>
          <p className="text-neutral-300">
            You can Generate : {Math.floor(+credits / GENERATE_IMAGE)} Images
          </p>
          <p className="text-neutral-300">
            You can Train : {Math.floor(+credits / TRAIN_MODEL)} Models
          </p>
        </div>
        <div className="my-3">
          <p className="text-xs text-neutral-500">History</p>
          <ScrollArea className="h-[90px]">
            {Images.length > 0 ? (
              Images.map(
                ({ createdAt, Id }: { createdAt: Date; Id: string }) => (
                  <div key={Id}>
                    <p className="text-xs my-1">
                      {new Date(createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )
              )
            ) : (
              <div>
                {" "}
                <p className="text-xs text-center">No History Yet</p>{" "}
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
