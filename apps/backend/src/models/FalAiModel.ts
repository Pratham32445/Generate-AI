import { BaseModel } from "./BaseModel";
import { fal } from "@fal-ai/client";
import dotenv from "dotenv";

dotenv.config();

export class FalAiModel extends BaseModel {
  constructor() {
    super();
  }
  async trainModel(zipUrl: string, triggerWord: string) {
    console.log(process.env.WEBHOOK_URL);
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
    console.log(process.env.WEBHOOK_URL);
    const { request_id } = await fal.queue.submit("fal-ai/flux-lora", {
      input: {
        prompt: prompt,
        loras: [{ path: tensorPath, scale: 1 }],
      },
      webhookUrl: `${process.env.WEBHOOK_URL}/fal-ai/webhook/generate`,
    });
    return request_id;
  }
  async generateImageAsync(tensorPath: string) {
    console.log(process.env.WEBHOOK_URL);
    const response = await fal.subscribe("fal-ai/flux-lora", {
      input: {
        prompt:
          "Generate a head shot for the user in front of the white background",
        loras: [{ path: tensorPath, scale: 1 }]
      },
    });
    return {
      imageUrl: response.data.images[0].url,
    };
  }
  async generateImageWithoutModel(prompt: string) {
    console.log(process.env.WEBHOOK_URL);
    const { request_id } = await fal.queue.submit("fal-ai/flux-lora", {
      input: {
        prompt: prompt,
      },
      webhookUrl: `${process.env.WEBHOOK_URL}/fal-ai/webhook/generateImageWithoutModel`,
    });
    return request_id;
  }
}
