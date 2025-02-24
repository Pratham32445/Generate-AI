import prismaClient from "db";
import express from "express";

const webhookRouter = express.Router();

webhookRouter.post("/fal-ai/webhook/generate", async (req, res) => {
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
    imageUrl: req.body.payload.images[0].url,
  });
});

webhookRouter.post("/fal-ai/webhook/train", async (req, res) => {
  console.log("webhook calling", req.body);
  const request_id = req.body.request_id;
  const tensor_path = req.body.payload.diffusers_lora_file.url;
  const image_url = await prismaClient.model.updateMany({
    where: {
      falAiRequestId: request_id,
    },
    data: {
      status: "Generated",
      tensorPath: tensor_path,
    },
  });
  res.json({
    message: "Webhook recieved",
  });
});

export default webhookRouter;
