import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reports = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('/api/reports') // Assuming your backend route for generating reports is '/api/reports'
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error('Error fetching report data:', error);
            });
    }, []);

    return (
        <div className="reports">
            <h2>Reports</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        {/* Add more table headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            {/* Add more table data cells as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reports;