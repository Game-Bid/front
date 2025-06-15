import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["gamebid-bucket.s3.ap-northeast-2.amazonaws.com"],
  },
  serverActions: {
    bodySizeLimit: "10mb",
  },
};

export default nextConfig;
