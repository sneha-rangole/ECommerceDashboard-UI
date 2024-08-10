// src/Dashboard/AdminDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar'; 
import Orders from './Orders/Orders'; 
import Products from './Products/Products'; 

const AdminDashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout} />
      <Routes>
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
