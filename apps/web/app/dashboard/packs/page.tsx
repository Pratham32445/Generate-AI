"use client";
import React, { useState } from "react";
import axios, { isAxiosError } from "axios";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { GeneratePack } from "comman/infertypes";
import { getImage } from "@/utils";
import Generate from "./PackGenerate";

interface Pack {
  Id: string;
  name: string;
  thumbnail: string;
  packPrompt: string[];
}

interface Image {
  imageUrl: string;
  prompt: string;
  createdAt: Date;
}

const Packs = () => {
  const [packs, setPacks] = useState<null | Pack[]>(null);
  const [userModels, setUserModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState<null | string>(null);
  const [outputImages, setOutputImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPacks = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bundle/pack/bulk`
      );
      setPacks(res.data.packs);
    };
    fetchPacks();
  }, []);

  useEffect(() => {
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
    getUserGeneratedModels();
  }, []);

  if (!packs) {
    return (
      <div>
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }
  const GeneratePack = async (packId: string) => {
    try {
      const input: GeneratePack = {
        modelId: selectedModel!,
        packId,
      };
      if (!input.modelId) {
        toast("Please Select the Model to Proceed");
        return;
      }
      setIsLoading(true);
      const tokenData = await axios.get(`/api/token`);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bundle/pack/generate`,
        input,
        {
          headers: {
            Authorization: `Bearer ${tokenData.data.token}`,
          },
        }
      );
      const images = res.data.images;
      const hasCompleted: string[] = [];

      const intervalId = setInterval(async () => {
        const updateImages = await Promise.all(
          images.map(async (imageId: string) => {
            if (!hasCompleted.includes(imageId)) {
              const res = await getImage(imageId, "outputImages");
              if (res.data.image.status === "Generated") {
                hasCompleted.push(imageId);
                return res.data.image;
              }
            }
            return null;
          })
        );

        setOutputImages((prevImages) => [
          ...prevImages,
          ...updateImages.filter((image) => image !== null),
        ]);

        if (hasCompleted.length >= images.length) {
          clearInterval(intervalId);
        }
      }, 2000);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="px-4 py-5">
      <p>Predefined Packs</p>
      <div className="flex gap-4 flex-wrap pt-5">
        {packs &&
          packs.map(({ Id, name, thumbnail, packPrompt }: Pack) => (
            <Card key={Id} className="cursor-pointer p-0 overflow-hidden">
              <CardContent className="p-0 relative w-[300px] h-[300px]">
                <Image src={thumbnail} fill alt="packImage" />
              </CardContent>
              <div className="p-2 px-4">
                <p className="my-2 text-sm">Name : {name}</p>
                <p>Images : {packPrompt.length} </p>
                <div className="my-2">
                  <Select onValueChange={(value) => setSelectedModel(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent>
                      {userModels.map(({ Id, name }) => (
                        <SelectItem key={Id} value={Id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="my-1" onClick={() => GeneratePack(Id)}>
                  Generate
                </Button>
              </div>
              <Generate
                setisLoading={setIsLoading}
                isLoading={isLoading}
                outputImages={outputImages}
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Packs;
