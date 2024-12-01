import React from 'react';

const HomeSkeletonScreen = () => {
    return (
        <div className="animate-pulse">
            {/* Hero Section Skeleton */}
            <div className="relative h-screen bg-gray-300">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300"></div>
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="relative container mx-auto flex flex-col items-center justify-center h-full text-center">
                    <div className="w-3/4 h-12 bg-gray-400 rounded-md mb-6"></div>
                    <div className="w-1/2 h-6 bg-gray-400 rounded-md mb-4"></div>
                    <div className="w-1/4 h-10 bg-gray-400 rounded-full"></div>
                </div>
            </div>

            {/* Features Section Skeleton */}
            <div className="py-16 bg-gray-200">
                <div className="container mx-auto px-6">
                    <div className="w-1/3 h-8 bg-gray-400 rounded-md mx-auto mb-12"></div>
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center mb-12">
                            <div className="w-1/2 md:w-1/3 h-48 bg-gray-400 rounded-md mb-4 md:mb-0 md:mr-8"></div>
                            <div className="w-full">
                                <div className="w-1/2 h-6 bg-gray-400 rounded-md mb-4"></div>
                                <div className="w-full h-4 bg-gray-300 rounded-md mb-2"></div>
                                <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials Section Skeleton */}
            <div className="py-16 bg-gray-300">
                <div className="container mx-auto px-6">
                    <div className="w-1/3 h-8 bg-gray-400 rounded-md mx-auto mb-12"></div>
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="bg-gray-400 rounded-lg shadow p-8 mb-8">
                            <div className="w-1/2 h-6 bg-gray-300 rounded-md mb-4"></div>
                            <div className="w-full h-4 bg-gray-300 rounded-md mb-4"></div>
                            <div className="w-1/3 h-4 bg-gray-300 rounded-md"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeSkeletonScreen;
