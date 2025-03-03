"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { DownloadIcon, Share2Icon, TrashIcon } from "lucide-react";
import { downloadImage } from "@/utils/DownloadImage";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const OutputImage = ({
  open,
  image,
  setOpen,
}: {
  open: boolean;
  image: { imageUrl: string; prompt: string; createdAt: Date };
  setOpen: (open: boolean) => void;
}) => {
  const shareImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const file = new File([blob], `shared-image.jpg`, { type: blob.type });

      if (navigator.share) {
        await navigator.share({
          title: "Check out this image!",
          text: "Generated with AI ✨",
          files: [file],
        });
      }
    } catch (error) {
      toast.error("Error sharing image:" + error);
    }
  };

  return (
    image && (
      <Dialog open={open} onOpenChange={(value) => setOpen(Boolean(value))}>
        <DialogContent className="max-w-xl p-0 overflow-hidden">
          <DialogHeader>
            <Image
              src={image.imageUrl}
              className="w-full"
              width={300}
              height={300}
              alt="Image"
            />
          </DialogHeader>
          <DialogDescription className="p-4">
            <div>
              <Badge variant="outline" className="bg-[#4BB543]">
                Generated
              </Badge>
            </div>
            <div className="py-2">
              <ScrollArea className="h-[100px] w-full rounded-md border p-4">
                <p className="text-neutral-500 text-xs">{image.prompt}</p>
              </ScrollArea>
              <p className="text-neutral-500 my-2 text-xs">
                CreatedAt: {new Date(image.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <DownloadIcon
                width={15}
                height={15}
                className="cursor-pointer"
                onClick={() => downloadImage(image.imageUrl)}
              />
              <TrashIcon
                width={15}
                height={15}
                className="cursor-pointer"
                color="#EE4B2B"
              />
              <Share2Icon
                width={15}
                height={15}
                className="cursor-pointer"
                onClick={() => shareImage(image.imageUrl)}
              />
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    )
  );
};

export default OutputImage;
