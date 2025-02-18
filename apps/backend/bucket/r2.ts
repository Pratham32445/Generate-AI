import { S3Client } from "bun";

export const credentials = {
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  endpoint: process.env.R2_END_POINT,
  bucket: process.env.R2_BUCKET,
};
    
export const client = new S3Client(credentials);
