// Framer's CMS rich text (formattedText) as used by the blog post body and the legal pages, with the
// component's style presets: p 1ii346o, h1 jr195v, h2 1d1br79, h3 1vea7fj, blockquote 1idq5h6,
// table j4k40f, links 5g7c8e. The HTML is plain semantic tags (repo copies are pre-cleaned, HubSpot
// bodies go through sanitizeBody in src/lib/hubspot.ts), so the styles key off tag names.
import s from "./RichText.module.css";

export default function RichText({ html, className }: { html: string; className?: string }) {
  return <div className={className ? `${s.rich} ${className}` : s.rich} dangerouslySetInnerHTML={{ __html: html }} />;
}
