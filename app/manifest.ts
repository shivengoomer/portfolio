import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shiven Goomer Portfolio",
    short_name: "Portfolio",
    description:
      "Shiven Goomer's Portfolio",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/x-icon",
      },
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/x-icon",
        purpose: "maskable",
      },
    ],
    categories: [
      "portfolio",
      "template",
      "development",
      "nextjs",
      "react",
      "developer",
      "web development",
      "open source",
    ],
    lang: "en",
    dir: "ltr",
    scope: "/",
  };
}
