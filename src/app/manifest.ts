import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wordle - Raeveira",
    short_name: "Wordle",
    description:
      "A simple wordle game using social issue words to educate / make people aware of social issues",
    start_url: "/",
    display: "standalone",
    background_color: "#E9F5E9",
    theme_color: "#E9F5E9",
    icons: [
      {
        src: "/images/logos/logo-rounded.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logos/logo-rounded.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
