// PLACEHOLDER: the shell builder replaces this with the real Framer footer.
export default function Footer({ variant }: { variant: "full" | "compact" }) {
  return <footer data-section="Footer" data-variant={variant} style={{ height: variant === "full" ? 1070 : 543 }} />;
}
