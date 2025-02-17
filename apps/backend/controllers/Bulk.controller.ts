import { GenerateImageFromPack } from "comman/types";
import { prismaClient } from "db";
import express, { type Request, type Response } from "express";

const router = express.Router();

const USER_ID = "ABC";

router.post("/pack/generate", async (req: Request, res: Response) => {
  const parsedBody = GenerateImageFromPack.safeParse(req.body);
  if (!parsedBody)
    return res.status(411).json({
      message: "Invalid Inputs",
    });
  const prompts = await prismaClient.packPrompt.findFirst({
    where: {
      packId: parsedBody.data?.packId,
    },
  });
  const model = await prismaClient.model.findFirst({
    where: {
      Id: parsedBody.data?.modelId,
    },
  });
  if (!model) {
    return res.status(411).json({
      message: "Model Not found",
    });
  }
});

router.get("/pack/bulk", async (req: Request, res: Response) => {
  const packs = await prismaClient.packPrompt.findMany({});
  res.json({
    packs,
  });
});

router.get("/images/bulk", async (req: Request, res: Response) => {
  const images = req.query.images as string[];
  const offset = req.query.limit as string;
  const limit = req.query.limit as string;
  const imagesData = await prismaClient.outputImages.findMany({
    where: {
      Id: { in: images },
      userId: USER_ID,
    },
    skip: parseInt(offset),
    take: parseInt(limit),
  });
  res.json({
    images: imagesData,
  });
});
