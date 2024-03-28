import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const S3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_ACCESS_KEY as string,
  },
});

export const uploadDelegates = async (bufferData: Buffer) => {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: "delegates-data.json",
    Body: bufferData,
  });

  return S3.send(command);
}
