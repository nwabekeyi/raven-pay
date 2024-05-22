import React, { useState } from 'react';
import Button from '../../ui-components/button';
import AuthInput from '../../ui-components/authInput';
import './authForm.css';

const AuthForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <AuthInput
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button auth type="submit">Authenticate</Button>
    </form>
  );
};

export default AuthForm;
