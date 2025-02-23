"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";

const Images = () => {
  const [Images, setImages] = useState();
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
  const downloadImage = (imgUrl: string) => {
    const link = document.createElement("a");
    link.target = "_blank";
    link.href = imgUrl;
    link.download = `${Date.now()}`;
    link.click();
  };
  useEffect(() => {
    getUserAllImages();
  }, []);

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-4 p-4">
        {Images &&
          Images.reverse().map((image) => (
            <Card key={image.Id}>
              <CardContent className="p-0 relative w-[300px] h-[300px]">
                <Image src={image.imageUrl} fill alt="Generated" />
              </CardContent>
              <div className="p-4">
                <Button onClick={() => downloadImage(image.imageUrl)}>
                  <DownloadIcon />
                </Button>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Images;
