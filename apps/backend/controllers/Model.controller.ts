import { GenerateImage, GenerateImageFromPack, trainModel } from "comman/types";
import express, { type Request, type Response } from "express";
import { prismaClient } from "db";
import { FalAIModel } from "../models/FalAiModel";

const router = express.Router();

const falAiModel = new FalAIModel();

const USER_ID = "ABC";

router.post("/model/train", async (req: Request, res: Response) => {
  const parsedBody = trainModel.safeParse(req.body);
  const images = req.body.images;

  if (!parsedBody.success)
    return res.status(411).json({
      message: "Invalid Inputs",
    });

  const falAIRequestId = await falAiModel.trainModel("df", req.body.name);

  const data = await prismaClient.model.create({
    data: {
      name: parsedBody.data.name,
      age: parsedBody.data.age,
      ethinicity: parsedBody.data.ethinicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      type: parsedBody.data.type,
      zipUrl: "",
      userId: USER_ID,
      falAIRequestId,
    },
  });
  res.json({
    Id: data.Id,
  });
});

router.post("/model/generate", async (req: Request, res: Response) => {
  const parsedBody = GenerateImage.safeParse(req.body);
  if (!parsedBody.success)
    return res.status(411).json({
      message: "Invalid Inputs",
    });
  const model = await prismaClient.model.findFirst({
    where: {
      Id: parsedBody.data.modelId,
    },
  });
  if (!model || !model.tensorPath) {
    return res.status(411).json({
      message: "Model not found",
    });
  }
  const request_id = await falAiModel.generateImage(
    parsedBody.data.prompt,
    model.tensorPath
  );
  const data = await prismaClient.outputImages.create({
    data: {
      prompt: parsedBody.data.prompt,
      imageUrl: "",
      userId: USER_ID,
      modelId: parsedBody.data.modelId,
      falAIRequestId: request_id,
    },
  });
});
