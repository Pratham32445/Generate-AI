"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { LoaderCircle, Plus } from "lucide-react";
import OutputImage from "@/components/OutputImage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageCard } from "@/components/Imagecard";

interface Image {
  prompt: string;
  Id: string;
  imageUrl: string;
  createdAt: Date;
}

const Images = () => {
  const [withModels, setWithModels] = useState([]);
  const [withoutModels, setWithoutModels] = useState([]);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<Image>();
  const [isLoading, setIsLoading] = useState(true);
  const getUserAllImages = async () => {
    const tokenData = await axios.get("/api/token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/images`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.data.token}`,
        },
      }
    );
    setIsLoading(false);
    setWithModels(response.data.withModels);
    setWithoutModels(response.data.withoutModels);
  };

  console.log(withModels,withoutModels);

  useEffect(() => {
    getUserAllImages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <LoaderCircle className="animate-spin" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end px-10 py-2">
        <Link href="/dashboard">
          <Plus />
        </Link>
      </div>
      <div>
        <p className="mx-10 text-xl">Without Models</p>
        <div className="flex flex-wrap gap-4 p-4 animate-fade-up opacity-0 [animation-delay:200ms]">
          {withoutModels.length > 0 ? (
            withoutModels.reverse().map((image: Image) => (
              <div
                key={image.Id}
                className="cursor-pointer"
                onClick={() => {
                  setOpen(true);
                  setImage(image);
                }}
              >
                <ImageCard
                  image={{
                    id: image.Id,
                    date: image.createdAt,
                    downloads: 10,
                    imageUrl: image.imageUrl,
                    likes: 0,
                    prompt: "",
                    title: "",
                  }}
                />
              </div>
            ))
          ) : (
            <div>
              <div>
                <p className="my-1">No Images Found</p>
                <Link href={"/dashboard"}>
                  <Button>Generate One</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="mx-10 text-xl">With Models</p>
        <div className="flex justify-center flex-wrap gap-4 p-4 animate-fade-up  opacity-0 [animation-delay:200ms]">
          {withModels.length > 0 ? (
            withModels.reverse().map((image: Image) => (
              <div
                key={image.Id}
                className="cursor-pointer"
                onClick={() => {
                  setOpen(true);
                  setImage(image);
                }}
              >
                <ImageCard
                  image={{
                    id: image.Id,
                    date: image.createdAt,
                    downloads: 10,
                    imageUrl: image.imageUrl,
                    likes: 0,
                    prompt: "",
                    title: "",
                  }}
                  key={image.Id}
                />
              </div>
            ))
          ) : (
            <div>
              <div>
                <p className="my-1">No Images Found</p>
                <Link href={"/dashboard/generate"}>
                  <Button>Generate One</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <OutputImage open={open} setOpen={setOpen} image={image!} />
    </div>
  );
};

export default Images;
