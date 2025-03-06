import React, { useEffect, useState } from "react";
import { AiFillLinkedin } from "react-icons/ai";

function CompletedChallenges() {
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  const token = localStorage.getItem("token");

  // Fetch all completed challenges from your backend
  const fetchCompleted = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/completed");
      const data = await response.json();
      setCompleted(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load completed challenges");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompleted();
  }, []);

  // Handler for "See More" button: reveal 4 more cards at a time
  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="w-4/5 mx-auto my-8">
      <h2 className="text-2xl font-bold text-center mb-4">
        Completed Startupathon Challenges
      </h2>

      {loading && <p className="text-center">Loading completers...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {completed.slice(0, visibleCount).map((item) => (
          <div
            key={item._id}
            className="border-2 border-purple-600 bg-[#1a132b] rounded-lg p-4 text-center shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Image (circular) */}
            {item.image && (
              <img
                src={item.image}
                alt={item.challengerName}
                className="w-20 h-20 object-cover rounded-full mx-auto mb-2"
              />
            )}

            {/* Challenger Name with emoji */}
            <h3 className="text-lg font-bold text-white mb-1">
              {item.challengerName}{" "}
              <span role="img" aria-label="emoji">
                🏆
              </span>
            </h3>

            {/* Person Info */}
            <p className="text-sm text-purple-200 italic mb-2">
              {item.personName}
              {item.position ? `, ${item.position}` : ""}
            </p>

            {/* LinkedIn Icon */}
            {item.linkedinProfile && (
              <div className="flex justify-center mb-2">
                <a
                  href={item.linkedinProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <AiFillLinkedin size={24} />
                </a>
              </div>
            )}

            {/* Description */}
            <p className="text-sm text-gray-300 mb-3">{item.description}</p>

            {/* Funding Amount */}
            <p className="text-sm text-purple-300 mb-3">
              Initial Funding Offered:{" "}
              <span className="font-semibold">${item.fundingAmount}</span>
            </p>

            {/* View More Details button */}
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full font-medium transition-colors">
              View More Details
            </button>
          </div>
        ))}
      </div>

      {/* "See More" Button */}
      {visibleCount < completed.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSeeMore}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full font-medium text-white transition-colors"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
}

export default CompletedChallenges;
