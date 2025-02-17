export class BaseModel {
  constructor() {}
  async generateImage(prompt: string, tensorPath: string): Promise<string> {
    return "";
  }
  async trainModel(zipUrl: string, triggerWord: string): Promise<string> {
    return "";
  }
}
