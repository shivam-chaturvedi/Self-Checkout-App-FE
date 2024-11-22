import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section 
                className="relative py-16 bg-cover bg-center" 
                style={{ backgroundImage: "url('/images/banner.jpg')" }}
            >
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 bg-[#FFFFFF] bg-opacity-70"></div>
                
                <div className="relative container mx-auto px-6 text-center text-[#141715]">
                    <h1 className="text-5xl font-extrabold leading-tight">
                        Welcome to <span className="text-[#de6c2a]">RetailEdge</span>
                    </h1>
                    <p className="mt-6 text-xl text-[#1b1a1a]">
                        Revolutionize your shopping experience with our self-checkout app.
                    </p>
                    <Link 
                        to="/cart" 
                        className="mt-8 inline-block bg-[#de6c2a] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#c0581f] transition shadow-lg"
                    >
                        Start Shopping
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Features</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
                            <img 
                                src="/images/qr-scan.jpg" 
                                alt="QR Scan" 
                                className="w-16 mx-auto mb-4"
                            />
                            <h4 className="text-lg font-semibold text-[#de6c2a]">
                                Quick QR Scanning
                            </h4>
                            <p className="text-gray-600 mt-2">
                                Easily scan products with your device's camera to add them to your cart.
                            </p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
                            <img 
                                src="/images/self-checkout-icon.jpg" 
                                alt="Self Checkout" 
                                className="w-16 mx-auto mb-4"
                            />
                            <h4 className="text-lg font-semibold text-[#de6c2a]">
                                Self Checkout
                            </h4>
                            <p className="text-gray-600 mt-2">
                                Enjoy the convenience of checking out your items without waiting in line.
                            </p>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
                            <img 
                                src="/images/secure-payment-icon.png" 
                                alt="Secure Payment" 
                                className="w-16 mx-auto mb-4"
                            />
                            <h4 className="text-lg font-semibold text-[#de6c2a]">
                                Secure Payments
                            </h4>
                            <p className="text-gray-600 mt-2">
                                Process your payments securely and efficiently right within the app.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-[#C6E7FF]">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Users Say</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/3 text-center">
                            <p className="text-gray-600 italic">
                                "RetailEdge has made my shopping experience so much faster and easier. I love it!"
                            </p>
                            <h4 className="mt-4 font-bold text-gray-800">- Priya Sharma</h4>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/3 text-center">
                            <p className="text-gray-600 italic">
                                "No more long queues! This app is a game-changer."
                            </p>
                            <h4 className="mt-4 font-bold text-gray-800">- Aman Gupta</h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
                    <div className="max-w-4xl mx-auto">
                        <details className="mb-4 border-b pb-2">
                            <summary className="text-lg font-semibold cursor-pointer">
                                Is RetailEdge compatible with all devices?
                            </summary>
                            <p className="mt-2 text-gray-600">
                                Yes, RetailEdge works seamlessly on both Android and iOS devices.
                            </p>
                        </details>
                        <details className="mb-4 border-b pb-2">
                            <summary className="text-lg font-semibold cursor-pointer">
                                How secure are my payments?
                            </summary>
                            <p className="mt-2 text-gray-600">
                                We use industry-standard encryption to ensure all transactions are safe and secure.
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 bg-[#FFF2D7]">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-[#141715] mb-4">
                        Ready to Shop Smarter?
                    </h2>
                    <p className="text-gray-700 text-lg mb-6">
                        Download RetailEdge today and enjoy a hassle-free shopping experience.
                    </p>
                    <Link 
                        to="/download" 
                        className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition shadow-md"
                    >
                        Download the App
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#C6E7FF] text-[#141715] py-6">
                <div className="container mx-auto px-6 text-center">
                    <p className="mb-2">&copy; 2024 RetailEdge. All Rights Reserved.</p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/terms" className="hover:underline text-[#de6c2a]">Terms of Service</Link>
                        <Link to="/privacy" className="hover:underline text-[#de6c2a]">Privacy Policy</Link>
                        <Link to="/contact" className="hover:underline text-[#de6c2a]">Contact Us</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;