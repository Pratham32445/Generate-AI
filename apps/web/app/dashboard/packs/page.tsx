import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import PackGenerate from "./PackGenerate";
import Image from "next/image";

const Packs = async () => {
  // const packs = await prismaClient.pack.findMany({});
  return (
    // <div className="flex flex-wrap pt-5 px-4">
    //   {packs &&
    //     packs.map(({ Id, name }: { Id: string; name: string }) => (
    //       <Card key={Id} className="cursor-pointer p-2">
    //         <p className="text-lg my-2">{name}</p>
    //         <CardContent className="p-0 relative w-[300px] h-[300px]">
    //           <Image
    //             src={
    //               "https://v3.fal.media/files/elephant/jhpCkfL92nNgv7Da4cL5I_c055489ec89241b883c1790341e97748.jpg"
    //             }
    //             fill
    //             alt="packImage"
    //           />
    //         </CardContent>
    //         <div className="p-4">
    //           <PackGenerate packId={Id} />
    //         </div>
    //       </Card>
    //     ))}
    </div>
  );
};

export default Packs;
