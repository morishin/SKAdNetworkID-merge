import Converter from "~/app/converter/Converter";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.root}>
      <main className={styles.container}>
        <h1>SKAdNetworkID-merge</h1>
        <Converter />
      </main>
    </div>
  );
}
