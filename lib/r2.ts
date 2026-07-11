import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.AWS_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToR2(file: File, folder: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
  
  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    })
  );
  
  return fileName;
}

export async function deleteFromR2(fileName: string): Promise<void> {
  if (!fileName) return;
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: fileName,
    })
  );
}
