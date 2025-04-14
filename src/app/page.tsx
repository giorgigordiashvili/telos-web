import Logo from "@/components/Logo";
import styles from "./page.module.css";
import PrimeryCheckbox from "@/components/PrimeryCheckbox";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Logo />
        <PrimeryCheckbox label="By submitting this form, you agree to our Privacy Policy"></PrimeryCheckbox>
        <p>Our website is under construction. Please check back later</p>
      </main>
    </div>
  );
}
