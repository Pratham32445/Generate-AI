"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const PackGenerate = ({ packId }: { packId: string }) => {
  console.log(packId);
  // const [count, setCount] = useState("");
  return (
    <div>
      <Button className="my-2">Generate</Button>
    </div>
  );
};

export default PackGenerate;
