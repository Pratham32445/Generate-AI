import { prismaClient } from "db";
import express, { type Request, type Response } from "express";

const router = express.Router();

const USER_ID = "ABC";

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
