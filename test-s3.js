import { config } from "dotenv";
import {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

// Load environment variables
config();

console.log("Environment variables loaded:");
console.log("AWS_REGION:", process.env.AWS_REGION);
console.log(
  "AWS_ACCESS_KEY_ID:",
  process.env.AWS_ACCESS_KEY_ID ? "✓ Set" : "✗ Missing"
);
console.log(
  "AWS_SECRET_ACCESS_KEY:",
  process.env.AWS_SECRET_ACCESS_KEY ? "✓ Set" : "✗ Missing"
);
console.log(
  "AWS_S3_EDITORIAL_BUCKET_NAME:",
  process.env.AWS_S3_EDITORIAL_BUCKET_NAME
);

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function testS3Connection() {
  try {
    console.log("\nTesting S3 connection...");

    // Skip bucket listing (no permission), test upload directly
    console.log("Skipping bucket listing (no ListAllMyBuckets permission)");

    // Test: Try to upload a test file directly to the editorial bucket
    const testContent = "test file content from editorial upload";
    const testKey = `test-editorial-${Date.now()}.txt`;

    console.log(
      `Attempting to upload to bucket: ${process.env.AWS_S3_EDITORIAL_BUCKET_NAME}`
    );
    console.log(`Test file key: ${testKey}`);

    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_S3_EDITORIAL_BUCKET_NAME,
      Key: testKey,
      Body: testContent,
      ContentType: "text/plain",
    });

    await s3Client.send(uploadCommand);
    console.log(`✅ Successfully uploaded test file: ${testKey}`);
    console.log(`Bucket: ${process.env.AWS_S3_EDITORIAL_BUCKET_NAME}`);
    console.log(
      `URL: https://${process.env.AWS_S3_EDITORIAL_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${testKey}`
    );

    console.log("\n🎉 AWS S3 upload to editorial bucket is working!");
    console.log(
      "Your credentials are fine - the API route issue is with Next.js, not AWS."
    );
  } catch (error) {
    console.error("❌ S3 test failed:", error.message);
    if (error.Code) {
      console.error("Error Code:", error.Code);
    }
  }
}

testS3Connection();
