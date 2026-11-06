import type { ReactNode } from "react";
import type { Lang } from "@/lib/content";

// Runs before paint so a saved light theme doesn't flash dark.
const THEME_SCRIPT = `try{document.documentElement.dataset.theme=localStorage.getItem("annotica-theme")||"dark"}catch(e){}`;

export default function RootHtml({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
