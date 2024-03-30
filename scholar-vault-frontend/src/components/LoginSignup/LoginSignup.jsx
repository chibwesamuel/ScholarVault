import React from 'react';
import './LoginSignup.css';
import { FaUser, FaLock } from "react-icons/fa";

const LoginSignup = () => {
    return (
        <div className='wrapper'>
            <form action="">
                <h1>ScholarVault</h1>
                <div className="underline"></div>
                <h1>Sign Up</h1>
                <div className="input-box">
                    <input type="text" placeholder='Username' required/>
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' required/>
                    <FaLock className='icon' />
                </div>

                <div className="remember-forgot">
                    <label> <input type='checkbox' />Remember Me</label>
                    <a href='#'>Forgot Password?</a>
                </div>
                <div className="submit-container">
                    <div type='submit'>Sign Up</div>
                    <div type='submit'>Login</div>
                </div>
                

                <div className='register-link'>
                <p>Don't have an account yet? <a href='#'>Register</a></p>
                </div>
            </form>
        </div>
    )
}

export default LoginSignup