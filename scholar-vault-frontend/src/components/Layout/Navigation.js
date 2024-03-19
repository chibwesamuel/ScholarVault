import React from 'react';

const Navigation = () => {
    return (
        <nav className="navigation">
            <a href="/">Home</a>
            <a href="/inventory">Inventory</a>
            <a href="/add-item">Add Item</a>
            <a href="/reports">Reports</a>
            <a href="/logout">Logout</a>
            {/* Add more navigation links as needed */}
        </nav>
    );
};

export default Navigation;