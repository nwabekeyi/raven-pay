import { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'; // Import arrow icons
import './dropdown.css';

const Dropdown = ({ label, options, onSelect, market }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const buttonID = market ? "dropdown__toggle--market" : "dropdown__toggle--day";

  return (
    <div className="dropdown">
      <button
        id={buttonID}
        className={`dropdown__toggle ${isOpen ? 'dropdown__toggle--open' : ''}`}
        onClick={toggleDropdown}
      >
        {label}
        {/* Use arrow icons */}
        {isOpen ? <BsChevronUp size={10} className="dropdown__arrow" /> : <BsChevronDown size={10} className="dropdown__arrow" />}
      </button>
      {isOpen && (
        <ul className="dropdown__menu">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown__menu-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
