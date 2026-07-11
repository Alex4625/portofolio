import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const R2_PUBLIC_URL =
  process.env.AWS_URL || "https://pub-bb3ad634e09444a1b3bcbe6d9cdef19e.r2.dev";

let s3Client: S3Client | null = null;

function getS3Client() {
  if (!s3Client) {
    s3Client = new S3Client({
      region: "auto",
      endpoint: process.env.AWS_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }
  return s3Client;
}

export async function uploadToR2(file: File, folder: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const body = new Uint8Array(bytes);
  
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
  
  await getS3Client().send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: fileName,
      Body: body,
      ContentType: file.type,
    })
  );
  
  return fileName;
}

export async function deleteFromR2(fileName: string): Promise<void> {
  if (!fileName) return;
  await getS3Client().send(
    new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: fileName,
    })
  );
}

export function toPublicUrl(path?: string | null) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${R2_PUBLIC_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
