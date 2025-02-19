import express from "express";
import { GenerateImage, TrainModel } from "comman/types";
import prismaClient from "db";
import { FalAiModel } from "../models/FalAiModel";

const router = express.Router();

const falAIModel = new FalAiModel();

const USER_ID = "abc";



router.post("/model/training", async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body);
  if (!parsedBody.success)
    return res.status(411).json({
      message: "Invalid Inputs",
    });
  const request_id = await falAIModel.trainModel();
  const data = await prismaClient.model.create({
    data: {
      name: parsedBody.data.name,
      ethinicity: parsedBody.data.ethinicity,
      type: parsedBody.data.type,
      bald: parsedBody.data.bald,
      eyeColor: parsedBody.data.eyeColor,
      userId: USER_ID,
      falAiRequestId: request_id,
      status: "Pending",
    },
  });
  res.json({
    Id: data.Id,
  });
});

router.post("/model/generate", async (req, res) => {
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
  const request_id = await falAIModel.generateImage(
    parsedBody.data.prompt,
    model?.tensorPath!
  );
  const image = await prismaClient.outputImages.create({
    data: {
      imageUrl: "",
      modelId: parsedBody.data.modelId,
      prompt: parsedBody.data.prompt,
      userId: USER_ID,
      falAiRequestId: request_id,
    },
  });
  res.json({
    image: image.Id,
  });
});

export default router;
