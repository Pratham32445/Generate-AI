import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";

interface Image {
  imageUrl: string;
  prompt: string;
  createdAt: Date;
}

const Generate = ({
  isLoading,
  setisLoading,
  outputImages,
}: {
  isLoading: boolean;
  setisLoading: (value: boolean) => void;
  outputImages: Image[];
}) => {
  return (
    <Dialog open={isLoading} onOpenChange={(value) => setisLoading(value)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Images</DialogTitle>
          <DialogDescription>
            Here you will recieve your Output Images
          </DialogDescription>
        </DialogHeader>
        <div>
          {outputImages.length == 0 ? (
            <div>
              <LoaderCircle width={15} height={15} className="animate-spin" />
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <div className="flex flex-wrap gap-4">
                {outputImages.map(({ imageUrl }, Idx) => {
                  return (
                    <Image
                      key={Idx}
                      width={200}
                      height={200}
                      src={imageUrl}
                      alt="ImageUrl"
                      className="aspect-square w-[120px] h-[120px] md:w-[200px] md:h-[200px] object-cover transition-transform"
                    />
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Generate;
