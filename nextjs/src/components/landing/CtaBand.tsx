import Text from "./Text";
import styles from "./CtaBand.module.css";

// Dark closing band (heading + one line), no button on Framer.
export default function CtaBand({ title, text, clip }: { title: string; text: string; clip?: boolean }) {
  return (
    <div className={`${styles.band} ${clip ? styles.clip : ""}`}>
      <Text value={title} preset="1o4nxrd" as="h2" color="rgb(255, 255, 255)" />
      <Text value={text} preset="mzxkxl" color="rgb(255, 255, 255)" />
    </div>
  );
}
