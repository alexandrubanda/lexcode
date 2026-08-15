import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lexcode",
    short_name: "Lexcode",
    description: "Words in. Software out.",
    start_url: "/",
    display: "standalone",
    background_color: "#F3F2F2",
    theme_color: "#201E1D",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
