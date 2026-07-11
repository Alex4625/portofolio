import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-bb3ad634e09444a1b3bcbe6d9cdef19e.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
