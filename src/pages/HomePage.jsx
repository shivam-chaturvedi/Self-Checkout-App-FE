import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-green-600">Welcome to Retail Edge</h2>
                    <p className="mt-4 text-gray-700 text-lg">
                        Experience seamless, queue-free shopping with our self-checkout app. 
                    </p>
                    <Link to="/cart" className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition">
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Features</h3>
                    <div className="flex flex-wrap justify-center">
                        {/* Feature 1 */}
                        <div className="w-full md:w-1/3 px-6 mb-8 hover:scale-105 transition-all duration-300">
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <img src="/images/qr-scan.jpg" alt="QR Scan" className="w-16 mx-auto mb-4"/>
                                <h4 className="text-lg font-semibold text-green-600">Quick QR Scanning</h4>
                                <p className="text-gray-600 mt-2">Easily scan products with your device's camera to add them to your cart.</p>
                            </div>
                        </div>
                        {/* Feature 2 */}
                        <div className="w-full md:w-1/3 px-6 mb-8 hover:scale-105 transition-all duration-300">
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <img src="/images/self-checkout-icon.jpg" alt="Self Checkout" className="w-16 mx-auto mb-4"/>
                                <h4 className="text-lg font-semibold text-green-600">Self Checkout</h4>
                                <p className="text-gray-600 mt-2">Enjoy the convenience of checking out your items without waiting in line.</p>
                            </div>
                        </div>
                        {/* Feature 3 */}
                        <div className="w-full md:w-1/3 px-6 mb-8 hover:scale-105 transition-all duration-300">
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <img src="/images/secure-payment-icon.png" alt="Secure Payment" className="w-16 mx-auto mb-4"/>
                                <h4 className="text-lg font-semibold text-green-600">Secure Payments</h4>
                                <p className="text-gray-600 mt-2">Process your payments securely and efficiently right within the app.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-green-500 text-white py-6 mt-auto">
                <div className="container mx-auto px-6 text-center">
                    <p className="mb-2">&copy; 2024 Retail Edge. All Rights Reserved.</p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/terms" className="hover:underline">Terms of Service</Link>
                        <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
