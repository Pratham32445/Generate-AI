import { GenerateImage, GenerateImageFromPack, trainModel } from "comman/types";
import express, { type Request, type Response } from "express";
import { prismaClient } from "db";

const router = express.Router();

const USER_ID = "ABC";

router.post("/model/train", async (req: Request, res: Response) => {
  const parsedBody = trainModel.safeParse(req.body);
  if (!parsedBody.success)
    return res.status(411).json({
      message: "Invalid Inputs",
    });
  const data = await prismaClient.model.create({
    data: {
      name: parsedBody.data.name,
      age: parsedBody.data.age,
      ethinicity: parsedBody.data.ethinicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      type: parsedBody.data.type,
      userId: USER_ID,
    },
  });
  res.json({
    Id: data.Id,
  });
});

router.post("/model/generate", async (req: Request, res: Response) => {
  const parsedBody = GenerateImageFromPack.safeParse(req.body);
  if (!parsedBody.success)
    return res.status(411).json({
      message: "Invalid Inputs",
    });
  const prompts = await prismaClient.packPrompt.findMany({
    where: {
      packId: parsedBody.data.packId,
    },
  });
  const data = await prismaClient.outputImages.createManyAndReturn({
    data: prompts.map((prompt) => ({
      imageUrl: "",
      modelId: parsedBody.data.modelId,
      prompt: prompt.prompt,
      userId: USER_ID,
    })),
  });
  res.json({
    images: data.map((image) => ({
      ImageId: image.Id,
    })),
  });
});
