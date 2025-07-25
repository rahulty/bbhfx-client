import type { NextConfig } from "next";
import { RemotePattern } from "next/dist/shared/lib/image-config";

let remotePatterns: RemotePattern[] | undefined = [
  {
    protocol: "http",
    hostname: "localhost",
    port: "1337",
    pathname: "/uploads/**/*",
  },
];

if (process.env.PROD_API_DOMAIN) {
  remotePatterns.push({
    protocol: "https",
    hostname: process.env.PROD_API_DOMAIN,
    pathname: "/uploads/**/*",
  });
}

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns,
  },
};

export default nextConfig;
