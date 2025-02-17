import express, { type Request, type Response } from "express";
import { prismaClient } from "db";

const router = express.Router();

router.post("/fal-ai/webhook/train", async (req: Request, res: Response) => {
  console.log(req.body);
  const requestId = req.body.request_id;
  await prismaClient.model.updateMany({
    where: {
      falAIRequestId: requestId,
    },
    data: {
      status: "Generated",
      tensorPath: req.body.tensor_path,
    },
  });
});

router.post("/fal-ai/webhook/generate", (req: Request, res: Response) => {

});
