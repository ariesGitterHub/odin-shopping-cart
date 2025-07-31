import { useState } from "react";
import styles from "../styles/Dropdown.module.css";

export default function Dropdown({ label = "Select", options = [], onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect?.(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        {selected || label} ▼
      </button>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map((opt, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(opt)}
              className={styles.dropdownItem}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
