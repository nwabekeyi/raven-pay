import React from 'react';
import './authInput.css';

const AuthInput = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input"
    />
  );
};

export default AuthInput;
