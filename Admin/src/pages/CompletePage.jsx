import React, { useEffect, useState } from "react";

function CompleterPage() {
  const [completers, setCompleters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    challengerName: "",
    personName: "",
    position: "",
    linkedinProfile: "",
    description: "",
    fundingAmount: "",
    image: "", // Keep image in form
  });

  const token = localStorage.getItem("token");

  // Fetch all completers from the backend
  const fetchCompleters = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://systemicaltruim.onrender.com/api/v1/completed");
      const data = await response.json();
      setCompleters(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load completers");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompleters();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the new completer to the backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://systemicaltruim.onrender.com/api/v1/completed", {
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
        setError(errorData.message || "Error adding completer");
      } else {
        // Refresh list
        fetchCompleters();
        // Reset form
        setFormData({
          challengerName: "",
          personName: "",
          position: "",
          linkedinProfile: "",
          description: "",
          fundingAmount: "",
          image: "",
        });
        setShowForm(false);
      }
    } catch (err) {
      setError("Failed to add completer");
    }
  };

  // Delete a completer
  const deleteCompleter = async (id) => {
    try {
      const response = await fetch(`https://systemicaltruim.onrender.com/api/v1/completed/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        // Refresh list
        fetchCompleters();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error deleting completer");
      }
    } catch (err) {
      setError("Failed to delete completer");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Completers Management
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Completer
          </button>
        </div>

        {/* Add Completer Form */}
        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Challenger Name
                  </label>
                  <input
                    type="text"
                    name="challengerName"
                    value={formData.challengerName}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Person Name
                  </label>
                  <input
                    type="text"
                    name="personName"
                    value={formData.personName}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn Profile
                  </label>
                  <input
                    type="text"
                    name="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mt-2 h-16 w-16 rounded-full object-cover"
                    />
                  )}
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
                Save Completer
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

        {/* Completers Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Challenger
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Person
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LinkedIn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Funding
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {completers.map((completer) => (
                  <tr key={completer._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {completer.image && (
                        <img
                          src={completer.image}
                          alt={completer.challengerName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {completer.challengerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {completer.personName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {completer.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                      <a
                        href={completer.linkedinProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        View Profile
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <div className="line-clamp-2">
                        {completer.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${Number(completer.fundingAmount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => deleteCompleter(completer._id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {completers.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No completers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompleterPage;
