import { GenerateImage, GenerateImageFromPack } from "comman/types";
import express from "express";
import prismaClient from "db";
import { authMiddleware } from "../middlewares/authMiddleware";
import { FalAiModel } from "../models/FalAiModel";

const router = express.Router();

const falAIModel = new FalAiModel();

router.post("/pack/generate", authMiddleware, async (req, res) => {
  const parsedBody = GenerateImageFromPack.safeParse(req.body);
  if (!parsedBody.success)
    return res.status(401).json({
      message: "Invalid Inputs",
    });
  const model = await prismaClient.model.findFirst({
    where: {
      Id: parsedBody.data.modelId
    }
  })
  if (!model || !model.tensorPath) return res.status(411).json({
    message: "Invalid Inputs"
  })
  const user = await prismaClient.user.findFirst({
    where: {
      // @ts-ignore
      email: req.user.email!,
    },
  });
  const pack = await prismaClient.pack.findFirst({
    where: {
      Id: parsedBody.data.packId
    }
  })
  if (+user!.credits < pack!.price) {
    res.status(401).json({
      message: "Not have Enough Credits to Generate Pack"
    })
    return;
  }
  const prompts = await prismaClient.packPrompt.findMany({
    where: {
      packId: parsedBody.data.packId,
    },
  });
  const modelsTensorPath = pack!.models ? [...pack!.models, model.tensorPath] : [model.tensorPath];

  const requestIds = await Promise.all(prompts.map(async (prompt) => {
    const userPrompt = prompt.prompt.replace("user",model.name);
    const Ids = await falAIModel.generateImage(userPrompt, modelsTensorPath);
    return Ids;
  }))
  const images = await prismaClient.outputImages.createManyAndReturn({
    data: prompts.map((prompt, idx) => (
      {
        modelId: model.Id,
        imageUrl: "",
        prompt: prompt.prompt,
        userId: user!.Id,
        falAiRequestId: requestIds[idx],
        status: "Pending",
        packId: parsedBody.data.packId
      }
    ))
  });
  res.json({
    images: images.map((image) => image.Id),
  });
});

router.get("/pack/bulk", async (req, res) => {
  const packs = await prismaClient.pack.findMany({
    select: {
      Id: true,
      name: true,
      packPrompt: true,
      thumbnail: true,
    }
  });
  return res.json({
    packs,
  });
});

export default router;
