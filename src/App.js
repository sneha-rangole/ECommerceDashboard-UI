// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Dashboard/Login/Login';
import AdminDashboard from './Dashboard/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); 
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); 
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
          <Route path="/dashboard/*" element={user ? <AdminDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;