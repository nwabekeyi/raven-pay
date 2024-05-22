import { createContext, useState } from 'react';

export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const contextValue = {
    username,
    setUsername,
    email,
    setEmail,
    avatarUrl,
    setAvatarUrl,
    error,
    setError,
    loading,
    setLoading
  };

  return (
    <AvatarContext.Provider value={contextValue}>
      {children}
    </AvatarContext.Provider>
  );
};

