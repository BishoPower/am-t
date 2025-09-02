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

export const GET = async () => {
  return NextResponse.json({ message: "Upload endpoint is working" });
};

export const POST = async (request: NextRequest) => {
  try {
    // Validate environment variables
    const region = process.env.AWS_REGION;
    const editorialBucket = process.env.AWS_S3_EDITORIAL_BUCKET_NAME;
    const listingBucket = process.env.AWS_S3_BUCKET_NAME;

    console.log("=== BUCKET CONFIGURATION ===");
    console.log("Editorial bucket:", editorialBucket);
    console.log("Listing bucket:", listingBucket);
    console.log("Region:", region);
    console.log("=== END BUCKET CONFIG ===");

    if (!region || !editorialBucket || !listingBucket) {
      console.error("Missing AWS environment variables");
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Determine bucket and folder based on upload type
    let uploadType = formData.get("type") as string;

    // If no type is provided, try to determine from referer
    if (!uploadType) {
      const referer = request.headers.get("referer");
      console.log("No type provided, checking referer:", referer);

      if (referer) {
        if (
          referer.includes("/editorial/create") ||
          referer.includes("/editorial/")
        ) {
          uploadType = "editorial";
          console.log("Auto-detected type as 'editorial' from referer");
        } else if (
          referer.includes("/create-listing") ||
          referer.includes("/listing/")
        ) {
          uploadType = "listing";
          console.log("Auto-detected type as 'listing' from referer");
        }
      }
    }

    console.log("Upload type:", uploadType);

    let bucketName: string;
    let folderPath: string;

    if (uploadType === "editorial") {
      bucketName = editorialBucket;
      folderPath = `editorials/${userId}`;
      console.log("✅ Using editorial bucket:", bucketName);
    } else {
      // Default to listing images
      bucketName = listingBucket;
      folderPath = `listings/${userId}`;
      console.log("❌ Using listing bucket:", bucketName);
    }

    // Generate unique filename
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${folderPath}/${Date.now()}-${safeName}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to S3
    const uploadCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      CacheControl: "max-age=31536000", // 1 year cache
    });

    console.log(`Uploading to bucket: ${bucketName}, key: ${fileName}`);
    await s3Client.send(uploadCommand);

    // Return the public URL
    const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;

    console.log(`✅ Successfully uploaded: ${imageUrl}`);

    return NextResponse.json({ url: imageUrl, imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
};
