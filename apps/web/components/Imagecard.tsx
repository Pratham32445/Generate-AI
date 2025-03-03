"use client";

import { Heart, Download, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { imageVariants } from "@/lib/animation-variants";
import Image from "next/image";
import { downloadImage } from "@/utils/DownloadImage";

interface ImageData {
  id: string;
  title: string;
  prompt: string;
  likes: number;
  downloads: number;
  date: Date;
  imageUrl: string;
}

interface ImageCardProps {
  image: ImageData;
}

export function ImageCard({ image }: ImageCardProps) {
  return (
    <motion.div
      className="group relative rounded-lg overflow-hidden bg-muted"
      variants={imageVariants}
      whileHover="hover"
    >
      <Image
        width={200}
        height={200}
        src={image.imageUrl}
        alt={image.title}
        className="aspect-square object-cover transition-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <h3 className="text-white font-medium">{image.title}</h3>
        <p className="text-white/80 text-sm line-clamp-2">{image.prompt}</p>
        <div className="flex justify-between mt-2">
          <div className="flex gap-3">
            <button className="text-white flex items-center gap-1">
              <Heart className="h-4 w-4" /> {image.likes}
            </button>
            <button
              onClick={() => downloadImage(image.imageUrl)}
              className="text-white flex items-center gap-1"
            >
              <Download className="h-4 w-4" /> {image.downloads}
            </button>
          </div>
          <button className="text-white">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
