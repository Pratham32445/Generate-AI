import {z} from "zod";
import {TrainModel} from "./types";

export type TrainModelTypes = z.infer<typeof TrainModel>