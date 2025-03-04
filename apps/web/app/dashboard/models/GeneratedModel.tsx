"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DownloadIcon } from "lucide-react";
import { downloadImage } from "@/utils/DownloadImage";
import { Badge } from "@/components/ui/badge";

interface ModelType {
  name: string;
  thumbnail: string | null;
  createdAt: Date;
  status: string;
  ethinicity: string;
  eyeColor: string;
  bald: boolean;
}

const GeneratedModelCard = ({ model }: { model: ModelType }) => {
  const [open, setOpen] = useState(false);
  console.log(model);
  return (
    <div>
      <Card
        onClick={() => setOpen(true)}
        className="border-2 border-neutral-800/50 rounded-2xl  border-green-700 bg-green-500/10 transition-all duration-300 gap-12 p-2 cursor-pointer w-[200px]"
      >
        <CardHeader>
          <CardTitle>{model.name}</CardTitle>
          <CardDescription>
            {new Date(model.createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={model.thumbnail!}
            alt="Thumbnail"
            width={100}
            height={100}
            className="w-full"
          />
        </CardContent>
        <CardFooter>
          <p>{model.status}</p>
        </CardFooter>
      </Card>
      <ModelCard open={open} setOpen={setOpen} model={model} />
    </div>
  );
};

export default GeneratedModelCard;

const ModelCard = ({
  open,
  setOpen,
  model,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  model: ModelType;
}) => {
  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Label className="text-xs text-neutral-500">TriggerWord :</Label>
            <DialogTitle>{model.name}</DialogTitle>
          </div>
          <DialogDescription className="my-2 text-xs text-neutral-500">
            CreatedAt : {new Date(model.createdAt).toLocaleTimeString()}
          </DialogDescription>
        </DialogHeader>
        <div>
          <p className="my-2">Thumbnail Image</p>
          <Image
            src={model.thumbnail!}
            width={300}
            height={300}
            className="w-full"
            alt="Thumbnail"
          />
          <DownloadIcon
            width={15}
            height={15}
            className="my-5 cursor-pointer"
            onClick={() => downloadImage(model.thumbnail!)}
          />
          <p className="my-2 text-neutral-500">
            Ethinicity : {model.ethinicity}{" "}
          </p>
          <p className="my-2 text-neutral-500">Eyecolor : {model.eyeColor}</p>
        </div>
        <Badge variant="outline" className="bg-green-500">Working Model</Badge>
      </DialogContent>
    </Dialog>
  );
};
