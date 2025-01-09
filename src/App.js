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
import { checkAuth } from "./utils/auth";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotAuthorizedPage from "./pages/NotAuthorizedPage";
import HomeSkeletonScreen from "./components/HomeSkeletonScreen";
import UnderDevelopment from "./pages/UnderDevelopment";

const App = () => {
  // State to manage login status
  const [underDevelopment, setUnderDevelopment] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Start with null to indicate loading
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await checkAuth(setIsAdmin, setUser); // Await the result of checkAuth()
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []);

  // Display loading state while checking authentication
  if (isLoggedIn === null) {
    return <HomeSkeletonScreen />;
  }

  return (
    <Router>
      {!underDevelopment ? (
        <Navbar
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          exclude={["/login", "/signup", "/404"]}
        />
      ) : null}

      <Routes>
        <Route
          path="/"
          element={underDevelopment ? <UnderDevelopment /> : <HomePage />}
        />
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
          element={
            isLoggedIn ? <CartPage user={user} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? <ProfilePage user={user} /> : <Navigate to="/login" />
          }
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
              <LoginPage
                setUser={setUser}
                setIsAdmin={setIsAdmin}
                setIsLoggedIn={setIsLoggedIn}
              />
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
