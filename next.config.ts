import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["gamebid-bucket.s3.ap-northeast-2.amazonaws.com"],
  },
  serverActions: {
    bodySizeLimit: "10mb", // 필요에 따라 크기 조정 (예: '5mb', '20mb' 등)
  },
};

export default nextConfig;
