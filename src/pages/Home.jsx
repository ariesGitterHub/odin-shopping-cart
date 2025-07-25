import imgHome from "../assets/imgHome.JPG";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        <p>Welcome to...</p>
        <h1>Funzy Onesies!</h1>
      </div>
    <div className={styles.imgContainer}>
      <img src={imgHome} alt="Woman wearing a green frog onesie at home." />
    </div>
    </div>
  );
}
