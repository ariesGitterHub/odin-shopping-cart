import { useState } from "react";
import styles from "../styles/Navbar.module.css"; // TODO- move later in it's own module.css
// import Dropdown from "./Dropdown";

export default function Searchbar({ onSearch }) {
  const [timer, setTimer] = useState(null); // Track the timer state

  const handleChange = (e) => {
    const value = e.target.value;

    // Clear the previous timer to prevent multiple calls
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timer that calls onSearch after a delay (300ms in this case)
    const newTimer = setTimeout(() => {
      onSearch(value); // Execute the search after the delay
    }, 300); // Adjust the delay time as needed

    setTimer(newTimer); // Store the new timer ID
  };
  return (
    <div className={styles.searchContainer}>
      {/* <p>Search</p> */}
      <form action="">
        {/* <fieldset> */}
        {/* <legend>By title or author</legend> */}
        {/* <label for="search-term"></label> */}
        <input
          type="text"
          className={styles.search}
          placeholder="Search by animal (e.g., lion, feline, mammal)..."
          onChange={handleChange} // Calls handleChange to update searchQuery
        />
        {/* </fieldset>        */}
      </form>
    </div>
  );
}
