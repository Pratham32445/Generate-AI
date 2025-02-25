import prismaClient from "db";
import express from "express";
import { FalAiModel } from "../models/FalAiModel";

const webhookRouter = express.Router();

const falAIModel = new FalAiModel();

const TRAIN_MODEL = 4;
const GENERATE_IMAGE = 0.4;

webhookRouter.post("/fal-ai/webhook/generate", async (req, res) => {
  const request_id = req.body.request_id;
  if (req.body?.payload?.images[0]?.url) {
    const outputImage = await prismaClient.outputImages.updateManyAndReturn({
      where: {
        falAiRequestId: request_id,
      },
      data: {
        status: "Generated",
        imageUrl: req.body.payload.images[0].url,
      },
    });
    const user = await prismaClient.user.findFirst({
      where: {
        Id: outputImage[0].userId,
      },
    });
    await prismaClient.user.update({
      where: {
        Id: outputImage[0].userId,
      },
      data: {
        credits: +user!.credits - GENERATE_IMAGE,
      },
    });
    res.json({
      message: "Webhook recieved",
      imageUrl: req.body.payload.images[0].url,
    });
  }
  else {
    res.status(411).json({
      message : "Error while Generating Image"
    })
  }
});

webhookRouter.post("/fal-ai/webhook/train", async (req, res) => {
  const request_id = req.body.request_id;
  const tensor_path = req.body.payload.diffusers_lora_file.url;
  const { imageUrl } = await falAIModel.generateImageAsync(tensor_path);
  const model = await prismaClient.model.updateManyAndReturn({
    where: {
      falAiRequestId: request_id,
    },
    data: {
      status: "Generated",
      tensorPath: tensor_path,
      thumbnail: imageUrl,
    },
  });
  const user = await prismaClient.user.findFirst({
    where: {
      Id: model[0].userId,
    },
  });
  await prismaClient.user.update({
    where: {
      Id: model[0].userId,
    },
    data: {
      credits: +user!.credits - TRAIN_MODEL,
    },
  });
  res.json({
    message: model,
  });
});

export default webhookRouter;
