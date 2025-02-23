import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AddCredit = () => {
  const totalCredit = 10;
  const classesNames =
    totalCredit > 2
      ? "border-2 border-neutral-800/50 p-6 border-green-700 bg-green-500/10"
      : "bg-red-600/25 border-2 border-neutral-800/50  border-red-600";
  return (
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
              ${totalCredit}
            </h4>
          </CardHeader>
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              You can Generate 100 Photos by your Credit
            </p>
          </CardContent>
          <CardFooter>
            <Button>Add Credit</Button>
          </CardFooter>
        </Card>
        <Card
          className={`bg-indigo-500/5 border-2 border-neutral-800/50 rounded-2xl p-6 hover:border-indigo-700 transition-all duration-300 gap-2 h-full items-start justify-center md:w-1/2`}
        >
          <CardHeader>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Credit History
            </h3>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              ${totalCredit}
            </h4>
          </CardHeader>
          <CardContent>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              You can Generate 100 Photos by your Credit
            </p>
          </CardContent>
          <CardFooter>
            <Button>Add Credit</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
        {Array.from({ length: 4 }).map(() => (
          <Card
            key={new Date.now()}
            className={`col-span-1 bg-teal-500/5 border-2 border-neutral-800/50 rounded-2xl p-6 hover:border-teal-700 hover:bg-teal-500/10 transition-all duration-300 flex flex-col gap-12 w-full`}
          >
            <CardHeader>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Credit History
              </h3>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                ${totalCredit}
              </h4>
            </CardHeader>
            <CardContent>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                You can Generate 100 Photos by your Credit
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddCredit;
