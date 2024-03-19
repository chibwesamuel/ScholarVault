import React from 'react';

const ItemCard = ({ item }) => {
    return (
        <div className="item-card">
            <h3>{item.name}</h3>
            <p>Category: {item.category}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price}</p>
            <p>Description: {item.description}</p>
            {/* Add more item details as needed */}
        </div>
    );
};

export default ItemCard;