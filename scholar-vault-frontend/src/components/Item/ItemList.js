import React from 'react';
import ItemCard from './ItemCard';

const ItemList = ({ items }) => {
    return (
        <div className="item-list">
            <h2>Items List</h2>
            {items.map(item => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export default ItemList;