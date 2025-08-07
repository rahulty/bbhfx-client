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

if (process.env.STRAPI_API_URL) {
  const ur = new URL(process.env.STRAPI_API_URL);
  const obj: any = {
    protocol: ur.protocol.replace(":", ""),
    hostname: ur.hostname,
    port: ur.port,
    pathname: "/uploads/**/*",
  };
  remotePatterns.push(obj);
}

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  output: "standalone",
};

export default nextConfig;
