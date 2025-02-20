import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Brain } from "lucide-react";
import React from "react";

const Generate = () => {
  return (
    <div className="p-4 animate-fade-up  opacity-0 [animation-delay:400ms]">
      <div className="mb-10">
        <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Generate Image
        </h2>
        <p className="text-neutral-600 text-xs">
          Describe your Imagination and we will create the reality
        </p>
      </div>
      <div>
        <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Select Model
        </h2>
        <p className="text-neutral-600 text-xs">
          choose your created Model or create new one
        </p>
      </div>
      <div className="mt-8">
        <Label htmlFor="prompt my-2">Prompt</Label>
        <Textarea
          id="prompt"
          rows={13}
          placeholder="Describe your Imagination - what is it, specific thing you want"
          className="w-full p-4 text-lg border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400 transition-colors duration-200"
        />
        <Button className="w-full p-7 my-5 bg-[#DEFF00]">
          <Brain /> Generate
        </Button>
      </div>
    </div>
  );
};

export default Generate;
