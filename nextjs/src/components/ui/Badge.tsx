// "Elements/Badge" (Framer module b10ivNi93): a pill with a dot and a mono label (preset foxgst,
// IBM Plex Mono 12px uppercase). Colours default to Framer's defaults.
import s from "./Badge.module.css";

export type BadgeProps = {
  title: string;
  textColor?: string;
  dotColor?: string;
  bgColor?: string;
  className?: string;
};

export default function Badge({
  title,
  textColor = "var(--token-442a8080-47a9-427e-9581-c23ce6c42231, rgb(0, 0, 0))",
  dotColor = "var(--token-3756c145-13f1-478e-9253-4a4e46de6da3, rgb(245, 80, 56))",
  bgColor = "var(--token-88d213e0-d95e-4b98-8c02-65d9312f0240, rgba(0, 0, 0, 0.08))",
  className,
}: BadgeProps) {
  return (
    <div className={className ? `${s.badge} ${className}` : s.badge} data-framer-name="Default" style={{ backgroundColor: bgColor }}>
      <div className={s.dot} data-framer-name="Dot" style={{ backgroundColor: dotColor }} />
      <p className={`p-foxgst ${s.label}`} style={{ color: textColor }}>
        {title}
      </p>
    </div>
  );
}
