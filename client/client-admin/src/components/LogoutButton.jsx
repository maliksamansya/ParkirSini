import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
    Swal.fire('You are logged out')
  };

  return (
    <button className="btn btn-warning text-dark" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
