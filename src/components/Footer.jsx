import styles from "../styles/Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const MMM = `A Mad Muffin Man Design © ${currentYear}`;

  return (
    <div className={styles.footer}>
      <p>{MMM}</p>
    </div>
  );
}
