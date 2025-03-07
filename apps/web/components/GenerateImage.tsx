"use client";
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import axios, { isAxiosError } from "axios";
import { getImage } from "@/utils";
import OutputImage from "./OutputImage";

const GenerateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setisGenerated] = useState(false);
  const [image, setImage] = useState<{
    imageUrl: string;
    prompt: string;
    createdAt: Date;
    Id: string;
    modelId: string;
  }>({ imageUrl: "", prompt: "", createdAt: new Date(), Id: "", modelId: "" });

  const GenerateImageWithoutModel = async () => {
    try {
      if (prompt.length == 0) {
        toast.error("Please Provide the prompt");
        return;
      }
      setIsLoading(true);
      const tokenData = await axios.get("/api/token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/image/generate`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${tokenData.data.token}`,
          },
        }
      );
      console.log(res.data);
      if (res.status == 200) {
        const intervalId = setInterval(async () => {
          const resImage = await getImage(
            res.data.imageId,
            "outputImagesWithoutModel"
          );
          if (resImage.data.image.status == "Generated") {
            setIsLoading(false);
            setisGenerated(true);
            setImage(resImage.data.image);
            clearInterval(intervalId);
          }
        }, 2000);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setIsLoading(false);
        toast.error(error?.response?.data.message);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="h-full p-4 flex flex-col items-center justify-center">
        <LoaderCircle className="animate-spin" />
        <p>Please Wait we are working on your prompt</p>
      </div>
    );
  }

  return (
    <div>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm text-neutral-500">
        Generate Image without Model
      </p>
      <Textarea
        id="prompt"
        rows={10}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your Imagination - what is it, specific thing you want"
        className="mt-[10px] w-full p-4 text-lg border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400 transition-colors duration-200 outline"
      />
      <Button
        disabled={isLoading}
        onClick={GenerateImageWithoutModel}
        className="w-full p-5 my-5  text-black bg-[#c9e706] hover:bg-[#cdec03]"
      >
        <Brain /> Generate
      </Button>
      <p className="text-neutral-500 text-xs">
        if you want to generate Image with Model then{" "}
        <Link href="/dashboard/generate">Click here</Link>
      </p>
      <OutputImage
        deleteStatus={() => console.log("Hello")}
        open={isGenerated}
        setOpen={setisGenerated}
        image={image}
      />
    </div>
  );
};

export default GenerateImage;
