import { BaseModel } from "./BaseModel";
import { fal } from "@fal-ai/client";

export class FalAiModel extends BaseModel {
  constructor() {
    super();
  }
  async trainModel() {
    const { request_id } = await fal.queue.submit(
      "fal-ai/flux-lora-fast-training",
      {
        input: {
          images_data_url: "",
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
