import React from "react";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotAuthorizedPage() {
  const navigate = useNavigate();
  const navigateHome = () => {
    // Navigate to home; replace with your routing logic
    navigate("/");
  };

  return (
    <div className="h-full m-2 flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-xl max-w-xl w-full text-center">
        <img loading="lazy" src="/images/monster.gif" alt="monster"></img>

        <p className="text-gray-600 mb-6">
          Please contact the administrator if you believe this is an error.
        </p>
        {/* Navigate Home Button */}
        <button
          onClick={navigateHome}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
