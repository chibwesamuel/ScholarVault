import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        // Add register logic using API service here
        console.log(formData);
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
                <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
                <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" required />
                <input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={onChange} minLength="6" required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;