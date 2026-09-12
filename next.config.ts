import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Formatos modernos para las imágenes servidas por next/image.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
