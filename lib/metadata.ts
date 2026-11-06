import type { Metadata, Viewport } from "next";
import { content, type Lang } from "./content";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e0f12",
};

export function pageMetadata(lang: Lang): Metadata {
  const { title, description } = content[lang].meta;
  return {
    metadataBase: new URL("https://annotica.ru"),
    title,
    description,
    alternates: {
      canonical: lang === "ru" ? "/" : "/en",
      languages: { ru: "/", en: "/en" },
    },
  };
}
