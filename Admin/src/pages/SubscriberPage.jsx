import React, { useState, useEffect } from "react";

function SubscriberPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const token = localStorage.getItem("token");

  // Fetch subscribers from the backend
  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://systemicaltruim.onrender.com/api/v1/subscriber");
      const data = await response.json();
      setSubscribers(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load subscribers");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Handle adding a new subscriber
  const handleAddSubscriber = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://systemicaltruim.onrender.com/api/v1/subscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newEmail }),
      });
      if (response.ok) {
        setNewEmail("");
        fetchSubscribers();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error adding subscriber");
      }
    } catch (err) {
      setError("Failed to add subscriber");
    }
  };

  // Handle deleting a subscriber
  const handleDeleteSubscriber = async (id) => {
    try {
      const response = await fetch(`https://systemicaltruim.onrender.com/api/v1/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchSubscribers();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error deleting subscriber");
      }
    } catch (err) {
      setError("Failed to delete subscriber");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Subscribers Management
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Add Subscriber Form */}
        <form
          onSubmit={handleAddSubscriber}
          className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter subscriber email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Subscriber
            </button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}

        {/* Subscribers Table */}
        {!loading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {subscriber.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDeleteSubscriber(subscriber._id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {subscribers.length === 0 && (
                    <tr>
                      <td
                        colSpan="2"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No subscribers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubscriberPage;
