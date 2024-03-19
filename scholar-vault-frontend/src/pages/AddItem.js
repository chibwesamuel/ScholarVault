import React, { useState } from 'react';
import axios from 'axios';

const AddItem = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: '',
        price: '',
        description: '',
        // Add more fields as needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/items', formData) // Assuming your backend route for adding items is '/api/items'
            .then((response) => {
                console.log('Item added successfully:', response.data);
                // Reset form after successful submission if needed
                setFormData({
                    name: '',
                    category: '',
                    quantity: '',
                    price: '',
                    description: '',
                });
            })
            .catch((error) => {
                console.error('Error adding item:', error);
            });
    };

    return (
        <div className="add-item">
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                {/* Add form inputs with corresponding onChange handlers */}
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                {/* Add more input fields for other data */}
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddItem;