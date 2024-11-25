// utils/auth.js
import { BACKEND_SERVER_URL } from "./config";

export const checkAuth = async (setIsAdmin, setUser) => {
  const token = localStorage.getItem("jwt_token"); // Get the token from localStorage
  if (!token) return false; // No token means not logged in
  try {
    const res = await fetch(
      `${BACKEND_SERVER_URL}/verify-token?token=${token}`
    );
    const data = await res.json();
    
    if (res.ok) {
      setUser(data.user);
      if (data.isAdmin) {
        setIsAdmin(true);
      }
      return true;
    } else {
      console.error(data.error);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
