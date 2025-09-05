import { Link } from "react-router-dom";
import styles from "../styles/NotFound.module.css";
import imgNotFound from "../assets/imgNotFound.JPG";

export default function NotFound() {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.titleTextContainer}>
          <h1>404 Page Not Found</h1>
          <p>
            Sorry, this page doesn't exist, but hey, it happens to the best of
            us. <span>Go back to <Link to="/">Home</Link>.</span>
          </p>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={imgNotFound}
            alt="Woman wearing a lion onesie strolls away."
          />
        </div>
      </div>
    </>
  );
}
