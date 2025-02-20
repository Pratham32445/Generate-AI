"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { TrainModelTypes } from "comman/infertypes";
import UploadImage from "./UploadImage";
import axios from "axios";

const TrainModel = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [ethinicity, setEthinicity] = useState<
    | "Black"
    | "Asian_American"
    | "East_Asian"
    | "South_East_Asian"
    | "South_Asian"
    | "Middle_Eastern"
    | "Pacific"
    | "Hispanic"
  >("Black");
  const [bald, setBald] = useState<boolean>(false);
  const [type, setType] = useState<"Man" | "Women" | "Other">("Man");
  const [eyeColor, setEyeColor] = useState<"Brown" | "Blue" | "Hazel" | "Gray">(
    "Brown"
  );
  const [zipUrl, setZipUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const trainModel = async () => {
    const input: TrainModelTypes = {
      name,
      age,
      bald,
      ethinicity,
      eyeColor,
      type,
      zipUrl,
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/model/training`,
      input
    );
    if (response.status == 200) {
      setIsLoading(true);
    }
  };
  return (
    <div className="flex justify-center mb-10 opacity-0 animate-fade-up  [animation-delay:400ms]">
      <Card className="w-3/4 mt-[30px]">
        <CardHeader>
          <Brain />
          <CardTitle>Train New Model</CardTitle>
          <CardDescription>
            Create a custom AI model with your photos
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex gap-4 flex-wrap w-full">
            <div className="w-full md:w-2/5 items-center">
              <Label htmlFor="model-name">Model Name</Label>
              <Input
                type="text"
                id="model-name"
                placeholder="Enter model name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-2/5 items-center">
              <Label htmlFor="age">Age</Label>
              <Input
                onChange={(e) => setAge(Number(e.target.value))}
                type="number"
                id="age"
                placeholder="Enter Age"
              />
            </div>
            <div className="w-full md:w-2/5 items-center">
              <Label>Gender</Label>
              <Select onValueChange={(value) => setType(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Man">Man</SelectItem>
                  <SelectItem value="Women">Women</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-2/5 items-center">
              <Label>Ethinicty</Label>
              <Select onValueChange={(value) => setEthinicity(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Ethinicity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="Asian_American">Asian American</SelectItem>
                  <SelectItem value="East_Asian">East Asian</SelectItem>
                  <SelectItem value="South_East_Asian">
                    South East Asian
                  </SelectItem>
                  <SelectItem value="South_Asian">South Asian</SelectItem>
                  <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                  <SelectItem value="Pacific">Pacific</SelectItem>
                  <SelectItem value="Hispanic">Hispanic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-2/5 items-center">
              <Label>Eye Color</Label>
              <Select onValueChange={(value) => setEyeColor(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="EyeColor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Brown">Brown</SelectItem>
                  <SelectItem value="Blue">Blue</SelectItem>
                  <SelectItem value="Hazel">Hazel</SelectItem>
                  <SelectItem value="Gray">Gray</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-2/5 items-center">
              <Label>Bald</Label>
              <Select onValueChange={(value) => setBald(Boolean(value))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Bald" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <UploadImage onUploadDone={(zipUrl) => setZipUrl(zipUrl)} />
        </CardContent>
        {!isLoading ? (
          <CardFooter className="flex justify-between">
            <Button variant={"secondary"}>Cancel</Button>
            <Button
              disabled={
                isLoading ||
                !name ||
                !type ||
                !ethinicity ||
                !bald ||
                !zipUrl ||
                !eyeColor
              }
              onClick={trainModel}
              className="bg-[#DEFF00]"
            >
              <Brain /> Train Model
            </Button>
          </CardFooter>
        ) : (
          <CardFooter>
            <div>
              <p className="text-[#DEFF00]">Your Model is in Training Process...</p>
            </div>
            <div className="mx-4">
              <Button className="bg-[#bbd414] hover:bg-[#DEFF00]">See Status</Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default TrainModel;
