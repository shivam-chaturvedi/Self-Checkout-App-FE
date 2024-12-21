// GoogleSignIn.js
import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase"; // Import Firebase auth instance

export default function GoogleSignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider(); // Google login provider

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user; // User info
        console.log("Logged in as:", user);
      })
      .catch((error) => {
        console.error("Error during login:", error.message);
      });
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="w-full py-2 px-4 flex items-center justify-center bg-[#4285F4] text-white font-semibold rounded-lg shadow-md hover:bg-[#357ae8] focus:outline-none focus:ring-4 focus:ring-[#4285F4] focus:ring-opacity-50"
    >
      <img src="images/google.png" alt="Google logo" className="w-5 h-5 mr-3" />
      Sign in with Google
    </button>
  );
}
