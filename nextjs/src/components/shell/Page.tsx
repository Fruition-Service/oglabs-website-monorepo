import Grain from "./Grain";
import Navigation from "./Navigation";
import Footer from "./Footer";

// The frame every route renders in: navigation, the page's sections, the footer, and the grain
// overlay on top. `footer="full"` is the version with the big call-to-action band (1070px tall at
// 1440); "compact" (543px) is what blog posts, the blog listing and legal pages use.
export default function Page({ children, footer = "full" }: { children: React.ReactNode; footer?: "full" | "compact" }) {
  return (
    <div className="page">
      <Navigation />
      {children}
      <Footer variant={footer} />
      <Grain />
    </div>
  );
}
