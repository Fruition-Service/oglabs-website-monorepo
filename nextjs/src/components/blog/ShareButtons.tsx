"use client";

// The "Share" code component on Framer's post template (plugin 84d4c1): LinkedIn, X, Facebook,
// Email and Copy link, 36px #333 squares (radius 8, 12px apart) with an 18px white icon, turning OG
// orange on hover (background-color 0.2s ease). Shares the current page URL with "Check this out!".
import { useEffect, useState } from "react";

type Platform = "LinkedIn" | "Twitter" | "Facebook" | "Email" | "Copy";
const PLATFORMS: Platform[] = ["LinkedIn", "Twitter", "Facebook", "Email", "Copy"];
const MESSAGE = "Check this out!";
const BUTTON = "var(--token-941dc06b-87ea-4bfd-9f0e-231bee443435, rgb(42, 47, 54))";
const HOVER = "var(--token-3756c145-13f1-478e-9253-4a4e46de6da3, rgb(247, 59, 31))";
const ICON = "var(--token-d0c27c52-5598-475d-b517-ac18042bf84b, rgb(255, 255, 255))";

function Icon({ name, copied, title }: { name: Platform; copied: boolean; title: string }) {
  const p = { width: 18, height: 18, viewBox: "0 0 24 24" };
  switch (name) {
    case "LinkedIn":
      return (
        <svg {...p} fill={ICON}>
          <title>{title}</title>
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg {...p} fill={ICON}>
          <title>{title}</title>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg {...p} fill={ICON}>
          <title>{title}</title>
          <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
        </svg>
      );
    case "Email":
      return (
        <svg {...p} fill="none">
          <title>{title}</title>
          <path
            d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
            fill={ICON}
          />
        </svg>
      );
    case "Copy":
      return copied ? (
        <svg {...p} fill={ICON}>
          <title>{title}</title>
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      ) : (
        <svg {...p} fill={ICON}>
          <title>{title}</title>
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
        </svg>
      );
  }
}

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [hovered, setHovered] = useState<Platform | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the page URL only exists in the browser
    setUrl(`${window.location.origin}${window.location.pathname}`);
  }, []);

  function share(name: Platform) {
    const u = encodeURIComponent(url);
    const m = encodeURIComponent(MESSAGE);
    let target = "";
    if (name === "LinkedIn") target = `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    else if (name === "Twitter") target = `https://twitter.com/intent/tweet?text=${m}%20${u}`;
    else if (name === "Facebook") target = `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    else if (name === "Email") target = `mailto:?subject=${m}&body=${m}%20${u}`;
    else {
      navigator.clipboard?.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
      return;
    }
    window.open(target, "_blank", "noopener,noreferrer");
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 12, alignItems: "center", justifyContent: "center", width: "max-content", height: "max-content" }}>
      {PLATFORMS.map((name) => (
        <div
          key={name}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}
          onClick={() => share(name)}
          onMouseEnter={() => setHovered(name)}
          onMouseLeave={() => setHovered(null)}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              backgroundColor: hovered === name ? HOVER : BUTTON,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s ease",
            }}
          >
            <Icon name={name} copied={copied} title={title} />
          </div>
        </div>
      ))}
    </div>
  );
}
