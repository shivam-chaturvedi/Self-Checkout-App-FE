import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BubbleAnimation from '../components/BubbleAnimation';
import { BACKEND_SERVER_URL } from '../utils/config';

const LoginPage = ({setIsLoggedIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation for email and password
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        // Proceed with form submission (you can send a request to the server here)
            try {
                const res = await fetch(`${BACKEND_SERVER_URL}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",  // Set correct Content-Type for JSON
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });
        
                const data = await res.json();  // Make sure to await the JSON response
    
        
                if (res.ok) {
                    localStorage.setItem("jwt_token",data.success);
                    setIsLoggedIn(true);
                    navigate('/');  // Navigate to login page on success
                    setError('');  // Clear any error messages
                } else {
                    setError(data.error || "An error occurred");  // Display the error from the response
                }
            } catch (error) {
                console.error(error);
                setError(error.message || "An unexpected error occurred");  // Handle any unexpected errors
            }
        };

    return (
        <>
        {/* Bubble animation in the background */}
        <div className="relative w-full h-screen">
            <BubbleAnimation /> {/* Bubble animation component */}

            <section className="absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="relative w-full max-w-md bg-transparent rounded-lg shadow-md  dark:border-gray-700 p-6 space-y-4 z-20">
                    <Link to="/" className="bg-green-300 max-w-fit p-2 rounded-md flex items-center mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="/favicon.ico" alt="logo" />
                        Retail Edge
                    </Link>

                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Login to your account
                    </h1>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-center mb-3">{error}</p>}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="name@company.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Login
                        </button>

                        {/* Sign-up Redirect */}
                        <p className="text-sm font-light text-blue-800 bg-gray-200 p-2 rounded-full dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                Create one here
                            </Link>
                        </p>
                    </form>
                </div>
            </section>
        </div>
        </>
    );
};

export default LoginPage;
