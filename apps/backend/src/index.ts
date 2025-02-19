import express from "express";
import ModelRouter from "./controllers/Model.controller";
import PackRouter from "./controllers/Pack.controller";
import prismaClient from "db";
import dotenv from "dotenv";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3client } from "./aws/s3";

const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 8080;

const USER_ID = "abc";

app.post("/ai", ModelRouter);
app.post("/bundle", PackRouter);

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
  const request_id = req.body.request_id;
  await prismaClient.outputImages.updateMany({
    where: {
      falAiRequestId: request_id,
    },
    data: {
      status: "Generated",
      imageUrl: req.body.image_url,
    },
  });
  res.json({
    message: "Webhook recieved",
  });
});

app.post("/fal-ai/webhook/train", async (req, res) => {
  const request_id = req.body.request_id;
  await prismaClient.model.updateMany({
    where: {
      falAiRequestId: request_id,
    },
    data: {
      status: "Generated",
      tensorPath: req.body.tensorPath,
    },
  });
  res.json({
    message: "Webhook recieved",
  });
});

app.get("/pre-signed-url", async (req, res) => {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: `models/${Date.now()}.zip`,
  });
  const url = await getSignedUrl(s3client, command, { expiresIn: 60 * 5 });
  res.json({
    url,
  });
});

app.listen(PORT, () => {
  console.log("running");
});
