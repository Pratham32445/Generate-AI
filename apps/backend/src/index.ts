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
import ImageRouter from "./controllers/Image.controller";

const app = express();

const corsOptions = {
  origin: ["https://generate.ai.code10x.online", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json());

app.use(cors(corsOptions));

fal.config({
  credentials: process.env.FAL_API_KEY,
});

dotenv.config();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("working");
});

app.use("/ai", ModelRouter);
app.use("/bundle", PackRouter);
app.use("/image", ImageRouter)
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
    const model = req.query.model as string;
    console.log(Id, model);
    if (model == "outputImages") {
      const image = await prismaClient.outputImages.findFirst({
        where: {
          Id,
        },
      });
      return res.json({
        image,
      });
    }
    else if (model == "outputImagesWithoutModel") {
      const image = await prismaClient.outputImagesWithoutModel.findFirst({
        where: {
          Id,
        },
      });
      return res.json({
        image,
      });
    }
    res.status(404).json({
      message: "Not found"
    })
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
    const withModels = await prismaClient.outputImages.findMany({
      where: {
        userId: user?.Id,
      },
    });
    const withoutModels = await prismaClient.outputImagesWithoutModel.findMany({
      where: {
        userId: user?.Id
      }
    })
    res.json({
      withModels,
      withoutModels
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
    select: {
      Id: true,
      userName: true,
      email: true,
      credits: true,
      createdAt: true,
      updatedAt: true,
      outputImages: true,
      outputImagesWithoutModel: true
    }
  });
  return res.json({
    user,
  });
});

app.options("/pre-signed-url", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("running");
});
