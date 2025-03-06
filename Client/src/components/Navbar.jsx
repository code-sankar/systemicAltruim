// src/components/Navbar.jsx
import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-black text-white w-full fixed top-0 z-50 shadow-xl border-b border-opacity-20 border-purple-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* NAVBAR ROW */}
        <div className="flex items-center justify-between h-20">
          {/* LEFT: BRAND */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img
              src="https://cdn.prod.website-files.com/623ae64112adcf772da9687e/678a14a9d3a398bc1e9633b3_Persist%20Startupathon%20White.svg"
              alt="Persist Logo"
              className="h-8 w-auto transform transition duration-300 hover:scale-105 cursor-pointer"
            />
          </div>

          {/* RIGHT: DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8">
              <a
                href="#ongoing"
                className="text-sm font-medium transition-all duration-300 hover:text-purple-400 relative group"
              >
                Ongoing Startupathon
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              {/* Repeat the same structure for other links */}
              <a
                href="#completed"
                className="text-sm font-medium transition-all duration-300 hover:text-purple-400 relative group"
              >
                Completed Startupathon
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#guide"
                className="text-sm font-medium transition-all duration-300 hover:text-purple-400 relative group"
              >
                Startupathon Guide
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium transition-all duration-300 hover:text-purple-400 relative group"
              >
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#mentor-network"
                className="text-sm font-medium transition-all duration-300 hover:text-purple-400 relative group"
              >
                Mentor Network
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            <div className="ml-8">
              <a
                href="#fellowship"
                className="relative inline-flex items-center px-6 py-2.5 text-sm font-semibold transition-all duration-500 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="absolute bg-purple-600 w-full h-full left-0 top-0 transition-all duration-300 group-hover:bg-opacity-0"></span>
                <span className="relative z-10 text-white">Apply For Fellowship</span>
                <svg
                  className="ml-2 -mr-1 h-4 w-4 text-white z-10 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-3 rounded-lg hover:bg-purple-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-8 space-y-6 bg-gradient-to-b from-purple-900/30 to-black/30">
          <a
            href="#ongoing"
            className="block text-lg font-medium hover:text-purple-400 transition-colors duration-300 pl-4 border-l-4 border-transparent hover:border-purple-500"
          >
            Ongoing Startupathon
          </a>
          {/* Repeat for other mobile links */}
          <a
            href="#fellowship"
            className="block text-lg font-semibold text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
          >
            Apply For Fellowship
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
