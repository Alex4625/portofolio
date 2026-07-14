import { NextResponse } from "next/server";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getR2Client } from "@/lib/r2";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    // 1. Authenticate request using the admin_token cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    const authSecret = process.env.AUTH_SECRET || "fallback_secret";
    
    if (!token || token.value !== authSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 3. Prepare file buffer and filename
    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    
    // 4. Upload to R2
    const client = getR2Client();
    const bucketName = process.env.R2_BUCKET_NAME;

    if (!bucketName) {
      throw new Error("R2_BUCKET_NAME is not set");
    }

    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: buffer,
        ContentType: file.type,
      })
    );

    // 5. Return public URL
    const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${filename}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    const authSecret = process.env.AUTH_SECRET || "fallback_secret";
    
    if (!token || token.value !== authSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get("url");

    if (!fileUrl) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Extract filename from the URL
    // e.g., https://pub-xxx.r2.dev/163829-image.jpg -> 163829-image.jpg
    const urlParts = fileUrl.split("/");
    const filename = urlParts[urlParts.length - 1];

    if (!filename) {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    const client = getR2Client();
    const bucketName = process.env.R2_BUCKET_NAME;

    if (!bucketName) {
      throw new Error("R2_BUCKET_NAME is not set");
    }

    await client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: filename,
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
