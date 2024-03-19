import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inventory = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('/api/items') // Assuming your backend route for fetching items is '/api/items'
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
            });
    }, []);

    return (
        <div className="inventory">
            <h2>Inventory</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        {/* Add more table headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            {/* Add more table data cells as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inventory;