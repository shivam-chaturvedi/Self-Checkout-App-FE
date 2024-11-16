import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import LogoutPage from "./pages/LogoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import { checkAuth } from "./utils/auth"; // Import the checkAuth function
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotAuthorizedPage from "./pages/NotAuthorizedPage";

const App = () => {
  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Start with null to indicate loading
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await checkAuth(setIsAdmin); // Await the result of checkAuth()
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []);

  // Display loading state while checking authentication
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} exclude={["/login", "/signup", "/404"]} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              isAdmin ? (
                <AdminPage />
              ) : (
                <NotAuthorizedPage />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <CartPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/logout"
          element={
            isLoggedIn ? (
              <LogoutPage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <LoginPage setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
};

export default App;
