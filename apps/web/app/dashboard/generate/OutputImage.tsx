"use client";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { downloadImage } from "@/utils/DownloadImage";

const OutputImage = ({
  open,
  imageUrl,
  setOpen,
}: {
  open: boolean;
  imageUrl: string;
  setOpen: (open: boolean) => void;
}) => {
  console.log(imageUrl);
  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogContent className="w-[1000px] h-[600px]">
        {<Image src={imageUrl} width={1000} height={600} alt="Image" />}
        <div className="px-4">
          <Button onClick={() => downloadImage(imageUrl)}>
            <DownloadIcon />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutputImage;
