import {z} from "zod";
import {TrainModel,GenerateImage} from "./types";

export type TrainModelTypes = z.infer<typeof TrainModel>
export type GenerateImageTypes = z.infer<typeof GenerateImage>