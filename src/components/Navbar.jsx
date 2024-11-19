// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = ({ exclude = [] ,isLoggedIn}) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const location = useLocation();


    // Check if the current path is in the exclude list
    if (exclude.includes(location.pathname)) {
        return null; // Do not render navbar for excluded pages
    }

    const handleMenuToggle = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };


    return (
        <nav className="bg-[#C6E7FF] p-4 shadow-lg text-black">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo and App Name */}
                <Link className="flex items-center space-x-2" to="/">
                    <img src="/favicon.ico" alt="Logo" className="h-8 w-8" />
                    <h1 className="text-white text-2xl font-bold">Retail Edge</h1>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-4 text-black">
                    {isLoggedIn ? (
                        // Default Navbar for Logged In Users
                        <>
                            <Link to="/" className=" hover:bg-[#d6a560] px-4 py-2 rounded transition">Home</Link>
                            <Link to="/admin" className=" hover:bg-[#d6a560] px-4 py-2 rounded transition">Admin</Link>
                            <Link to="/cart" className=" hover:bg-[#d6a560] px-4 py-2 rounded transition">Cart</Link>
                            <Link to="/profile" className=" hover:bg-[#d6a560] px-4 py-2 rounded transition">Profile</Link>
                            <Link to="/logout" className=" hover:bg-[#d84343] hover:text-white px-4 py-2 rounded transition">Logout</Link>
                        </>
                    ) : (
                        // Navbar for Logged Out Users
                        <>
                            <Link to="/login" className=" hover:bg-[#d6a560]  px-4 py-2 rounded transition">Login</Link>
                            <Link to="/signup" className=" hover:bg-[#d6a560]  px-4 py-2 rounded transition">Sign Up</Link>
                        </>
                    )}
                </div>

                {/* Burger Menu for Mobile */}
                <button onClick={handleMenuToggle} className="md:hidden text-white focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-2 space-y-2">
                    {isLoggedIn ? (
                        <>
                            <Link to="/" className="block text-white hover:bg-green-600 px-4 py-2 rounded transition">Home</Link>
                            <Link to="/admin" className="block text-white hover:bg-green-600 px-4 py-2 rounded transition">Admin</Link>
                            <Link to="/cart" className="block text-white hover:bg-green-600 px-4 py-2 rounded transition">Cart</Link>
                            <Link to="/profile" className="block text-white hover:bg-green-600 px-4 py-2 rounded transition">Profile</Link>
                            <Link to="/logout" className="block text-white hover:bg-red-600 px-4 py-2 rounded transition">Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block text-white hover:bg-green-600 px-4 py-2 rounded transition">Login</Link>
                            <Link to="/signup" className="block text-white hover:bg-green-600 px-4 py-2 rounded transition">Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
