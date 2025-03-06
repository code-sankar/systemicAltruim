import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-gray-900 text-white px-4 py-3 shadow-sm">
      <div className="flex items-center space-x-4">
        <img src="/logo.png" alt="Company Logo" className="h-8 w-auto" />
        <h1 className="text-xl font-semibold">Admin Portal</h1>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-red-100 text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
            clipRule="evenodd"
          />
        </svg>
        Log Out
      </button>
    </header>
  );
}

export default Header;
