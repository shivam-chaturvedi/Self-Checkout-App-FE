// utils/auth.js
export const checkAuth = async () => {
    const token = localStorage.getItem('jwt_token');  // Get the token from localStorage
    if (!token) return false; // No token means not logged in
    try{
        const res=await fetch(`http://localhost:8080/verify-token?token=${token}`);
        const data=await res.json();
        if(res.ok){
            sessionStorage.setItem("username",data.success);
            return true;
        }
        else{
            console.error(data.error);
            return false;
        }
    }
    catch(error){
        console.error(error);
        return false;
    }

};
