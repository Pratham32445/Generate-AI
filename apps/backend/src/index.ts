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

const app = express();

app.use(express.json());
app.use(cors());

fal.config({
  credentials: process.env.FAL_API_KEY,
});

dotenv.config();

const PORT = process.env.PORT || 8080;

const USER_ID = "abc";

app.use("/ai", ModelRouter);
app.use("/bundle", PackRouter);

app.get("/image/bulk", async (req, res) => {
  const Ids = req.query.images as string[];
  const images = await prismaClient.outputImages.findMany({
    where: {
      Id: { in: Ids },
      userId: USER_ID,
    },
  });
  res.json({
    images,
  });
});

app.post("/fal-ai/webhook/generate", async (req, res) => {
  console.log("webhook calling", req.body.payload.images);
  const request_id = req.body.request_id;
  await prismaClient.outputImages.updateMany({
    where: {
      falAiRequestId: request_id,
    },
    data: {
      status: "Generated",
      imageUrl: req.body.payload.images[0].url,
    },
  });
  res.json({
    message: "Webhook recieved",
  });
});

app.post("/fal-ai/webhook/train", async (req, res) => {
  console.log("webhook calling", req.body);
  const request_id = req.body.request_id;
  await prismaClient.model.updateMany({
    where: {
      falAiRequestId: request_id,
    },
    data: {
      status: "Generated",
      tensorPath: req.body.payload.diffusers_lora_file.url,
    },
  });
  res.json({
    message: "Webhook recieved",
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

app.options("/pre-signed-url", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("running");
});
