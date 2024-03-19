import React from 'react';

const Logout = () => {
    const handleLogout = () => {
        // Add logout logic using API service or context here
        console.log('Logged out');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;