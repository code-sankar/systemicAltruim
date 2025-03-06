import React from "react";
import { useNavigate } from "react-router-dom";
import ChallengeForm from "./ChallengeForm";
import ListOfChallenge from "./ListOfChallenge";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Challenge Form Section */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Create New Challenge
            </h3>
            <ChallengeForm />
          </div>

          {/* Challenges List Section */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Existing Challenges
            </h3>
            <ListOfChallenge />
          </div>
        </div>

        {/* Extensions Section */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          {/* Extend here with other management components as needed */}
          <p>Additional management sections can be added here</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
