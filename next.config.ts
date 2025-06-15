import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "img.clerk.com",
      "images.clerk.dev",
      "cdn.builder.io", // Keep any existing domains you have
      "am-t-listing-images.s3.us-east-2.amazonaws.com", // AWS S3 bucket for listing images
      // Add any other domains you use for images
    ],
  },
  /* config options here */
};

export default nextConfig;
