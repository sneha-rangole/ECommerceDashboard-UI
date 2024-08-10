import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username && password) {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const users = await response.json();

        // Check if user exists and password matches
        const user = users.find(user => user.userId === username && user.password === password); // Note: Replace with hashed password check in production!

        if (user) {
          onLogin(user); 
          navigate('/dashboard'); 
        } else {
          setError('Invalid username or password');
        }
      } catch (err) {
        setError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
        <div className="login">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
    
  );
};

export default Login;