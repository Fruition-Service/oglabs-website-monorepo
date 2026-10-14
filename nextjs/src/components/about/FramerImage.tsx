// Framer's image fill: an absolutely positioned wrapper inside the sized frame, holding an <img>
// that covers it with object-fit (Framer "fill" = cover, "fit" = contain).
import type { CSSProperties } from "react";

export default function FramerImage({
  src,
  alt = "",
  fit = "cover",
  position = "center",
  width,
  height,
  sizes,
  eager,
  style,
}: {
  src: string;
  alt?: string;
  fit?: "cover" | "contain";
  position?: string;
  width?: number;
  height?: number;
  sizes?: string;
  eager?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div style={{ position: "absolute", borderRadius: "inherit", inset: 0 }}>
      <img
        decoding="async"
        loading={eager ? undefined : "lazy"}
        width={width}
        height={height}
        sizes={sizes}
        src={src}
        alt={alt}
        style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", objectPosition: position, objectFit: fit, ...style }}
      />
    </div>
  );
}
