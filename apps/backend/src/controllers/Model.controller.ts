import express from "express";
import { GenerateImage, TrainModel } from "comman/types";
import prismaClient from "db";
import { FalAiModel } from "../models/FalAiModel";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

const falAIModel = new FalAiModel();

const USER_ID = "abc";

router.post("/model/training", authMiddleware, async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body);
  console.log(parsedBody.error);
  if (!parsedBody.success)
    return res.status(411).json({
      message: "Invalid Inputs",
    });
  const request_id = await falAIModel.trainModel(
    parsedBody.data.zipUrl,
    parsedBody.data.name
  );
  const user = await prismaClient.user.findFirst({
    where: {
      // @ts-ignore
      email: req.user.email!,
    },
  });
  const data = await prismaClient.model.create({
    data: {
      name: parsedBody.data.name,
      ethinicity: parsedBody.data.ethinicity,
      type: parsedBody.data.type,
      bald: parsedBody.data.bald,
      eyeColor: parsedBody.data.eyeColor,
      userId: user?.Id!,
      falAiRequestId: request_id,
      status: "Pending",
    },
  });
  res.json({
    Id: data.Id,
    request_id: request_id,
  });
});

router.post("/model/generate", authMiddleware, async (req, res) => {
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
  const user = await prismaClient.user.findFirst({
    where: {
      // @ts-ignore
      email: req.user.email!,
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
      userId: user?.Id!,
      falAiRequestId: request_id,
    },
  });
  res.json({
    image: image.Id,
  });
});

router.get("/models/user", authMiddleware, async (req, res) => {
  const user = await prismaClient.user.findFirst({
    where: {
      // @ts-ignore
      email: req.user.email!,
    },
  });
  const models = await prismaClient.model.findMany({
    where: {
      userId: user?.Id,
      status : "Generated"
    },
  });
  res.json({
    models,
  });
});

export default router;
