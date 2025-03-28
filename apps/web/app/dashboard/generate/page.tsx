"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrainModelTypes, GenerateImageTypes } from "comman/infertypes";
import OutputImage from "@/components/OutputImage";
import { toast } from "sonner";
import { getImage } from "@/utils";
import Link from "next/link";

const Generate = () => {
  const [userModels, setUserModels] = useState<TrainModelTypes[] | null>(null);
  const [modelId, setModelId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<{
    imageUrl: string;
    prompt: string;
    createdAt: Date;
    Id: string;
    modelId: string;
  }>({ imageUrl: "", prompt: "", createdAt: new Date(), Id: "", modelId: "" });

  const getUserGeneratedModels = async () => {
    const tokenData = await axios.get("/api/token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/models/user`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.data.token}`,
        },
      }
    );
    setUserModels(response.data.models);
  };
  const GenerateImage = async () => {
    try {
      if (!prompt) {
        toast.error("Please add a prompt");
        return;
      }
      if (!modelId) {
        toast.error("Please select a model to proceed further");
        return;
      }
      setIsLoading(true);
      const input: GenerateImageTypes = {
        prompt,
        modelId,
      };
      const tokenData = await axios.get(`/api/token`);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/model/generate`,
        input,
        {
          headers: {
            Authorization: `Bearer ${tokenData.data.token}`,
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        const intervalId = setInterval(async () => {
          const resImage = await getImage(response.data.image, "outputImages");
          if (resImage.data.image.status == "Generated") {
            setIsGenerated(true);
            setIsLoading(false);
            setGeneratedImage(resImage.data.image);
            clearInterval(intervalId);
          }
        }, 2000);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setIsGenerated(false);
        setIsLoading(false);
        setPrompt("");
        if (error) {
          toast.error(error?.response?.data.message);
        }
      }
    }
  };

  useEffect(() => {
    getUserGeneratedModels();
  }, []);

  return (
    <div>
      {!isLoading ? (
        <div className="p-4 animate-fade-up  opacity-0 [animation-delay:400ms] mt-[20px] md:mt-[5px]">
          <div className="mb-10">
            <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Generate Image With Model
            </h2>
            <p className="text-neutral-600 text-xs">
              Describe your Imagination and we will create the reality
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mt-10 scroll-m-20 pb-2 text-lg font-semibold tracking-tight transition-colors first:mt-0">
                Select Model
              </h2>
              <p className="text-neutral-600 text-xs">
                choose your created Model or create new one
              </p>
            </div>
            <div>
              {userModels ? (
                <Select onValueChange={(value) => setModelId(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    {userModels.map((model, Idx) => (
                      <SelectItem key={Idx} value={model.Id!}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div>
                  <LoaderCircle className="animate-spin" />
                </div>
              )}
            </div>
          </div>
          <div className="my-6">
            <p className="text-neutral-500">
              Note: In Your Prompt refereed user with Trigger Word means if your
              model trigger word is Rahul so give the prompt as Generate a image
              for Rahul where Rahul is...
            </p>
          </div>
          <div className="mt-3">
            <Label htmlFor="prompt my-2">Prompt</Label>
            <Textarea
              id="prompt"
              rows={13}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your Imagination - what is it, specific thing you want"
              className="w-full p-4 text-lg border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400 transition-colors duration-200 outline"
            />
            <Button
              disabled={isLoading}
              onClick={GenerateImage}
              className="w-full p-7 my-5 bg-[#c9e706] hover:bg-[#cdec03]"
            >
              <Brain /> Generate
            </Button>
            <p className="text-neutral-500 text-xs">
              if you want to generate Image without Model then{" "}
              <Link href="/dashboard">Click here</Link>
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <LoaderCircle className="animate-spin" />
            <p className="leading-7">
              Please Wait We are working on your Prompt
            </p>
          </div>
        </div>
      )}
      <OutputImage
        deleteStatus={() => console.log("Hello")}
        open={isGenerated}
        setOpen={setIsGenerated}
        image={generatedImage}
      />
    </div>
  );
};

export default Generate;
