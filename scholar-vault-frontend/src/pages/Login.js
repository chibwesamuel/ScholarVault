import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                history.push('/dashboard');
            }
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;