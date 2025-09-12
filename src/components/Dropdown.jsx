// NOTE - This code fixes missing keyboard and tab focusing issues

import { useState, useRef, useEffect } from "react";
import styles from "../styles/Dropdown.module.css";

export default function Dropdown({ label = "Select", options = [], onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (isOpen && itemRefs.current.length > 0) {
      itemRefs.current[0]?.focus();
    }
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect?.(option);
    setIsOpen(false);
    buttonRef.current?.focus(); // Return focus to button
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % options.length;
      itemRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + options.length) % options.length;
      itemRefs.current[prev]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(options[index]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <div className={styles.dropdown}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={styles.dropdownButton}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selected || label} ▼
      </button>

      {isOpen && (
        <ul
          className={styles.dropdownList}
          role="listbox"
          tabIndex="-1"
          ref={listRef}
        >
          {options.map((option, index) => (
            <li
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              role="option"
              tabIndex={0}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-selected={selected === option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
