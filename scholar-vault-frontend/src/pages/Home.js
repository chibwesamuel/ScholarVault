import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <h2>Welcome to ScholarVault</h2>
            <p>ScholarVault is a school inventory management system.</p>
            <p>Please <Link to="/register">create an account</Link> or <Link to="/login">log in</Link> to get started.</p>
        </div>
    );
};

export default Home;