import React, { useEffect, useState } from "react";

// Helper to limit the description to a certain number of words
function getShortDescription(desc, wordLimit = 20) {
  if (!desc) return "";
  const words = desc.trim().split(/\s+/);
  if (words.length <= wordLimit) return desc;
  return words.slice(0, wordLimit).join(" ") + "...";
}

function OngoingChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    // Fetch ongoing challenges from your backend
    // Update the URL below to match your actual endpoint
    fetch("http://localhost:5000/challenges")
      .then((res) => res.json())
      .then((data) => {
        setChallenges(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching challenges");
      });
  }, []);

  // Helper to format the deadline nicely
  const formatDeadline = (dateString) => {
    if (!dateString) return "N/A";
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filter challenges to only those that are visible
  const visibleChallenges = challenges.filter((challenge) => challenge.visible);

  return (
    <section className="bg-[#0d0a1a] text-white py-12 px-4">
      {/* Container at 80% screen width, centered */}
      <div className="w-4/5 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Ongoing Startupathon Challenges
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Start your journey—tackle live challenges, earn equity, and lead the
          future.
        </p>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        {/* Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleChallenges.slice(0, visibleCount).map((challenge) => {
            const formattedDeadline = formatDeadline(challenge.deadline);

            return (
              <div
                key={challenge._id}
                className="
                  bg-[#1a132b] border-2 border-purple-600 rounded-lg p-6 shadow-md 
                  flex flex-col items-center text-center 
                  transition-transform duration-300 hover:scale-105 hover:shadow-xl
                "
              >
                {/* Challenge Logo (if available) */}
                {challenge.logo && (
                  <img
                    src={challenge.logo}
                    alt={`${challenge.title} Logo`}
                    className="w-16 h-16 object-contain mb-3"
                  />
                )}

                {/* Title & Funding */}
                <h3 className="text-xl font-bold mb-1">{challenge.title}</h3>
                <p className="text-sm text-purple-200 italic mb-3">
                  Initial Funding Offered :{" "}
                  <span className="font-semibold">
                    ${challenge.fundingAmount}
                  </span>
                </p>

                {/* Shortened Description */}
                <p className="text-sm text-gray-300 mb-4">
                  {getShortDescription(challenge.description, 10)}
                </p>

                {/* Deadline */}
                <p className="text-xs text-red-400 font-semibold mb-4">
                  🔥 Deadline approaching! Apply by {formattedDeadline}
                </p>

                {/* View Details Button */}
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full font-medium transition-colors">
                  View Challenge Details
                </button>
              </div>
            );
          })}
        </div>

        {/* "See More" Button if there are more than visibleCount visible challenges */}
        {visibleChallenges.length > visibleCount && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount(visibleCount + 6)}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-medium transition-colors"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default OngoingChallenges;
