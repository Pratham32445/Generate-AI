"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LiveImageCount = () => {
  const [images, setImages] = useState(500);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setImages((prevCount) => {
        const newCount = prevCount + Math.floor(Math.random() * 100);
        setIsIncreasing(true);
        setTimeout(() => setIsIncreasing(false), 1000);
        return newCount;
      });
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-amber-500/5 border-2 rounded-2xl p-6 border-amber-700 transition-all duration-300 gap-2 h-full flex flex-col items-start justify-center">
      <Card className="w-full bg-transparent border-none">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
              Live Counter
            </Badge>

            <h3 className="text-lg font-medium text-muted-foreground text-center">
              Images Generated Till Now...
            </h3>

            <div className="relative">
              <p
                className={`text-6xl font-bold text-center transition-all duration-1000 ${
                  isIncreasing ? "scale-110 text-primary" : ""
                }`}
              >
                {images.toLocaleString()}
                <span className="text-primary">+</span>
              </p>

              {isIncreasing && (
                <span className="absolute -top-2 -right-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full animate-pulse">
                  Updating
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Counter updates every 5 seconds
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveImageCount;
