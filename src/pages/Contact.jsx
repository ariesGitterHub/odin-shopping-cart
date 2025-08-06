import imgContact from "../assets/imgContact.JPG";
import styles from "../styles/Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>Contact us...</h1>
        <img
          src={imgContact}
          alt="A man in a kangaroo onesie pricks up his ears to listen."
        />
      </div>
      <div className={styles.textContainer}>
        <p>
          Got questions, compliments, or photos of you living your best
          animal-onesie life? We'd love to hear from you! <span className={styles.italic}>We're here to help, because life's too short for boring pajamas.</span>
        </p>
        <br />
        <h2>Email</h2>
        <p className={styles.bold}>support@funzy-onesies.com</p>
        <p>
          We typically respond within 24 hours, Monday through Friday. Weekend emails may be answered while wearing a sloth onesie, so please be patient.
        </p>
        <br />
        <h2>Phone</h2>
        <p className={styles.bold}>1-555-FUN-ONES</p>
        <p>
          Phone support is available Monday to Friday, 9AM-5PM (EST). (Yes, it's
          a real number. Yes, a real human will answer.)
        </p>
        <br />
        <h2>Social Media</h2>
        <p className={styles.bold}>Instagram: @fun_onesies</p>
      </div>
    </div>
  );
}
