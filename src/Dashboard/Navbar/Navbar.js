// src/Dashboard/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user = {}, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const userInitial = user.fullName ? user.fullName.charAt(0) : '?'; 

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard/orders">Orders</Link>
        <Link to="/dashboard/products">Products</Link>
      </div>
      <div className="navbar-right">
        <div className="user-profile" onClick={toggleDropdown}>
          <div className="profile-circle">
            {userInitial}
          </div>
          <div className={`dropdown ${dropdownOpen ? 'show' : ''}`}>
            <div className="dropdown-item">Role: {user.role || 'N/A'}</div>
            <div className="dropdown-item">Username: {user.fullName || 'N/A'}</div>
            <div className="dropdown-item">Language: {user.language || 'N/A'}</div>
            <div className="dropdown-item">Country: {user.country || 'N/A'}</div>
            <div className="dropdown-item">Company: {user.companyName || 'N/A'}</div>
            <button onClick={onLogout} className="dropdown-item logout-button">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;