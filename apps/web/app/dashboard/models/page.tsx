
export const revalidate = 60;

import React from "react";
import prismaClient from "db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Models = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return;
  const user = await prismaClient.user.findFirst({
    where: { email: session.user.email! },
  });
  if (!user) return;
  const models = await prismaClient.model.findMany({
    where: {
      userId: user.Id,
    },
  });
  const currentlyTrainingModel = models.filter(
    (model) => model.status == "Pending"
  );

  const GeneratedModel = models.filter((model) => model.status == "Generated");
  return (
    <div className="p-4 px-8">
      <div>
        <h3 className="mt-10 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          Currently Training
        </h3>
        <div className="my-4">
          {currentlyTrainingModel.length > 0 ? (
            <div className="flex">
              {currentlyTrainingModel.map((model, key) => (
                <Link
                  href={`/dashboard/models/status/${model.falAiRequestId}`}
                  key={key}
                >
                  <Card className="border-2 border-neutral-800/50 rounded-2xl p-6 border-yellow-700 bg-yellow-500/10 transition-all duration-300">
                    <CardHeader>
                      <CardTitle>{model.name}</CardTitle>
                      <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{model.Id}</p>
                    </CardContent>
                    <CardFooter>
                      <p>{model.status}</p>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <h3 className="mt-8 text-center scroll-m-20 text-xl  tracking-tight">
              No Active Training Model
            </h3>
          )}
        </div>
      </div>
      <div>
        <h3 className="mt-10 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          Trainded Models
        </h3>
        <div className="flex flex-wrap gap-4 mt-[10px]">
          {GeneratedModel.map((model) => (
            <div key={model.Id}>
              <Card className="border-2 border-neutral-800/50 rounded-2xl  border-green-700 bg-green-500/10 transition-all duration-300 gap-12 p-2 cursor-pointer">
                <CardHeader>
                  <CardTitle>{model.name}</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{model.Id}</p>
                </CardContent>
                <CardFooter>
                  <p>{model.status}</p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Models;
