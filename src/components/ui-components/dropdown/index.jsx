// src/components/dropdown/index.js
import React, { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import './dropdown.css';

const Dropdown = ({ options, onSelect, search }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    setFilteredOptions(
      options.filter(option =>
        option.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, options]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="dropdown">
      <button className="dropdown__toggle" onClick={() => setIsOpen(!isOpen)}>
        {searchQuery}
        {isOpen ? <IoIosArrowUp color="white" /> : <IoIosArrowDown color="white" />}
      </button>
      {isOpen && (
        <div className="dropdown__menu">
          {search && (
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="dropdown__search"
              placeholder="Search..."
            />
          )}
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="dropdown__option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
