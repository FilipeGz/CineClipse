import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileBox.css';

const ProfileBox = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/perfil");
  };

  return (
    <div className="profile-box" onClick={handleClick} style={{cursor: "pointer"}}>
      <img
        src="/images/avatar.png"
        alt="Avatar"
        className="profile-avatar"
      />
      <span className="profile-name">Olá, usuário!</span>
    </div>
  );
};

export default ProfileBox;