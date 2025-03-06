import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen p-4">
      <nav>
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/challenges"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Challenges
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/completers"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Completers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/founders"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Founders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/subscribers"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Subscribers
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
