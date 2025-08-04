import imgAbout from "../assets/imgAbout.JPG";
import styles from "../styles/About.module.css";

export default function About() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>About us...</h1>
        <img
          src={imgAbout}
          alt="Same woman wearing a koala onesie shown from different angles."
        />
      </div>
      <div className={styles.textContainer}>
        <p>
          At Funzy Onesies!, we believe comfort shouldn't come at the cost of
          personality. Founded by a group of quirky, animal-loving, pajama
          enthusiasts in 2014, our mission is simple: bring joy, comfort, and a
          little bit of wild flair to your everyday wardrobe. So whether you're lounging at home or making a statement at your next costume party, Funzy Onesies! has your cozy side covered.
        </p>
      </div>
    </div>
  );
}