import { BaseModel } from "./BaseModel";
import { fal } from "@fal-ai/client";

export class FalAIModel extends BaseModel {
  constructor() {
    super();
  }
  async generateImage(prompt: string, tensorPath: string): Promise<string> {
    const { requestId } = await fal.subscribe("fal-ai/flux-lora", {
      input: {
        prompt: prompt,
        loras: [{ scale: 1, path: tensorPath }],
      },
      webhookUrl: `${process.env.WEBHOOK_URL}/fal-ai/webhook/generate`,
    });
    return requestId;
  }
  async trainModel(zipUrl: string, triggerWord: string): Promise<string> {
    const { requestId } = await fal.subscribe(
      "fal-ai/flux-lora-fast-training",
      {
        input: {
          images_data_url: "",
        },
        webhookUrl: `${process.env.WEBHOOK_URL}/fal-ai/webhook/train`,
      }
    );
    return requestId;
  }
}
