"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { DownloadIcon, Plus } from "lucide-react";
import { downloadImage } from "@/utils/DownloadImage";
import OutputImage from "@/components/OutputImage";
import Link from "next/link";

const Images = () => {
  const [Images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
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
    setImages(response.data.images);
  };

  useEffect(() => {
    getUserAllImages();
  }, []);

  return (
    <div>
      <div className="flex justify-end px-10 py-2">
        <Link href="/dashboard/generate">
          <Plus />
        </Link>
      </div>
      <div className="flex justify-center flex-wrap gap-4 p-4 animate-fade-up  opacity-0 [animation-delay:200ms]">
        {Images &&
          Images.reverse().map((image: { Id: string; imageUrl: string }) => (
            <Card
              key={image.Id}
              className="cursor-pointer"
              onClick={() => {
                setOpen(true);
                setImage(image);
              }}
            >
              <CardContent className="p-0 relative w-[300px] h-[300px]">
                <Image src={image.imageUrl} fill alt="Generated" />
              </CardContent>
              <div className="p-4">
                <DownloadIcon
                  onClick={() => downloadImage(image.imageUrl)}
                  width={20}
                  height={20}
                />
              </div>
            </Card>
          ))}
        <OutputImage open={open} setOpen={setOpen} image={image} />
      </div>
    </div>
  );
};

export default Images;
