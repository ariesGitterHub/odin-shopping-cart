import { useState } from "react";
import styles from "../styles/Dropdown.module.css";

export default function Dropdown({ label = "Select", options = [], onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect?.(option);
    // setIsOpen(false);
    // setTimeout(() => setIsOpen(false), 3000);
      // console.log("Will close in 3s...");
      setTimeout(() => {
        // console.log("Closing now.");
        setIsOpen(false);
      }, 3000);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        {selected || label} ▼
      </button>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className={styles.dropdownItem}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
