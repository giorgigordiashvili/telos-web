import Logo from "@/components/Logo";
import styles from "./page.module.css";
import PrimeryButton from "@/components/PrimeryButton";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Logo />
        <p>Our website is under construction. Please check back later</p>
        <PrimeryButton variant="blue">lurji knopka</PrimeryButton>
        <PrimeryButton variant="white">tetri knopka</PrimeryButton>
      </main>
    </div>
  );
}
