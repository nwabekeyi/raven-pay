import React, { useContext } from 'react';
import { AvatarContext } from '../../context/avatarContext';
import './gravatar.css';

const Gravatar = () => {
  const { email, username, avatarUrl } = useContext(AvatarContext);

  return (
    <div className="gravatar-page">
      {avatarUrl ? (
        <img className="gravatar-page__avatar" src={avatarUrl} alt="User Avatar" />
      ) : (
        <img
          className="gravatar-page__avatar"
          src="https://via.placeholder.com/100" // URL to a placeholder image
          alt="Blank Avatar"
        />
      )}
      <p className="gravatar-page__username">{username}</p>
      <p className="gravatar-page__info">Email: {email}</p>
    </div>
  );
};

export default Gravatar;
