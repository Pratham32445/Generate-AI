import { BaseModel } from "./BaseModel";
import { fal } from "@fal-ai/client";
import dotenv from "dotenv";

dotenv.config();

export class FalAiModel extends BaseModel {
  constructor() {
    super();
  }
  async trainModel(zipUrl: string, triggerWord: string) {
    const { request_id } = await fal.queue.submit(
      "fal-ai/flux-lora-fast-training",
      { 
        input: {
          images_data_url: zipUrl,
          trigger_word: triggerWord,
        },
        webhookUrl: `${process.env.WEBHOOK_URL}/fal-ai/webhook/train`,
      }
    );
    return request_id;
  }
  async generateImage(prompt: string, tensorPath: string) {
    const { request_id } = await fal.queue.submit("fal-ai/flux-lora", {
      input: {
        prompt: prompt,
      },
      webhookUrl: `${process.env.WEBHOOK_URL}/fal-ai/webhook/generate`,
    });
    return request_id;
  }
}
