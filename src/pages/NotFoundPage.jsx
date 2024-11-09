import React from "react";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
            <p className="text-2xl mt-4 text-gray-700">Oops! Page Not Found</p>
            <p className="mt-2 text-gray-500">The page you are looking for doesn't exist or has been moved.</p>
            <div className="mt-8 animate-float max-h-60 max-w-60">
                <img src="/images/404-illustration.png" alt="404 Illustration" className="w-1/2 mx-auto" />
            </div>
        </div>
    );
}

export default NotFoundPage;
