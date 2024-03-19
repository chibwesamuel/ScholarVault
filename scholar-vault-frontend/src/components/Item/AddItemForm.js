import React, { useState } from 'react';

const AddItemForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: 0,
        price: 0,
        description: '',
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: '',
            category: '',
            quantity: 0,
            price: 0,
            description: '',
        });
    };

    return (
        <form className="add-item-form" onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" />
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" />
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            <button type="submit">Add Item</button>
        </form>
    );
};

export default AddItemForm;