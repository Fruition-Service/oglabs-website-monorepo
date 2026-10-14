// "Elements/Badge" (Framer module b10ivNi93): a pill with a dot and a mono label. STUB: the shell
// builder replaces the visuals; keep the props stable. Colours default to Framer's defaults.
export type BadgeProps = {
  title: string;
  textColor?: string;
  dotColor?: string;
  bgColor?: string;
  className?: string;
};

export default function Badge({ title, className }: BadgeProps) {
  return <div className={className}>{title}</div>;
}
