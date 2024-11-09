// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';
import { checkAuth } from './utils/auth';  // Import the checkAuth function
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const App = () => {
    //function that checks if the user is logged in
    const isLoggedIn = checkAuth();

    return (
        <Router>
            <Navbar exclude={['/login','/signup']}/>

            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* Protected Routes */}
                <Route path="/admin" element={isLoggedIn ? <AdminPage /> : <Navigate to="/login" />} />
                <Route path="/products" element={isLoggedIn ? <ProductsPage /> : <Navigate to="/login" />} />
                <Route path="/cart" element={isLoggedIn ? <CartPage /> : <Navigate to="/login" />} />
                <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
                <Route path="/logout" element={isLoggedIn ? <LogoutPage />:<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/signup" element={<SignupPage/>} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
