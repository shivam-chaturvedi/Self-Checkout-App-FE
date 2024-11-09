// utils/auth.js
export const checkAuth = () => {
    const token = localStorage.getItem('jwt_token');  // Get the token from localStorage
    if (!token) return false; // No token means not logged in

    // Optionally, you can also check if the token is valid (e.g., check expiration date)
    return true;
};
