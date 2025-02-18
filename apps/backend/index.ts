import { S3Client } from "bun";
import express, { type Request, type Response } from "express";
import { credentials } from "./bucket/r2";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/get-presigned-url", async (req: Request, res: Response) => {
  const key = `${Date.now()}_${Math.random()}.zip`;
  const url = S3Client.presign(key, {
    ...credentials,
    bucket: process.env.R2_BUCKET,
    expiresIn: 60 * 5,
  });
  res.json({
    key,
    url,  
  });
});

app.listen(PORT, () => {
  console.log("running");
});
