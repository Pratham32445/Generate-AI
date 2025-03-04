import { z } from "zod";

export const user = z.object({
  userName: z.string(),
  email: z.string().email(),
  profilePicture: z.string(),
});

export const TrainModel = z.object({
  Id: z.string().optional(),
  name: z.string(),
  type: z.enum(["Man", "Women", "Other"]),
  age: z.number(),
  ethinicity: z.enum([
    "Black",
    "Asian_American",
    "East_Asian",
    "South_East_Asian",
    "South_Asian",
    "Middle_Eastern",
    "Pacific",
    "Hispanic",
  ]),
  eyeColor: z.enum(["Brown", "Blue", "Hazel", "Gray"]),
  bald: z.boolean(),
  zipUrl: z.string(),
  tensorPath: z.string().optional(),
  thumbnail : z.string().optional()
});

export const GenerateImage = z.object({
  prompt: z.string(),
  modelId: z.string(),
});

export const GenerateImageFromPack = z.object({
  packId: z.string(),
  modelId: z.string(),
});
