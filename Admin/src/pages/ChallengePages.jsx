import React, { useEffect, useState } from "react";

function ChallengePage() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    logo: "",
    title: "",
    fundingAmount: "",
    description: "",
    deadline: "",
    visible: true,
  });

  const token = localStorage.getItem("token");

  // Fetch all challenges from the backend
  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://systemicaltruim.onrender.com/api/v1/challenges");
      const data = await response.json();
      setChallenges(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load challenges");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission to add a new challenge
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://systemicaltruim.onrender.com/api/v1/challenges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          fundingAmount: Number(formData.fundingAmount),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error adding challenge");
      } else {
        fetchChallenges();
        setFormData({
          logo: "",
          title: "",
          fundingAmount: "",
          description: "",
          deadline: "",
          visible: true,
        });
        setShowForm(false);
      }
    } catch (err) {
      setError("Failed to add challenge");
    }
  };

  // Toggle the "visible" field for a challenge
  const toggleVisibility = async (challengeId, currentVisible) => {
    try {
      const response = await fetch(
        `https://systemicaltruim.onrender.com/api/v1/${challengeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ visible: !currentVisible }),
        }
      );
      if (response.ok) {
        fetchChallenges();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error toggling visibility");
      }
    } catch (err) {
      setError("Failed to update challenge visibility");
    }
  };

  // Delete a challenge
  const deleteChallenge = async (challengeId) => {
    try {
      const response = await fetch(
        `https://systemicaltruim.onrender.com/api/v1/${challengeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        fetchChallenges();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error deleting challenge");
      }
    } catch (err) {
      setError("Failed to delete challenge");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Challenge Management
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Challenge
          </button>
        </div>

        {/* Add Challenge Form */}
        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  {formData.logo && (
                    <img
                      src={formData.logo}
                      alt="Logo preview"
                      className="mt-2 h-16 w-16 rounded-md object-cover"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Funding Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      name="fundingAmount"
                      value={formData.fundingAmount}
                      onChange={handleChange}
                      className="pl-7 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="visible"
                    checked={formData.visible}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded border-gray-300"
                  />
                  <label className="ml-2 text-sm text-gray-700">Visible</label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Challenge
              </button>
            </div>
          </form>
        )}

        {/* Status Messages */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-8">
            {error}
          </div>
        )}

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <img
                src={challenge.logo}
                alt={challenge.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {challenge.title}
                </h3>

                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-medium text-gray-500">Funding</dt>
                    <dd className="text-gray-900">
                      ${Number(challenge.fundingAmount).toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Deadline</dt>
                    <dd className="text-gray-900">
                      {new Date(challenge.deadline).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Visible</dt>
                    <dd className="text-gray-900">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          challenge.visible
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {challenge.visible ? "Yes" : "No"}
                      </span>
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() =>
                      toggleVisibility(challenge._id, challenge.visible)
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Toggle Visibility
                  </button>
                  <button
                    onClick={() => deleteChallenge(challenge._id)}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChallengePage;
