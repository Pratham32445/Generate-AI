"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const PackGenerate = ({ packId }: { packId: string }) => {
  const [count, setCount] = useState("");
  return (
    <div>
      <Button className="my-2">Generate</Button>
    </div>
  );
};

export default PackGenerate;
