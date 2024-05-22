import React, { useContext } from 'react';
import AuthForm from '../../dashboard-components/authForm';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';
import './authPage.css';
import { AvatarContext } from '../../context/avatarContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { setEmail, setUsername, setAvatarUrl, setError, setLoading, loading, error } = useContext(AvatarContext);

  const handleSubmit = async (email) => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    await fetchUserData(email);
  };

  const fetchUserData = async (email) => {
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}?d=identicon&s=200`;

    try {
      const githubResponse = await fetch(`https://api.github.com/search/users?q=${email} in:email`);
      const githubData = await githubResponse.json();

      if (githubData.items.length > 0) {
        const username = githubData.items[0].login;
        setEmail(email);
        setUsername(username);
        setAvatarUrl(gravatarUrl);
        navigate('/dashbaord');
        setError('');
      } else {
        setError('No GitHub user found with this email.');
        setAvatarUrl('');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error fetching data. Please try again.');
      setAvatarUrl('');  // Ensure avatar URL is blank if there's an error
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="auth-screen">
      <h1 className="auth-screen__title">LOGIN</h1>
      <AuthForm onSubmit={handleSubmit} />
      {loading && <p className="auth-screen__loading">Loading...</p>}
      {error && <p className="auth-screen__error">{error}</p>}
    </div>
  );
};

export default AuthPage;
