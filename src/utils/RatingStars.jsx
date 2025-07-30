import styles from "../styles/RatingStars.module.css";
import imgStarFull from "../assets/imgStarFull.svg";
import imgStarHalf from "../assets/imgStarHalf.svg";
import imgStarEmpty from "../assets/imgStarEmpty.svg";

export default function RatingStars({ rating }) {
  const number = Number(rating);
  const fullStars = Math.floor(number);
  const hasHalfStar = number - fullStars >= 0.5;
  const totalStars = 5;

  const stars = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<img key={`full-${i}`} src={imgStarFull} alt="Full star" />);
  }

  // Add half star
  if (hasHalfStar) {
    stars.push(<img key="half" src={imgStarHalf} alt="Half star" />);
  }

  // Add empty stars
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<img key={`empty-${i}`} src={imgStarEmpty} alt="Empty star" />);
  }

  return <span className={styles.ratingStarsSpan}>{stars}</span>;
}
