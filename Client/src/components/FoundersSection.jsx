import React, { useEffect, useState } from "react";
import { AiFillLinkedin } from "react-icons/ai";

function FoundersSection() {
  const [founders, setFounders] = useState([]);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(4); // Show first 4 by default

  // Fetch founders from the backend
  useEffect(() => {
    fetch("http://localhost:5000/founders")
      .then((res) => res.json())
      .then((data) => {
        setFounders(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching founders");
      });
  }, []);

  // Increase the number of visible founders by 4
  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className="bg-[#0d0a1a] text-white py-12 px-4">
      <div className="w-4/5 mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          By getting accepted you unlock access to our elite founder network.
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Join Persist and gain access to our 400+ millionaire and billionaire
          startup network.
        </p>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        {/* Founders Grid: 4 columns per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {founders.slice(0, visibleCount).map((founder) => (
            <div
              key={founder._id}
              className="
                border-2 border-purple-600 bg-[#1a132b] rounded-lg shadow-md
                transition-transform duration-300 hover:scale-105 hover:shadow-xl
                h-80 flex flex-col overflow-hidden
              "
            >
              {/* Top half: Image (50% of card) */}
              <div className="h-1/2 w-full">
                {founder.image ? (
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-300 text-sm">No Image</span>
                  </div>
                )}
              </div>

              {/* Bottom half: Content (50% of card) */}
              <div className="h-1/2 p-3 flex flex-col items-center justify-center text-center">
                {/* Name (bold) */}
                <h3 className="text-lg font-bold text-white mb-1">
                  {founder.name}
                </h3>

                {/* Position (italic) */}
                <p className="text-sm text-purple-200 italic mb-2">
                  {founder.position}
                </p>

                {/* LinkedIn icon if available */}
                {founder.linkedinProfile && (
                  <div className="flex justify-center mb-2">
                    <a
                      href={founder.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <AiFillLinkedin size={20} />
                    </a>
                  </div>
                )}

                {/* Description (short text) */}
                <p className="text-xs text-gray-300">{founder.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* "See More" link if there are more founders to show */}
        {founders.length > visibleCount && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSeeMore}
              className="text-purple-400 hover:text-purple-500 font-semibold"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default FoundersSection;
