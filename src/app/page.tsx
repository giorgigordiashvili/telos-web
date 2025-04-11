"use client";

import Logo from "@/components/Logo";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Logo />

        <p>Our website is under construction. Please check back later</p>
      </main>
    </div>
  );
}
