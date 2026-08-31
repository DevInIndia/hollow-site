import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site renders predetermined content. Nothing here needs a server at
  // runtime, so every route is exported as static HTML.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
