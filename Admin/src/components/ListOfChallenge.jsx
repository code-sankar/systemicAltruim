import React, { useState, useEffect } from "react";

function ListOfChallenge() {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState("");

  const fetchChallenges = async () => {
    try {
      const response = await fetch("http://localhost:5000/challenges");
      const data = await response.json();
      setChallenges(data);
    } catch (err) {
      setError("Error fetching challenges");
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-900 p-6 border-b">
        Existing Challenges
      </h3>

      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {challenges.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No challenges found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Funding
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visible
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {challenges.map((challenge) => (
                  <tr
                    key={challenge._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {challenge.logo && (
                        <img
                          src={challenge.logo}
                          alt={challenge.title}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {challenge.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${Number(challenge.fundingAmount).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(challenge.deadline).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          challenge.visible
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {challenge.visible ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListOfChallenge;
