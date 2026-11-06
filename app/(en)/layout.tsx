import RootHtml from "@/components/RootHtml";
import { pageMetadata } from "@/lib/metadata";
import "../fonts.css";
import "../globals.css";

export { viewport } from "@/lib/metadata";
export const metadata = pageMetadata("en");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootHtml lang="en">{children}</RootHtml>;
}
