"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { DownloadIcon, Plus } from "lucide-react";
import { downloadImage } from "@/utils/DownloadImage";
import OutputImage from "@/components/OutputImage";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    setWithModels(response.data.withModels);
    setWithoutModels(response.data.withoutModels);
  };

  useEffect(() => {
    getUserAllImages();
  }, []);

  return (
    <div>
      <div className="flex justify-end px-10 py-2">
        <Link href="/dashboard">
          <Plus />
        </Link>
      </div>
      <div>
        <p className="mx-10 text-xl">Without Models</p>
        <div className="flex justify-center flex-wrap gap-4 p-4 animate-fade-up  opacity-0 [animation-delay:200ms]">
          {withoutModels.length > 0 ? (
            withoutModels.reverse().map((image: Image) => (
              <Card
                key={image.Id}
                className="cursor-pointer overflow-hidden"
                onClick={() => {
                  setOpen(true);
                  setImage(image);
                }}
              >
                <CardContent className="p-0 relative w-[300px] h-[300px]">
                  <Image src={image.imageUrl} fill alt="Generated" />
                </CardContent>
                <div className="p-4 flex items-center gap-4">
                  <DownloadIcon
                    onClick={() => downloadImage(image.imageUrl)}
                    width={15}
                    height={15}
                  />
                </div>
              </Card>
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
              <Card
                key={image.Id}
                className="cursor-pointer overflow-hidden"
                onClick={() => {
                  setOpen(true);
                  setImage(image);
                }}
              >
                <CardContent className="p-0 relative w-[300px] h-[300px]">
                  <Image src={image.imageUrl} fill alt="Generated" />
                </CardContent>
                <div className="p-4 flex items-center gap-4">
                  <DownloadIcon
                    onClick={() => downloadImage(image.imageUrl)}
                    width={15}
                    height={15}
                  />
                </div>
              </Card>
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
