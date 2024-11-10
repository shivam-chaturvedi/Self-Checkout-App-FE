import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen font-bold flex flex-col items-center justify-center bg-[#e6a22385] text-center">
            <p className="text-2xl mt-4 text-gray-700">Oops! Page Not Found</p>
            <p className="mt-2 text-gray-500">The page you are looking for doesn't exist or has been moved.</p>
            <div className="mt-8 animate-float max-h-60 max-w-60">
                <img src="/images/404-illustration.png" alt="404 Illustration" className="w-1/2 mx-auto" />
            </div>
            <Link to="/" className="bg-green-500 text-white p-2 font-mono rounded-xl text-xl mt-2">
            Go Back To Home
            </Link>
        </div>
    );
}

export default NotFoundPage;
