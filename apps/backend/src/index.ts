import express from "express";
import ModelRouter from "./controllers/Model.controller";
import PackRouter from "./controllers/Pack.controller";
import prismaClient from "db";
import dotenv from "dotenv";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3client } from "./aws/s3";
import cors from "cors";
import { fal } from "@fal-ai/client";
import { authMiddleware } from "./middlewares/authMiddleware";
import webhookRouter from "./webhook/Model.webhook";

const app = express();

app.use(express.json());
app.use(cors());

fal.config({
  credentials: process.env.FAL_API_KEY,
});

dotenv.config();

const PORT = process.env.PORT || 8080;

app.use("/ai", ModelRouter);
app.use("/bundle", PackRouter);
// webhook route
app.use("/", webhookRouter);

app.get("/image/bulk", async (req, res) => {
  const Ids = req.query.images as string[];
  const images = await prismaClient.outputImages.findMany({
    where: {
      Id: { in: Ids },
      userId: "abc",
    },
  });
  res.json({
    images,
  });
});

app.get("/pre-signed-url", async (req, res) => {
  const key = `models/${Date.now()}.zip`;
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
  });
  const url = await getSignedUrl(s3client, command, { expiresIn: 60 * 5 });
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  res.json({
    url,
    key,
  });
});

app.get("/model/train/status", async (req, res) => {
  try {
    const requestId = req.query.requestId as string;
    const status = await fal.queue.status("fal-ai/flux-lora-fast-training", {
      requestId,
      logs: true,
    });
    res.json({
      status,
    });
  } catch (error) {
    res.status(404).json({
      Message: "We can't Find this Model",
    });
  }
});

app.get("/model/image", async (req, res) => {
  try {
    const Id = req.query.imageId as string;
    const image = await prismaClient.outputImages.findFirst({
      where: {
        Id,
      },
    });
    res.json({
      image,
    });
  } catch (error) {
    res.status(404).json({
      Message: "We can't Find this Model",
    });
  }
});

app.get("/user/images", authMiddleware, async (req, res) => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        // @ts-ignore
        email: req.user.email!,
      },
    });
    const images = await prismaClient.outputImages.findMany({
      where: {
        userId: user?.Id,
      },
    });
    res.json({
      images,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/user/me", authMiddleware, async (req, res) => {
  const user = await prismaClient.user.findFirst({
    where: {
      // @ts-ignore
      email: req.user.email!,
    },
  });
  return res.json({
    user,
  });
});

app.options("/pre-signed-url", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("running");
});
