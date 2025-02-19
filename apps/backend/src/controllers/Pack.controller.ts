import { GenerateImage, GenerateImageFromPack } from "comman/types";
import express from "express";
import prismaClient from "db";

const router = express.Router();

const USER_ID = "abc";

router.post("/pack/generate", async (req, res) => {
  const parsedBody = GenerateImageFromPack.safeParse(req.body);
  if (!parsedBody.success)
    return res.status(401).json({
      message: "Invalid Inputs",
    });
  const prompts = await prismaClient.packPrompt.findMany({
    where: {
      packId: parsedBody.data.packId,
    },
  });
  const images = await prismaClient.outputImages.createManyAndReturn({
    data: prompts.map((prompt) => ({
      prompt: prompt.prompt,
      imageUrl: "",
      modelId: parsedBody.data.modelId,
      userId: USER_ID,
    })),
  });
  res.json({
    images: images.map((image) => image.Id),
  });
});

router.post("/pack/bulk", async (req, res) => {
  const packs = await prismaClient.pack.findMany({});
  return res.json({
    packs,
  });
});

export default router;
