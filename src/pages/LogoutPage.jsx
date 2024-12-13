import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("jwt_token"); // Clear token
      sessionStorage.clear(); // Clear session
      setIsLoggedIn(false); // Update logged-in status
      navigate("/login"); // Redirect to login page
    }
    else{
        navigate('/');
    }
  };

  useEffect(() => {
    handleLogout();
  }, [handleLogout]); // Add `handleLogout` as dependency

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <h1 className="text-3xl font-bold">Logging out...</h1>
    </div>
  );
};

export default LogoutPage;
