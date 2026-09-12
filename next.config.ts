import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Formatos modernos para las imágenes servidas por next/image.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  compress: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Sin includeSubDomains: los subdominios de correo de Microsoft 365
          // quedan fuera del alcance de esta política a propósito.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
