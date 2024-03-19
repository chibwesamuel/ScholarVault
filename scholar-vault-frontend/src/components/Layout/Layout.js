import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <Navigation />
            <main className="content">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;