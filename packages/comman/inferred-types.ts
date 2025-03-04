import { z } from "zod";
import { TrainModel, GenerateImage, GenerateImageFromPack } from "./types";

export type TrainModelTypes = z.infer<typeof TrainModel>
export type GenerateImageTypes = z.infer<typeof GenerateImage>
export type GeneratePack = z.infer<typeof GenerateImageFromPack>
