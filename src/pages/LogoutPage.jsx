// LogoutPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = ({setIsLoggedIn}) => {
    const navigate=useNavigate();
    
    const handelLogout=()=>{
        localStorage.removeItem("jwt_token");
        sessionStorage.clear();
        setIsLoggedIn(false);
        navigate("/login");
    }
    useEffect(()=>{
        handelLogout();
    // eslint-disable-next-line
    },[])

    return (
        <div className="min-h-screen bg-gray-100">
            <h1 className="text-center text-3xl font-bold p-10">Logout Page</h1>
            {/* Logout page content */}
        </div>
    );
};

export default LogoutPage;
