import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', userData);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div className="wrapper">
      <form action="">
        <div className="header">
          <h1>ScholarVault</h1>
          <div className="underline"></div>
          <div className="text">{action}</div>
        </div>
        <div className="input-box">
          {action === 'Login' ? (
            <div></div>
          ) : (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={userData.name}
                onChange={handleChange}
                required
              />
              <FaUser className="icon" />
            </>
          )}
        </div>
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <FaEnvelope className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <FaLock className="icon" />
        </div>
        {action === 'Sign Up' ? (
          <div></div>
        ) : (
          <div className="remember-forgot">
            Forgot Password? <span><a href='#'>Click Here!</a></span>
          </div>
        )}
        <div className="submit-wrapper">
          <button className={action === 'Login' ? 'submit gray' : 'submit'} onClick={() => { setAction('Login') }}>
            Login
          </button>
          <button className={action === 'Sign Up' ? 'submit gray' : 'submit'} onClick={() => { setAction('Sign Up') }}>
            Sign Up
          </button>
        </div>
        <div className="register-link">
          <p>Already have an account? <a href="#">Login</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
