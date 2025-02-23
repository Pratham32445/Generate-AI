import React from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";

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
      <DialogContent>
        <DialogHeader className="max-w-fit">
          {<Image src={imageUrl} width={1000} height={300} alt="Image" />}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OutputImage;
