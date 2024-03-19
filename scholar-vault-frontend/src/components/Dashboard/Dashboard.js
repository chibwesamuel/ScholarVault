import React from 'react';
import Navbar from '../common/Navbar';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import Footer from '../common/Footer';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Navbar />
            <Sidebar />
            <DashboardContent />
            <Footer />
        </div>
    );
};

export default Dashboard;