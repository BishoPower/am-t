import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// GET handler
export const GET = async () => {
  return NextResponse.json({ message: "Upload endpoint is working" });
};

// POST handler
export const POST = async (request: NextRequest) => {
  try {
    // Ensure env vars
    const region = process.env.AWS_REGION;
    const editorialBucket = process.env.AWS_S3_EDITORIAL_BUCKET_NAME;
    const listingBucket = process.env.AWS_S3_BUCKET_NAME;

    if (!region || !editorialBucket || !listingBucket) {
      console.error("Missing AWS env variables");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    // Auth
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as unknown as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (typeof file.type !== "string" || !file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Decide target bucket/folder
    const uploadType = (formData.get("type") as string) || "listing";
    const bucketName =
      uploadType === "editorial" ? editorialBucket : listingBucket;
    const folder =
      uploadType === "editorial"
        ? `editorials/${userId}`
        : `listings/${userId}`;

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `${folder}/${Date.now()}-${safeName}`;

    // Convert and upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      CacheControl: "max-age=31536000",
      // Note: do not set ACL here; prefer bucket policy for public access
    });

    await s3Client.send(command);

    const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    return NextResponse.json({ url, key });
  } catch (err) {
    console.error("Upload handler error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
};
