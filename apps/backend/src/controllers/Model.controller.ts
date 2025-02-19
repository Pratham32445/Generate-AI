import express from "express";
import { GenerateImage, TrainModel } from "comman/types";
import prismaClient from "db";

const router = express.Router();

const USER_ID = "abc";

router.post("/model/training", async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body);
  if (!parsedBody.success)
    return res.status(411).json({
      message: "Invalid Inputs",
    });
  const data = await prismaClient.model.create({
    data: {
      name: parsedBody.data.name,
      ethinicity: parsedBody.data.ethinicity,
      type: parsedBody.data.type,
      bald: parsedBody.data.bald,
      eyeColor: parsedBody.data.eyeColor,
      userId: USER_ID,
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
  const image = await prismaClient.outputImages.create({
    data: {
      imageUrl: "",
      modelId: parsedBody.data.modelId,
      prompt: parsedBody.data.prompt,
      userId: USER_ID,
    },
  });
  res.json({
    image: image.Id,
  });
});

export default router;
